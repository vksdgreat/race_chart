/**
 * Approximate annual sales of India's most popular car models, 1970–2026.
 *
 * Rank order from 1985 onward follows published best-seller lists
 * (Best Selling Cars Blog, the Wikipedia compilation of those lists,
 * Autocar India, and Moneycontrol). Commercial trucks such as the
 * Tata 407 and Force Matador are omitted.
 *
 * Unit counts use reported figures where they exist. Other years are
 * estimates: the leader is scaled to known market size and reported
 * peaks, and the rest of the list keeps the published order.
 * 2008 had no published model table, so that year is a bridge between
 * 2007 and 2009 with the Alto still first.
 * 2026 is a full-year pace from January–June 2026 dispatches (doubled),
 * not a completed calendar year.
 */

const COLORS = {
  Ambassador: "#d4a373",
  Padmini: "#e07a5f",
  "Standard Herald": "#8d99ae",
  "Mahindra Jeep": "#2a9d8f",
  Trekker: "#6d597a",
  Contessa: "#b5838d",
  "Maruti 800": "#4cc9f0",
  "Maruti Omni": "#4895ef",
  "Maruti Gypsy": "#3a0ca3",
  "Premier 118 NE": "#f4a261",
  "Maruti 1000": "#7209b7",
  "Maruti Esteem": "#9d4edd",
  "Maruti Zen": "#f72585",
  "Tata Sumo": "#e63946",
  "Daewoo Cielo": "#90be6d",
  "Opel Astra": "#43aa8b",
  "Hyundai Santro": "#fb8500",
  "Honda City": "#e9c46a",
  "Tata Indica": "#d62828",
  "Daewoo Matiz": "#80b918",
  "Toyota Qualis": "#bb3e03",
  "Maruti Alto": "#ffbe0b",
  "Maruti Wagon R": "#3a86ff",
  "Fiat Palio": "#c77dff",
  "Tata Indigo": "#ae2012",
  "Maruti Swift": "#48cae4",
  "Hyundai i10": "#ff9f1c",
  "Toyota Innova": "#9b2226",
  "Maruti Dzire": "#4361ee",
  "Mahindra Bolero": "#52b788",
  "Hyundai i20": "#f77f00",
  "Hyundai Eon": "#fcbf49",
  "Tata Nano": "#6a040f",
  "Maruti Ertiga": "#8338ec",
  "Maruti Celerio": "#90e0ef",
  "Maruti Baleno": "#2ec4b6",
  "Renault Kwid": "#ffd60a",
  "Hyundai Creta": "#e85d04",
  "Maruti Brezza": "#ff006e",
  "Maruti Eeco": "#8ecae6",
  "Kia Seltos": "#c1121f",
  "Tata Nexon": "#9d0208",
  "Tata Punch": "#dc2f02",
  "Maruti Fronx": "#06d6a0",
  "Mahindra Scorpio": "#1b4332",
  "Maruti Zen Estilo": "#ff5d8f",
}

const LEADER = [
  [1970, 20000],
  [1974, 24000],
  [1979, 19000],
  [1982, 22000],
  [1984, 25000],
  [1985, 36200],
  [1986, 46800],
  [1989, 72000],
  [1993, 120000],
  [1996, 160500],
  [1999, 193904],
  [2002, 176000],
  [2004, 168000],
  [2005, 188000],
  [2007, 230000],
  [2010, 290000],
  [2011, 311367],
  [2014, 268000],
  [2016, 252000],
  [2017, 246000],
  [2018, 264000],
  [2019, 228000],
  [2020, 161000],
  [2021, 183851],
  [2022, 217317],
  [2023, 203469],
  [2024, 201799],
  [2025, 214000],
  [2026, 252408],
]

/** Reported counts. Partial years fill the remaining ranks from the leader curve. */
const EXACT = {
  1983: { "Maruti 800": 2500 },
  1984: { "Maruti 800": 18000, Padmini: 20500 },
  1985: {
    "Maruti 800": 36200,
    Padmini: 29200,
    Ambassador: 21800,
    "Mahindra Jeep": 16000,
  },
  1986: { "Maruti 800": 46800, Padmini: 27200 },
  1999: { "Maruti 800": 193904 },
  2011: { "Maruti Alto": 311367 },
  2020: { "Maruti Swift": 161000 },
  2021: {
    "Maruti Wagon R": 183851,
    "Maruti Swift": 175052,
    "Maruti Baleno": 172241,
    "Maruti Alto": 166233,
    "Hyundai Creta": 125437,
    "Maruti Dzire": 116400,
    "Maruti Brezza": 108200,
    "Maruti Eeco": 101500,
    "Maruti Ertiga": 95200,
    "Tata Nexon": 87400,
  },
  2022: {
    "Maruti Wagon R": 217317,
    "Maruti Baleno": 185665,
    "Maruti Swift": 176424,
    "Tata Nexon": 168279,
    "Maruti Alto": 164200,
    "Maruti Dzire": 159919,
    "Hyundai Creta": 148600,
    "Maruti Ertiga": 140200,
    "Maruti Brezza": 132800,
    "Tata Punch": 124500,
  },
  2023: {
    "Maruti Swift": 203469,
    "Maruti Wagon R": 201302,
    "Maruti Baleno": 193988,
    "Maruti Brezza": 170588,
    "Tata Nexon": 170311,
    "Maruti Dzire": 158400,
    "Hyundai Creta": 149200,
    "Tata Punch": 141800,
    "Maruti Eeco": 128600,
    "Maruti Ertiga": 121400,
  },
  2024: {
    "Tata Punch": 201799,
    "Maruti Wagon R": 190855,
    "Maruti Ertiga": 190093,
    "Maruti Brezza": 188160,
    "Hyundai Creta": 186919,
    "Maruti Swift": 176400,
    "Maruti Baleno": 168200,
    "Maruti Dzire": 159800,
    "Mahindra Scorpio": 151600,
    "Tata Nexon": 144200,
  },
  2025: {
    "Maruti Dzire": 214000,
    "Hyundai Creta": 201400,
    "Tata Nexon": 200600,
    "Maruti Wagon R": 194000,
    "Maruti Ertiga": 192000,
    "Maruti Swift": 189000,
    "Maruti Fronx": 180000,
    "Mahindra Scorpio": 177000,
    "Maruti Brezza": 175000,
    "Tata Punch": 173000,
  },
  2026: {
    "Maruti Dzire": 252408,
    "Tata Punch": 238606,
    "Tata Nexon": 236332,
    "Maruti Ertiga": 216590,
    "Maruti Wagon R": 201408,
    "Maruti Swift": 195494,
    "Maruti Baleno": 193992,
    "Maruti Fronx": 190882,
    "Hyundai Creta": 182782,
    "Mahindra Scorpio": 178750,
  },
}

function leaderAt(year) {
  if (year <= LEADER[0][0]) return LEADER[0][1]
  for (let i = 1; i < LEADER.length; i += 1) {
    const [y1, v1] = LEADER[i]
    const [y0, v0] = LEADER[i - 1]
    if (year <= y1) {
      const t = (year - y0) / (y1 - y0)
      return Math.round(v0 + (v1 - v0) * t)
    }
  }
  return LEADER[LEADER.length - 1][1]
}

function ratiosFor(year, count) {
  let base
  if (year < 1985) base = [1, 0.7, 0.36, 0.25, 0.16, 0.11, 0.08]
  else if (year < 1998) base = [1, 0.58, 0.46, 0.38, 0.32, 0.27, 0.22, 0.18, 0.15, 0.12]
  else if (year < 2005) base = [1, 0.64, 0.52, 0.44, 0.37, 0.31, 0.26, 0.22, 0.18, 0.15]
  else if (year < 2018) base = [1, 0.78, 0.68, 0.6, 0.53, 0.47, 0.41, 0.36, 0.31, 0.27]
  else base = [1, 0.93, 0.87, 0.82, 0.77, 0.72, 0.67, 0.62, 0.58, 0.54]

  const ratios = base.slice()
  while (ratios.length < count) {
    ratios.push(ratios[ratios.length - 1] * 0.9)
  }
  return ratios
}

function buildYear(year, names) {
  const exact = EXACT[year] ?? {}
  const leaderValue = exact[names[0]] ?? leaderAt(year)
  const ratios = ratiosFor(year, names.length)
  let previous = Infinity

  return names.map((name, index) => {
    const pinned = exact[name] != null
    let value = pinned ? exact[name] : Math.round(leaderValue * ratios[index])
    if (value >= previous) {
      value = Math.max(1, Math.round(previous * (pinned ? 0.995 : 0.95)))
    }
    previous = value
    return {
      name,
      value,
      color: COLORS[name] ?? "#8aa0ad",
    }
  })
}

function putRange(rankings, from, to, names) {
  for (let year = from; year <= to; year += 1) rankings[year] = names
}

function rankingsByYear() {
  const rankings = {}

  putRange(rankings, 1970, 1972, [
    "Ambassador",
    "Padmini",
    "Standard Herald",
    "Mahindra Jeep",
  ])
  putRange(rankings, 1973, 1977, [
    "Ambassador",
    "Padmini",
    "Mahindra Jeep",
    "Standard Herald",
  ])
  putRange(rankings, 1978, 1979, [
    "Ambassador",
    "Padmini",
    "Mahindra Jeep",
    "Standard Herald",
    "Trekker",
  ])
  putRange(rankings, 1980, 1982, [
    "Ambassador",
    "Padmini",
    "Mahindra Jeep",
    "Trekker",
  ])
  rankings[1983] = [
    "Ambassador",
    "Padmini",
    "Mahindra Jeep",
    "Maruti 800",
    "Trekker",
  ]
  rankings[1984] = [
    "Ambassador",
    "Padmini",
    "Maruti 800",
    "Mahindra Jeep",
    "Maruti Omni",
    "Contessa",
  ]

  const modern = {
    1985: ["Maruti 800", "Padmini", "Ambassador", "Mahindra Jeep", "Maruti Omni", "Contessa", "Trekker"],
    1986: ["Maruti 800", "Padmini", "Ambassador", "Maruti Omni", "Mahindra Jeep", "Maruti Gypsy"],
    1987: ["Maruti 800", "Padmini", "Maruti Omni", "Mahindra Jeep", "Ambassador", "Premier 118 NE", "Maruti Gypsy"],
    1988: ["Maruti 800", "Padmini", "Maruti Omni", "Mahindra Jeep", "Ambassador", "Maruti Gypsy", "Premier 118 NE"],
    1989: ["Maruti 800", "Padmini", "Maruti Omni", "Mahindra Jeep", "Ambassador", "Maruti Gypsy", "Premier 118 NE"],
    1990: ["Maruti 800", "Padmini", "Maruti Omni", "Mahindra Jeep", "Ambassador", "Maruti Gypsy", "Premier 118 NE"],
    1991: ["Maruti 800", "Maruti Omni", "Padmini", "Mahindra Jeep", "Ambassador", "Premier 118 NE", "Maruti Gypsy"],
    1992: ["Maruti 800", "Mahindra Jeep", "Maruti Omni", "Ambassador", "Padmini", "Premier 118 NE", "Maruti Gypsy"],
    1993: ["Maruti 800", "Mahindra Jeep", "Maruti Omni", "Ambassador", "Padmini", "Maruti 1000", "Premier 118 NE"],
    1994: ["Maruti 800", "Mahindra Jeep", "Maruti Omni", "Ambassador", "Padmini", "Maruti 1000", "Premier 118 NE"],
    1995: ["Maruti 800", "Mahindra Jeep", "Maruti Esteem", "Maruti Omni", "Ambassador", "Maruti Zen", "Padmini", "Tata Sumo"],
    1996: ["Maruti 800", "Mahindra Jeep", "Maruti Omni", "Maruti Zen", "Tata Sumo", "Maruti Esteem", "Ambassador", "Daewoo Cielo"],
    1997: ["Maruti 800", "Mahindra Jeep", "Maruti Zen", "Maruti Omni", "Tata Sumo", "Ambassador", "Maruti Esteem", "Daewoo Cielo", "Opel Astra"],
    1998: ["Maruti 800", "Maruti Zen", "Maruti Omni", "Mahindra Jeep", "Tata Sumo", "Ambassador", "Maruti Esteem", "Hyundai Santro", "Honda City"],
    1999: ["Maruti 800", "Maruti Zen", "Maruti Omni", "Hyundai Santro", "Mahindra Jeep", "Tata Indica", "Daewoo Matiz", "Tata Sumo", "Maruti Esteem"],
    2000: ["Maruti 800", "Hyundai Santro", "Maruti Zen", "Maruti Omni", "Mahindra Jeep", "Tata Indica", "Daewoo Matiz", "Tata Sumo", "Toyota Qualis"],
    2001: ["Maruti 800", "Hyundai Santro", "Maruti Zen", "Maruti Omni", "Tata Indica", "Mahindra Jeep", "Maruti Alto", "Toyota Qualis", "Tata Sumo"],
    2002: ["Maruti 800", "Hyundai Santro", "Tata Indica", "Maruti Zen", "Maruti Omni", "Mahindra Jeep", "Maruti Wagon R", "Fiat Palio", "Maruti Alto"],
    2003: ["Maruti 800", "Hyundai Santro", "Tata Indica", "Maruti Zen", "Maruti Omni", "Maruti Wagon R", "Maruti Alto", "Mahindra Jeep", "Toyota Qualis"],
    2004: ["Maruti 800", "Maruti Alto", "Hyundai Santro", "Tata Indica", "Maruti Wagon R", "Maruti Zen", "Maruti Omni", "Mahindra Jeep", "Toyota Qualis", "Tata Indigo"],
    2005: ["Maruti Alto", "Hyundai Santro", "Tata Indica", "Maruti 800", "Maruti Wagon R", "Maruti Omni", "Maruti Zen", "Mahindra Jeep", "Maruti Swift", "Tata Indigo"],
    2006: ["Maruti Alto", "Hyundai Santro", "Tata Indica", "Maruti Wagon R", "Maruti 800", "Maruti Omni", "Maruti Swift", "Honda City", "Mahindra Jeep"],
    2007: ["Maruti Alto", "Tata Indica", "Maruti Wagon R", "Hyundai Santro", "Maruti Swift", "Maruti Omni", "Maruti 800", "Maruti Zen Estilo", "Hyundai i10", "Toyota Innova"],
    2008: ["Maruti Alto", "Maruti Wagon R", "Hyundai Santro", "Maruti Swift", "Hyundai i10", "Tata Indica", "Maruti Omni", "Maruti 800", "Maruti Dzire", "Toyota Innova"],
    2009: ["Maruti Alto", "Maruti Wagon R", "Hyundai i10", "Tata Indica", "Maruti Swift", "Maruti Omni", "Hyundai Santro", "Maruti Dzire", "Mahindra Bolero", "Honda City"],
    2010: ["Maruti Alto", "Hyundai i10", "Maruti Wagon R", "Maruti Swift", "Tata Indica", "Maruti Dzire", "Maruti Omni", "Hyundai Santro", "Tata Indigo", "Mahindra Bolero"],
    2011: ["Maruti Alto", "Maruti Wagon R", "Hyundai i10", "Maruti Swift", "Tata Indica", "Maruti Dzire", "Mahindra Bolero", "Maruti Omni", "Hyundai i20", "Tata Indigo"],
    2012: ["Maruti Alto", "Maruti Swift", "Maruti Dzire", "Maruti Wagon R", "Mahindra Bolero", "Hyundai i10", "Tata Indica", "Hyundai Eon", "Hyundai i20", "Tata Nano"],
    2013: ["Maruti Alto", "Maruti Swift", "Maruti Dzire", "Maruti Wagon R", "Mahindra Bolero", "Hyundai Eon", "Hyundai i10", "Hyundai i20", "Toyota Innova", "Maruti Ertiga"],
    2014: ["Maruti Alto", "Maruti Dzire", "Maruti Swift", "Maruti Wagon R", "Hyundai i10", "Mahindra Bolero", "Hyundai Eon", "Honda City", "Maruti Omni", "Hyundai i20"],
    2015: ["Maruti Alto", "Maruti Dzire", "Maruti Swift", "Maruti Wagon R", "Hyundai i20", "Hyundai i10", "Mahindra Bolero", "Maruti Celerio", "Honda City", "Hyundai Eon"],
    2016: ["Maruti Alto", "Maruti Dzire", "Maruti Wagon R", "Maruti Swift", "Hyundai i10", "Hyundai i20", "Maruti Baleno", "Renault Kwid", "Hyundai Creta", "Maruti Celerio"],
    2017: ["Maruti Alto", "Maruti Dzire", "Maruti Baleno", "Maruti Swift", "Maruti Wagon R", "Hyundai i10", "Maruti Brezza", "Hyundai i20", "Hyundai Creta", "Maruti Celerio"],
    2018: ["Maruti Dzire", "Maruti Alto", "Maruti Swift", "Maruti Baleno", "Maruti Brezza", "Maruti Wagon R", "Hyundai i20", "Hyundai i10", "Hyundai Creta", "Maruti Celerio"],
    2019: ["Maruti Alto", "Maruti Dzire", "Maruti Swift", "Maruti Baleno", "Maruti Wagon R", "Maruti Brezza", "Hyundai i20", "Maruti Eeco", "Hyundai i10", "Hyundai Creta"],
    2020: ["Maruti Swift", "Maruti Alto", "Maruti Baleno", "Maruti Wagon R", "Maruti Dzire", "Maruti Eeco", "Hyundai Creta", "Kia Seltos", "Hyundai i10", "Maruti Brezza"],
    2021: ["Maruti Wagon R", "Maruti Swift", "Maruti Baleno", "Maruti Alto", "Hyundai Creta", "Maruti Dzire", "Maruti Brezza", "Maruti Eeco", "Maruti Ertiga", "Tata Nexon"],
    2022: ["Maruti Wagon R", "Maruti Baleno", "Maruti Swift", "Tata Nexon", "Maruti Alto", "Maruti Dzire", "Hyundai Creta", "Maruti Ertiga", "Maruti Brezza", "Tata Punch"],
    2023: ["Maruti Swift", "Maruti Wagon R", "Maruti Baleno", "Maruti Brezza", "Tata Nexon", "Maruti Dzire", "Hyundai Creta", "Tata Punch", "Maruti Eeco", "Maruti Ertiga"],
    2024: ["Tata Punch", "Maruti Wagon R", "Maruti Ertiga", "Maruti Brezza", "Hyundai Creta", "Maruti Swift", "Maruti Baleno", "Maruti Dzire", "Mahindra Scorpio", "Tata Nexon"],
    2025: ["Maruti Dzire", "Hyundai Creta", "Tata Nexon", "Maruti Wagon R", "Maruti Ertiga", "Maruti Swift", "Maruti Fronx", "Mahindra Scorpio", "Maruti Brezza", "Tata Punch"],
    2026: ["Maruti Dzire", "Tata Punch", "Tata Nexon", "Maruti Ertiga", "Maruti Wagon R", "Maruti Swift", "Maruti Baleno", "Maruti Fronx", "Hyundai Creta", "Mahindra Scorpio"],
  }

  Object.assign(rankings, modern)
  return rankings
}

export const START_YEAR = 1970
export const END_YEAR = 2026

export const frames = Object.entries(rankingsByYear())
  .map(([year, names]) => ({
    year: Number(year),
    entries: buildYear(Number(year), names),
  }))
  .sort((a, b) => a.year - b.year)

export function captionFor(year) {
  const y = Math.floor(year)
  if (y < 1983) return "Ambassador leads a closed market. Padmini stays close behind."
  if (y < 1985) return "The Maruti 800 arrives, still finding its feet."
  if (y < 2005) return "Maruti 800 holds the top spot for two decades."
  if (y < 2018) return "Alto takes over and becomes India’s long-running best seller."
  if (y < 2020) return "Dzire interrupts the Alto, then the Alto takes the crown back."
  if (y < 2024) return "Swift and Wagon R trade places at the top."
  if (y < 2025) return "Tata Punch ends Maruti’s forty-year run at number one."
  if (y < 2026) return "Dzire is the best-selling car again."
  return "2026 pace so far: Dzire, Punch and Nexon."
}

export const DATA_NOTE =
  "Rank order follows published best-seller lists. Bars are annual domestic sales: reported numbers where those exist, and estimates scaled to market size everywhere else. Trucks are left out. 2026 is a January–June pace, doubled, not a finished year. 2008 is a bridge between the 2007 and 2009 lists."
