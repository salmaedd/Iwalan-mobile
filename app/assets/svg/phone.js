import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      {...props}
    >
      <Path
        data-name="Path 62"
        d="M20.328 25.728A18.083 18.083 0 012.271 7.671a5.394 5.394 0 015.394-5.4 4.618 4.618 0 01.9.082 4.443 4.443 0 01.844.211 1.173 1.173 0 01.762.88l1.606 7.037a1.173 1.173 0 01-.3 1.079c-.152.164-.164.176-1.606.927a11.621 11.621 0 005.71 5.735c.762-1.454.774-1.466.938-1.619a1.172 1.172 0 011.079-.3l7.035 1.607a1.173 1.173 0 01.844.762 5.091 5.091 0 01.223.856 5.6 5.6 0 01.07.891 5.394 5.394 0 01-5.442 5.309z"
        fill="#fb4896"
      />
    </Svg>
  )
}

export default SvgComponent
