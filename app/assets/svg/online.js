import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      {...props}
    >
      <G data-name="Ellipse 82" fill="#43b11b" stroke="#f2f4f8" strokeWidth={2}>
        <Circle cx={7} cy={7} r={7} stroke="none" />
        <Circle cx={7} cy={7} r={6} fill="none" />
      </G>
    </Svg>
  )
}

export default SvgComponent
