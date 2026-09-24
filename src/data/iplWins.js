/**
 * Cumulative IPL match wins, season by season, 2008–2026.
 *
 * Each season is league wins from the points table plus knockout wins.
 * League figures are from the published points tables. Knockout winners
 * are from the match lists through 2025, and from the 2026 Qualifier 1,
 * Eliminator, Qualifier 2, and final.
 *
 * Delhi Daredevils stay on the Delhi Capitals bar, and Kings XI Punjab
 * stay on the Punjab Kings bar. Deccan Chargers and Sunrisers Hyderabad
 * are separate teams. Chennai Super Kings and Rajasthan Royals sat out
 * 2016 and 2017.
 */

const COLORS = {
  "Mumbai Indians": "#004ba0",
  "Chennai Super Kings": "#f5c518",
  "Kolkata Knight Riders": "#7e22ce",
  "Royal Challengers": "#e10600",
  "Rajasthan Royals": "#ea1a85",
  "Punjab Kings": "#fb7185",
  "Delhi Capitals": "#2563eb",
  "Sunrisers Hyderabad": "#f26522",
  "Gujarat Titans": "#0f766e",
  "Lucknow Super Giants": "#22d3ee",
  "Deccan Chargers": "#64748b",
  "Gujarat Lions": "#f59e0b",
  "Rising Pune": "#a855f7",
  "Pune Warriors": "#0e7490",
  "Kochi Tuskers": "#16a34a",
}

/** Wins added in that season, league plus playoffs. */
const SEASONS = {
  2008: {
    "Rajasthan Royals": 13,
    "Punjab Kings": 10,
    "Chennai Super Kings": 9,
    "Delhi Capitals": 7,
    "Mumbai Indians": 7,
    "Kolkata Knight Riders": 6,
    "Royal Challengers": 4,
    "Deccan Chargers": 2,
  },
  2009: {
    "Delhi Capitals": 10,
    "Royal Challengers": 9,
    "Deccan Chargers": 9,
    "Chennai Super Kings": 8,
    "Punjab Kings": 7,
    "Rajasthan Royals": 6,
    "Mumbai Indians": 5,
    "Kolkata Knight Riders": 3,
  },
  2010: {
    "Mumbai Indians": 11,
    "Chennai Super Kings": 9,
    "Deccan Chargers": 8,
    "Royal Challengers": 7,
    "Delhi Capitals": 7,
    "Kolkata Knight Riders": 7,
    "Rajasthan Royals": 6,
    "Punjab Kings": 4,
  },
  2011: {
    "Chennai Super Kings": 11,
    "Royal Challengers": 10,
    "Mumbai Indians": 10,
    "Kolkata Knight Riders": 8,
    "Punjab Kings": 7,
    "Rajasthan Royals": 6,
    "Deccan Chargers": 6,
    "Kochi Tuskers": 6,
    "Pune Warriors": 4,
    "Delhi Capitals": 4,
  },
  2012: {
    "Kolkata Knight Riders": 12,
    "Delhi Capitals": 11,
    "Mumbai Indians": 10,
    "Chennai Super Kings": 10,
    "Royal Challengers": 8,
    "Punjab Kings": 8,
    "Rajasthan Royals": 7,
    "Deccan Chargers": 4,
    "Pune Warriors": 4,
  },
  2013: {
    "Mumbai Indians": 13,
    "Chennai Super Kings": 12,
    "Rajasthan Royals": 11,
    "Sunrisers Hyderabad": 10,
    "Royal Challengers": 9,
    "Punjab Kings": 8,
    "Kolkata Knight Riders": 6,
    "Pune Warriors": 4,
    "Delhi Capitals": 3,
  },
  2014: {
    "Punjab Kings": 12,
    "Kolkata Knight Riders": 11,
    "Chennai Super Kings": 10,
    "Mumbai Indians": 7,
    "Rajasthan Royals": 7,
    "Sunrisers Hyderabad": 6,
    "Royal Challengers": 5,
    "Delhi Capitals": 2,
  },
  2015: {
    "Chennai Super Kings": 10,
    "Mumbai Indians": 10,
    "Royal Challengers": 8,
    "Rajasthan Royals": 7,
    "Kolkata Knight Riders": 7,
    "Sunrisers Hyderabad": 7,
    "Delhi Capitals": 5,
    "Punjab Kings": 3,
  },
  2016: {
    "Sunrisers Hyderabad": 11,
    "Royal Challengers": 9,
    "Gujarat Lions": 9,
    "Kolkata Knight Riders": 8,
    "Mumbai Indians": 7,
    "Delhi Capitals": 7,
    "Rising Pune": 5,
    "Punjab Kings": 4,
  },
  2017: {
    "Mumbai Indians": 12,
    "Rising Pune": 10,
    "Kolkata Knight Riders": 9,
    "Sunrisers Hyderabad": 8,
    "Punjab Kings": 7,
    "Delhi Capitals": 6,
    "Gujarat Lions": 4,
    "Royal Challengers": 3,
  },
  2018: {
    "Chennai Super Kings": 11,
    "Sunrisers Hyderabad": 10,
    "Kolkata Knight Riders": 9,
    "Rajasthan Royals": 7,
    "Mumbai Indians": 6,
    "Royal Challengers": 6,
    "Punjab Kings": 6,
    "Delhi Capitals": 5,
  },
  2019: {
    "Mumbai Indians": 11,
    "Chennai Super Kings": 10,
    "Delhi Capitals": 10,
    "Sunrisers Hyderabad": 6,
    "Kolkata Knight Riders": 6,
    "Punjab Kings": 6,
    "Rajasthan Royals": 5,
    "Royal Challengers": 5,
  },
  2020: {
    "Mumbai Indians": 11,
    "Delhi Capitals": 9,
    "Sunrisers Hyderabad": 8,
    "Royal Challengers": 7,
    "Kolkata Knight Riders": 7,
    "Punjab Kings": 6,
    "Chennai Super Kings": 6,
    "Rajasthan Royals": 6,
  },
  2021: {
    "Chennai Super Kings": 11,
    "Delhi Capitals": 10,
    "Royal Challengers": 9,
    "Kolkata Knight Riders": 9,
    "Mumbai Indians": 7,
    "Punjab Kings": 6,
    "Rajasthan Royals": 5,
    "Sunrisers Hyderabad": 3,
  },
  2022: {
    "Gujarat Titans": 12,
    "Rajasthan Royals": 10,
    "Lucknow Super Giants": 9,
    "Royal Challengers": 9,
    "Delhi Capitals": 7,
    "Punjab Kings": 7,
    "Kolkata Knight Riders": 6,
    "Sunrisers Hyderabad": 6,
    "Chennai Super Kings": 4,
    "Mumbai Indians": 4,
  },
  2023: {
    "Gujarat Titans": 11,
    "Chennai Super Kings": 10,
    "Mumbai Indians": 9,
    "Lucknow Super Giants": 8,
    "Rajasthan Royals": 7,
    "Royal Challengers": 7,
    "Kolkata Knight Riders": 6,
    "Punjab Kings": 6,
    "Delhi Capitals": 5,
    "Sunrisers Hyderabad": 4,
  },
  2024: {
    "Kolkata Knight Riders": 11,
    "Sunrisers Hyderabad": 9,
    "Rajasthan Royals": 9,
    "Royal Challengers": 7,
    "Chennai Super Kings": 7,
    "Delhi Capitals": 7,
    "Lucknow Super Giants": 7,
    "Gujarat Titans": 5,
    "Punjab Kings": 5,
    "Mumbai Indians": 4,
  },
  2025: {
    "Royal Challengers": 11,
    "Punjab Kings": 10,
    "Gujarat Titans": 9,
    "Mumbai Indians": 9,
    "Delhi Capitals": 7,
    "Sunrisers Hyderabad": 6,
    "Lucknow Super Giants": 6,
    "Kolkata Knight Riders": 5,
    "Rajasthan Royals": 4,
    "Chennai Super Kings": 4,
  },
  2026: {
    "Royal Challengers": 11,
    "Gujarat Titans": 10,
    "Sunrisers Hyderabad": 9,
    "Rajasthan Royals": 9,
    "Punjab Kings": 7,
    "Delhi Capitals": 7,
    "Kolkata Knight Riders": 6,
    "Chennai Super Kings": 6,
    "Mumbai Indians": 4,
    "Lucknow Super Giants": 4,
  },
}

const CHAMPIONS = {
  2008: "Rajasthan Royals win the first IPL.",
  2009: "Deccan Chargers take the title.",
  2010: "Chennai Super Kings win their first title.",
  2011: "Chennai Super Kings go back to back.",
  2012: "Kolkata Knight Riders lift the trophy.",
  2013: "Mumbai Indians win their first title.",
  2014: "Kolkata Knight Riders win it again.",
  2015: "Mumbai Indians are champions.",
  2016: "Sunrisers Hyderabad win it. CSK and the Royals sit out.",
  2017: "Mumbai Indians win a third title.",
  2018: "Chennai Super Kings return and win the title.",
  2019: "Mumbai Indians edge CSK in the final.",
  2020: "Mumbai Indians win their fifth title.",
  2021: "Chennai Super Kings win their fourth.",
  2022: "Gujarat Titans win in their first season.",
  2023: "Chennai Super Kings win a fifth title.",
  2024: "Kolkata Knight Riders win their third.",
  2025: "Royal Challengers win their first title.",
  2026: "Royal Challengers win it again.",
}

function buildFrames() {
  const cumulative = {}
  return Object.keys(SEASONS)
    .map(Number)
    .sort((a, b) => a - b)
    .map((year) => {
      Object.entries(SEASONS[year]).forEach(([name, wins]) => {
        cumulative[name] = (cumulative[name] ?? 0) + wins
      })
      const entries = Object.entries(cumulative)
        .map(([name, value]) => ({
          name,
          value,
          color: COLORS[name],
        }))
        .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name))
      return { year, entries }
    })
}

export const START_YEAR = 2008
export const END_YEAR = 2026
export const frames = buildFrames()

export function captionFor(year) {
  return CHAMPIONS[Math.floor(year)] ?? "Match wins, season by season."
}

export const DATA_NOTE =
  "Bars are cumulative match wins after each season, counting league games and playoffs. A no-result is not a win. Delhi Daredevils are included with Delhi Capitals, and Kings XI Punjab with Punjab Kings. Deccan Chargers and Sunrisers Hyderabad are separate teams. Chennai Super Kings and Rajasthan Royals did not play in 2016 or 2017."
