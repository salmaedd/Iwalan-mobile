import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Text,
  TSpan,
} from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      data-name="Group 60"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.139}
          y1={0.245}
          x2={0.896}
          y2={0.663}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#91a1bc" />
          <Stop offset={1} stopColor="#7a879d" />
        </LinearGradient>
        <LinearGradient
          id="prefix__b"
          x1={0.139}
          y1={0.245}
          x2={0.865}
          y2={0.717}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#7a879d" />
          <Stop offset={1} stopColor="#d0dbed" />
        </LinearGradient>
      </Defs>
      <G data-name="Ellipse 35" stroke="#a6b4cc" fill="url(#prefix__a)">
        <Circle cx={11} cy={11} r={11} stroke="none" />
        <Circle cx={11} cy={11} r={10.5} fill="none" />
      </G>
      <Circle
        data-name="Ellipse 36"
        cx={9}
        cy={9}
        r={9}
        transform="translate(2 2)"
        fill="url(#prefix__b)"
      />
      <Text
        transform="translate(7 16)"
        fill="#5b6983"
        stroke="#c0cbdd"
        strokeWidth={0.4}
        fontSize={14}
        fontFamily="SofiaProBold, Sofia Pro"
      >
        <TSpan x={0} y={0}>
          {"P"}
        </TSpan>
      </Text>
    </Svg>
  )
}

export default SvgComponent
