import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G fill="#7a879d">
        <Circle
          data-name="Ellipse 77"
          cx={1.5}
          cy={1.5}
          r={1.5}
          transform="translate(10.5 10.5)"
        />
        <Path
          data-name="Path 74"
          d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 000 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 000-1zm-9.87 4a3.5 3.5 0 113.5-3.5 3.5 3.5 0 01-3.5 3.5z"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
