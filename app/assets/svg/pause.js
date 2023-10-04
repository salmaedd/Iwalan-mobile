import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Path,
  G,
  Circle,
  Rect,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 41 41"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__b"
          x1={0.347}
          x2={0.671}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fb4896" />
          <Stop offset={1} stopColor="#c40055" />
        </LinearGradient>
        <ClipPath id="prefix__c">
          <Path fill="none" d="M0 0h8v7H0z" />
        </ClipPath>
      </Defs>
      <G data-name="Group 149">
        <G filter="url(#prefix__a)">
          <Circle
            data-name="Ellipse 38"
            cx={13}
            cy={13}
            r={13}
            transform="translate(7.5 3.5)"
            fill="url(#prefix__b)"
          />
        </G>
        <G
          data-name="Repeat Grid 4"
          transform="translate(16.5 13.5)"
          clipPath="url(#prefix__c)"
        >
          <Rect
            data-name="Rectangle 90"
            width={2}
            height={7}
            rx={1}
            fill="#fff"
          />
          <Rect
            data-name="Rectangle 90"
            width={2}
            height={7}
            rx={1}
            transform="translate(6)"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
