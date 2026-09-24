import { Route, Routes } from "react-router-dom"
import ChartPage from "./pages/ChartPage.jsx"
import HomePage from "./pages/HomePage.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chart/:chartId" element={<ChartPage />} />
    </Routes>
  )
}
