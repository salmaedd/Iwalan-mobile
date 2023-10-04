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
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      data-name="Group 60"
      viewBox="0 0 22 22"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.139}
          x2={0.896}
          y1={0.245}
          y2={0.663}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} />
          <Stop offset={1} />
        </LinearGradient>
        <LinearGradient
          id="prefix__b"
          x1={0.139}
          x2={0.865}
          y1={0.245}
          y2={0.717}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} />
          <Stop offset={1} />
        </LinearGradient>
      </Defs>
      <G fill="url(#prefix__a)" stroke="#a6b4cc" data-name="Ellipse 35">
        <Circle cx={11} cy={11} r={11} stroke="none" />
        <Circle cx={11} cy={11} r={10.5} fill="none" />
      </G>
      <Circle
        cx={9}
        cy={9}
        r={9}
        fill="url(#prefix__b)"
        data-name="Ellipse 36"
        transform="translate(2 2)"
      />
      <Text fill="#5b6983" stroke="#c0cbdd" transform="translate(7 16)">
        <TSpan x={0} y={0}>
          {" P "}
        </TSpan>
      </Text>
    </Svg>
  )
}

export default SvgComponent
