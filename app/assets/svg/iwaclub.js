import * as React from "react"
import Svg, { Defs, G, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg width={121} height={121} viewBox="0 0 121 121" {...props}>
      <Defs></Defs>
      <G data-name="Group 474">
        <G
          transform="translate(-146.5 -96.5) translate(146.5 96.5)"
          filter="url(#a)"
        >
          <G
            data-name="Ellipse 76"
            transform="translate(13.5 5.5)"
            fill="#fff"
            stroke="#fb4896"
            strokeWidth={2}
          >
            <Circle cx={47} cy={47} r={47} stroke="none" />
            <Circle cx={47} cy={47} r={46} fill="none" />
          </G>
        </G>
        <G data-name="Group 282" fill="#fb4896">
          <Path
            data-name="Path 68"
            d="M419.759 199.109v11.91l-.018 9.967q-.354 9.963-9.932 11.551a24.038 24.038 0 01-3.938.3h-11.035a23.885 23.885 0 01-3.938-.3q-9.582-1.589-9.932-11.551l-.009-9.967v-11.91h9.083v20.477c0 2.389.578 4.025 1.724 4.927s3.29 1.339 6.406 1.339h4.367q4.673 0 6.406-1.339c1.146-.9 1.724-2.538 1.724-4.927v-20.477z"
            transform="translate(-146.5 -96.5) translate(-192.957 1.424) translate(0 -58.65)"
          />
          <G
            data-name="Group 281"
            transform="translate(-146.5 -96.5) translate(-192.957 1.424) translate(380.957 120.531)"
          >
            <Path
              data-name="Path 69"
              d="M418.075 128.74h-7.341a16.435 16.435 0 01-2.778-1.287c-1.4-.867-1.606-1.555-1.644-1.988a4.5 4.5 0 01.93-2.562c.879-1.415 1.619-2.129 2.409-2.32a2.954 2.954 0 012.2.561c2.592 1.593 6.288 5.671 6.224 7.596z"
              transform="translate(-399.875 -120.531)"
            />
            <Path
              data-name="Path 70"
              d="M473.281 125.466c-.038.433-.242 1.121-1.644 1.988a16.444 16.444 0 01-2.778 1.287h-7.341c-.064-1.925 3.632-6 6.22-7.6 1.364-.841 2.129-.637 2.587-.42a5.378 5.378 0 012.027 2.179 4.5 4.5 0 01.929 2.566z"
              transform="translate(-441.086 -120.534)"
            />
            <Path
              data-name="Path 71"
              d="M494.642 162.336v5.621a.7.7 0 01-.7.7h-12.5v-7.023h12.5a.7.7 0 01.7.702z"
              transform="translate(-455.96 -151.211)"
            />
            <Path
              data-name="Rectangle 191"
              transform="translate(15.396 10.424)"
              d="M0 0H7.889V7.023H0z"
            />
            <Path
              data-name="Path 72"
              d="M394.142 161.634v7.023h-12.484a.691.691 0 01-.7-.7v-5.621a.691.691 0 01.7-.7z"
              transform="translate(-380.957 -151.21)"
            />
          </G>
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
