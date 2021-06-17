import "./App.css"
import React, { useEffect, useRef } from "react"
import * as vl from "vega-lite-api"
import * as vega from "vega"
import * as vegaLite from "vega-lite"

const data = [
  { a: "A", b: 28 },
  { a: "B", b: 55 },
  { a: "C", b: 43 },
  { a: "D", b: 91 },
  { a: "E", b: 81 },
  { a: "F", b: 53 },
  { a: "G", b: 19 },
  { a: "H", b: 87 },
  { a: "I", b: 52 },
]

const VegaLiteComponent = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    vl.register(vega, vegaLite, {})

    vl.markBar()
      .data(data)
      .encode(vl.x().fieldQ("b"), vl.y().fieldN("a"), vl.tooltip([vl.fieldQ("b"), vl.fieldN("a")]))
      .render()
      .then((chart) => {
        chartRef.current.appendChild(chart)
      })
  }, [])

  return <div ref={chartRef}></div>
}

const App = () => {
  return <VegaLiteComponent />
}

export default App
