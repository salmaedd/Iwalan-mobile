import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 71 71"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__b"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fb4896" />
          <Stop offset={1} stopColor="#c40055" />
        </LinearGradient>
      </Defs>
      <G data-name="Group 35">
        <G filter="url(#prefix__a)">
          <Circle
            data-name="Ellipse 34"
            cx={16}
            cy={16}
            r={16}
            transform="translate(19.5 6.5)"
            fill="url(#prefix__b)"
          />
        </G>
        <G data-name="Layer 2">
          <Path
            data-name="Path 21"
            d="M36.91 22.5l4.3-4.29a1.004 1.004 0 10-1.42-1.42l-4.29 4.3-4.29-4.3a1.004 1.004 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1.004 1.004 0 101.42 1.42l4.29-4.3 4.29 4.3a1.004 1.004 0 101.42-1.42z"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
