import { useEffect, useMemo, useRef, useState } from "react"

const YEARS_PER_SECOND = 1.2
const END_HOLD_SECONDS = 2
const EMPTY_FRAMES = []

function indexFrames(frames) {
  const map = new Map()
  frames.forEach((frame) => {
    map.set(
      frame.year,
      new Map(frame.entries.map((entry) => [entry.name, entry])),
    )
  })
  return map
}

function sample(frameMap, yearFloat, end) {
  if (!frameMap || frameMap.size === 0) return []

  if (yearFloat >= end) {
    const last = frameMap.get(end)
    if (!last) return []
    return [...last.values()].map((entry) => ({ ...entry }))
  }

  const lo = Math.floor(yearFloat)
  const hi = Math.min(end, lo + 1)
  const left = frameMap.get(lo)
  const right = frameMap.get(hi)
  if (!left || !right) return []

  const span = hi - lo
  const t = span === 0 ? 0 : (yearFloat - lo) / span
  const names = new Set([...left.keys(), ...right.keys()])

  return [...names].map((name) => {
    const a = left.get(name)
    const b = right.get(name)
    const from = a?.value ?? 0
    const to = b?.value ?? 0
    return {
      name,
      value: from + (to - from) * t,
      color: (b ?? a).color,
    }
  })
}

function layoutBars(entries, positions, barLimit, snap, dt) {
  const ranked = entries
    .slice()
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name))
  const max = Math.max(ranked[0]?.value ?? 1, 1)
  const bars = []

  ranked.forEach((entry, index) => {
    const target = Math.min(index, barLimit + 1)
    let y = positions.get(entry.name)
    if (y == null || snap) y = target
    else y += (target - y) * (1 - Math.exp(-3.5 * dt))
    positions.set(entry.name, y)
    if (entry.value > 1 && y < barLimit + 0.85) {
      bars.push({ ...entry, y, place: index + 1 })
    }
  })

  return { bars, max }
}

function frameAt(frameMap, end, positions, year, barLimit, snap, dt) {
  const entries = sample(frameMap, year, end)
  const { bars, max } = layoutBars(entries, positions, barLimit, snap, dt)
  return { year, bars, max }
}

export function useRacePlayer(frames = EMPTY_FRAMES, { start, end, limit }) {
  const frameMap = useMemo(() => indexFrames(frames), [frames])
  const positions = useRef(new Map())
  const yearRef = useRef(start)
  const speedRef = useRef(1)
  const limitRef = useRef(limit)
  const frameMapRef = useRef(frameMap)
  const endRef = useRef(end)
  const startRef = useRef(start)
  const holdRef = useRef(0)
  const [speed, setSpeed] = useState(1)
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [settled, setSettled] = useState(false)
  const [snapshot, setSnapshot] = useState(() =>
    frameAt(frameMap, end, new Map(), start, limit, true, 0.016),
  )

  useEffect(() => {
    frameMapRef.current = frameMap
    endRef.current = end
    startRef.current = start
  }, [frameMap, end, start])

  useEffect(() => {
    limitRef.current = limit
    positions.current = new Map()
    setSnapshot(
      frameAt(
        frameMapRef.current,
        endRef.current,
        positions.current,
        yearRef.current,
        limit,
        true,
        0.016,
      ),
    )
  }, [limit])

  useEffect(() => {
    if (!playing) return undefined
    let raf = 0
    let last = performance.now()

    const loop = (now) => {
      const dt = (now - last) / 1000
      last = now
      if (dt > 0.25) {
        raf = requestAnimationFrame(loop)
        return
      }

      const finish = endRef.current
      if (yearRef.current >= finish) {
        yearRef.current = finish
        holdRef.current += dt
        const done = holdRef.current >= END_HOLD_SECONDS
        setSnapshot(
          frameAt(
            frameMapRef.current,
            finish,
            positions.current,
            finish,
            limitRef.current,
            done,
            dt,
          ),
        )
        if (done) {
          setSettled(true)
          setPlaying(false)
          return
        }
        raf = requestAnimationFrame(loop)
        return
      }

      holdRef.current = 0
      const next = Math.min(
        finish,
        yearRef.current + dt * YEARS_PER_SECOND * speedRef.current,
      )
      yearRef.current = next
      setSnapshot(
        frameAt(
          frameMapRef.current,
          finish,
          positions.current,
          next,
          limitRef.current,
          false,
          dt,
        ),
      )
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const seek = (year) => {
    const next = Math.min(endRef.current, Math.max(startRef.current, year))
    yearRef.current = next
    positions.current = new Map()
    setSnapshot(
      frameAt(
        frameMapRef.current,
        endRef.current,
        positions.current,
        next,
        limitRef.current,
        true,
        0.016,
      ),
    )
    const atFinish = next >= endRef.current - 0.001
    holdRef.current = atFinish ? END_HOLD_SECONDS : 0
    setSettled(atFinish)
    setPlaying(false)
  }

  const toggle = () => {
    if (yearRef.current >= endRef.current - 0.001 && holdRef.current >= END_HOLD_SECONDS) {
      yearRef.current = startRef.current
      holdRef.current = 0
      setSettled(false)
      positions.current = new Map()
      setSnapshot(
        frameAt(
          frameMapRef.current,
          endRef.current,
          positions.current,
          startRef.current,
          limitRef.current,
          true,
          0.016,
        ),
      )
      setPlaying(true)
      return
    }
    setPlaying((value) => !value)
  }

  const restart = () => {
    yearRef.current = startRef.current
    holdRef.current = 0
    setSettled(false)
    positions.current = new Map()
    setSnapshot(
      frameAt(
        frameMapRef.current,
        endRef.current,
        positions.current,
        startRef.current,
        limitRef.current,
        true,
        0.016,
      ),
    )
    setPlaying(true)
  }

  const chooseSpeed = (value) => {
    speedRef.current = value
    setSpeed(value)
  }

  return {
    snapshot,
    playing,
    speed,
    toggle,
    restart,
    seek,
    setSpeed: chooseSpeed,
    atEnd: settled,
  }
}
