import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getChart } from "../data/charts.js"
import { useRacePlayer } from "../hooks/useRacePlayer.js"

const SPEEDS = [0.25, 0.5, 1, 2, 4]

function formatSales(value) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(value),
  )
}

function useChartLayout(ref) {
  const [layout, setLayout] = useState({ limit: 8, rowH: 42 })

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const measure = () => {
      const width = window.innerWidth
      const limit = width < 720 ? 8 : 10
      const height = node.clientHeight
      const rowH = Math.max(36, Math.min(width < 800 ? 74 : 56, height / limit))
      setLayout((current) =>
        current.limit === limit && Math.abs(current.rowH - rowH) < 0.5
          ? current
          : { limit, rowH },
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [ref])

  return layout
}

export default function ChartPage() {
  const { chartId } = useParams()
  const chart = getChart(chartId)
  const stageRef = useRef(null)
  const { limit, rowH } = useChartLayout(stageRef)
  const player = useRacePlayer(chart?.frames, {
    start: chart?.start ?? 1970,
    end: chart?.end ?? 2026,
    limit,
  })

  useEffect(() => {
    if (!chart) return undefined
    const previous = document.title
    document.title = `${chart.title} · Race Bar`
    return () => {
      document.title = previous
    }
  }, [chart])

  const { toggle, seek, snapshot, playing, speed, restart, setSpeed, atEnd } = player
  const yearNow = snapshot?.year ?? chart?.start ?? 1970
  const yearRef = useRef(yearNow)
  const actions = useRef({ toggle, seek })

  useEffect(() => {
    yearRef.current = yearNow
    actions.current = { toggle, seek }
  }, [yearNow, toggle, seek])

  useEffect(() => {
    if (!chart) return undefined
    const onKey = (event) => {
      const tag = event.target?.tagName
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return
      if (event.code === "Space") {
        event.preventDefault()
        actions.current.toggle()
      } else if (event.code === "ArrowRight") {
        actions.current.seek(yearRef.current + 1)
      } else if (event.code === "ArrowLeft") {
        actions.current.seek(yearRef.current - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [chart])

  if (!chart) {
    return (
      <div className="home">
        <h1>That chart is not on the list.</h1>
        <Link className="text-link" to="/">
          Back to charts
        </Link>
      </div>
    )
  }

  const year = snapshot?.year ?? chart.start
  const bars = snapshot?.bars ?? []
  const max = snapshot?.max ?? 1
  const leader = bars.slice().sort((a, b) => a.place - b.place)[0]
  const yearLabel = Math.floor(year)
  const showStar = Boolean(chart.provisionalEnd) && yearLabel >= chart.end

  return (
    <div className="screen">
      <header className="topbar">
        <Link className="back" to="/">
          Charts
        </Link>
        <div className="titles">
          <h1>{chart.title}</h1>
          <p>{chart.captionFor(year)}</p>
        </div>
        <div className="year-chip" aria-hidden="true">
          {yearLabel}
          {showStar ? <sup>*</sup> : null}
        </div>
      </header>

      <div className="stage">
        <div className="lanes" ref={stageRef} aria-hidden="true">
          {bars.map((bar) => {
            const width = Math.max(1.5, (bar.value / max) * 100)
            const fade = bar.y > limit - 0.2 ? Math.max(0, limit - bar.y) : 1
            return (
              <div
                key={bar.name}
                className="bar-row"
                style={{
                  transform: `translateY(${bar.y * rowH}px)`,
                  height: Math.max(28, rowH - 8),
                  opacity: fade,
                }}
              >
                <span className={`place ${bar.place === 1 ? "is-leader" : ""}`}>
                  {bar.place <= limit ? bar.place : ""}
                </span>
                <span className="name">{bar.name}</span>
                <span className="track">
                  <span
                    className="fill"
                    style={{ width: `${width}%`, background: bar.color }}
                  />
                </span>
                <span className="value">{formatSales(bar.value)}</span>
              </div>
            )
          })}
        </div>
        <aside className="year-panel">
          <p>Year</p>
          <div className="year-figure">
            {yearLabel}
            {showStar ? <sup>*</sup> : null}
          </div>
          <p className="leading-label">Leading</p>
          <p className="leading-name">{leader?.name ?? "—"}</p>
        </aside>
      </div>

      <div className="controls">
        <button type="button" className="play" onClick={toggle}>
          {atEnd ? "Replay" : playing ? "Pause" : "Play"}
        </button>
        <button type="button" className="ghost" onClick={restart}>
          Restart
        </button>
        <label className="scrub">
          <span className="sr-only">Year</span>
          <input
            type="range"
            min={chart.start}
            max={chart.end}
            step="0.01"
            value={Math.min(chart.end, year)}
            aria-valuetext={String(yearLabel)}
            onChange={(event) => seek(Number(event.target.value))}
          />
        </label>
        <div className="speeds" role="group" aria-label="Playback speed">
          {SPEEDS.map((value) => (
            <button
              key={value}
              type="button"
              className={speed === value ? "is-on" : ""}
              onClick={() => setSpeed(value)}
            >
              {value}×
            </button>
          ))}
        </div>
      </div>

      <details className="about">
        <summary>About this data</summary>
        <p>{chart.note}</p>
      </details>
    </div>
  )
}
