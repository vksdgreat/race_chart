import {
  DATA_NOTE as CAR_NOTE,
  END_YEAR as CAR_END,
  START_YEAR as CAR_START,
  captionFor as carCaption,
  frames as carFrames,
} from "./indiaCars.js"
import {
  DATA_NOTE as IPL_NOTE,
  END_YEAR as IPL_END,
  START_YEAR as IPL_START,
  captionFor as iplCaption,
  frames as iplFrames,
} from "./iplWins.js"

export const charts = [
  {
    id: "india-cars",
    kicker: "India · passenger cars",
    title: "Most sold car models in India",
    yearsLabel: "1970 – 2026",
    badges: ["1970 – 2026", "Top 10"],
    summary:
      "From the Ambassador and Padmini to the Alto, Swift, Punch and Dzire. A 56-year race of the models India actually bought.",
    start: CAR_START,
    end: CAR_END,
    provisionalEnd: true,
    frames: carFrames,
    note: CAR_NOTE,
    captionFor: carCaption,
    preview: [
      { label: "Ambassador", color: "#d4a373" },
      { label: "Maruti 800", color: "#4cc9f0" },
      { label: "Maruti Alto", color: "#ffbe0b" },
      { label: "Tata Punch", color: "#dc2f02" },
      { label: "Maruti Dzire", color: "#4361ee" },
    ],
  },
  {
    id: "ipl-wins",
    kicker: "IPL · match wins",
    title: "Most wins by IPL teams",
    yearsLabel: "2008 – 2026",
    badges: ["2008 – 2026", "Match wins"],
    summary:
      "Cumulative league and playoff wins from the first season through 2026. Mumbai, Chennai, Kolkata and the Royal Challengers trade the lead.",
    start: IPL_START,
    end: IPL_END,
    frames: iplFrames,
    note: IPL_NOTE,
    captionFor: iplCaption,
    preview: [
      { label: "Mumbai Indians", color: "#004ba0" },
      { label: "Chennai Super Kings", color: "#f5c518" },
      { label: "Kolkata Knight Riders", color: "#7e22ce" },
      { label: "Royal Challengers", color: "#e10600" },
      { label: "Rajasthan Royals", color: "#ea1a85" },
    ],
  },
]

export function getChart(id) {
  return charts.find((chart) => chart.id === id) ?? null
}
