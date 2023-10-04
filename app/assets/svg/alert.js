import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      {...props}
    >
      <G transform="translate(.129 .128)" fill="#f52424" data-name="Layer 2">
        <Path
          data-name="Path 409"
          d="M16.614 12.025l-5.623-9.326a2.515 2.515 0 00-4.238 0l-5.624 9.326a2.2 2.2 0 00-.037 2.2 2.471 2.471 0 002.156 1.246h11.247a2.471 2.471 0 002.156-1.217 2.2 2.2 0 00-.037-2.229zm-1.246 1.5a.96.96 0 01-.873.477H3.248a.96.96 0 01-.873-.477.733.733 0 010-.733l5.628-9.331a1.085 1.085 0 011.73 0l5.624 9.326a.733.733 0 01.007.741z"
        />
        <Circle
          data-name="Ellipse 94"
          cx={1}
          cy={1}
          r={1}
          transform="translate(7.872 10.872)"
        />
        <Path
          data-name="Path 410"
          d="M8.872 5.939a.733.733 0 00-.733.733v2.933a.733.733 0 101.466 0V6.672a.733.733 0 00-.733-.733z"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
