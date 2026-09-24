import { Link } from "react-router-dom"
import { charts } from "../data/charts.js"

// just adding comment to trigger a build
export default function HomePage() {
  return (
    <div className="home">
      <header className="home-hero">
        <p className="eyebrow">Race bar</p>
        <h1>Watch the rankings move.</h1>
        <p className="lede">
          Bar-chart races in the style of those YouTube and Facebook videos.
          Pick a chart, press play, and follow who leads as the years run.
        </p>
      </header>

      <section className="catalog" aria-labelledby="chart-list-title">
        <div className="catalog-head">
          <h2 id="chart-list-title">Charts</h2>
          <span>{charts.length} ready</span>
        </div>
        <ul className="chart-list">
          {charts.map((chart) => (
            <li key={chart.id}>
              <Link className="chart-card" to={`/chart/${chart.id}`}>
                <div className="card-copy">
                  <p className="card-kicker">{chart.kicker}</p>
                  <h3>{chart.title}</h3>
                  <p>{chart.summary}</p>
                  <div className="card-meta">
                    {chart.badges.map((badge) => (
                      <span key={badge}>{badge}</span>
                    ))}
                  </div>
                </div>
                <div className="card-preview" aria-hidden="true">
                  {chart.preview.map((item, index) => (
                    <div className="preview-row" key={item.label}>
                      <span>{item.label}</span>
                      <span className="preview-track">
                        <span
                          style={{
                            width: `${88 - index * 12}%`,
                            background: item.color,
                          }}
                        />
                      </span>
                    </div>
                  ))}
                  <span className="watch">Play race</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
