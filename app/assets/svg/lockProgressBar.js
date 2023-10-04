import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      {...props}
    >
      <G data-name="Group 62" transform="translate(-250 -283)">
        <Circle
          data-name="Ellipse 39"
          cx={18}
          cy={18}
          r={18}
          transform="translate(250 283)"
          fill="#fff"
        />
        <G data-name="Group 57">
          <Path
            data-name="Path 32"
            d="M258.493 310.507A13.445 13.445 0 10268 287.555V301z"
            fill="none"
          />
          <Path
            data-name="Path 33"
            d="M268 285v2.555a13.445 13.445 0 11-9.507 22.952l-1.806 1.806A16 16 0 10268 285z"
            fill="#fb4896"
          />
          <Path
            data-name="Path 34"
            d="M254.555 301A13.445 13.445 0 01268 287.555V285a16 16 0 00-11.313 27.313l1.806-1.806a13.408 13.408 0 01-3.938-9.507z"
            fill="#e4e8ef"
          />
        </G>
        <G data-name="Layer 2">
          <Path
            data-name="Path 35"
            d="M271.661 296.623h-.732v-1.383a2.929 2.929 0 10-5.857 0v1.383h-.729a2.2 2.2 0 00-2.2 2.197v5.857a2.2 2.2 0 002.2 2.2h7.321a2.2 2.2 0 002.2-2.2v-5.857a2.2 2.2 0 00-2.203-2.197zm-5.125-1.383a1.466 1.466 0 112.929 0v1.383h-2.929zm1.464 8.705a2.2 2.2 0 112.2-2.2 2.2 2.2 0 01-2.2 2.2z"
            fill="#7a879d"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
