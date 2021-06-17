import "./App.css"
import React, { useEffect, useRef } from "react"
import * as vl from "vega-lite-api"
import * as vega from "vega"
import * as vegaLite from "vega-lite"
import { csv } from "d3"

async function getData(url) {
  const data = await csv(url)
  console.log(data[0])
  return data
}

const dataUrl =
  "https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/194c2fc143790b937c42bf086a5a44cb3c55340e/auto-mpg.csv"

const viz = vl
  .markCircle({ size: 300, opacity: 0.5 })
  .encode(
    vl.x().fieldQ("mpg").scale({ zero: false }),
    vl.y().fieldQ("horsepower").scale({ zero: false }),
    vl.color().fieldN("origin"),
    vl.size().fieldQ("weight"),
    vl.tooltip().fieldN("name")
  )

const VegaLiteComponent = () => {
  const chartRef = useRef(null)
  useEffect(() => {
    vl.register(vega, vegaLite, {})

    getData(dataUrl).then((data) => {
      viz
        .data(data)
        .width(window.innerWidth)
        .height(window.innerHeight)
        .autosize({ type: "fit", contains: "padding" })
        .render()
        .then((chart) => {
          chartRef.current.appendChild(chart)
        })
    })
  }, [])

  return <div ref={chartRef}></div>
}

const App = () => {
  return <VegaLiteComponent />
}

export default App
