import * as React from 'react';
import Svg, { Defs, G, Circle, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={121} height={121} viewBox="0 0 121 121" {...props}>
      <Defs />
      <G data-name="Group 474">
        <G filter="url(#prefix__a)">
          <G fill="#fff" stroke="#fb4896" data-name="Ellipse 76" transform="translate(13.5 5.5)">
            <Circle cx={47} cy={47} r={47} stroke="none" />
            <Circle cx={47} cy={47} r={46} fill="none" />
          </G>
        </G>
        <G fill="#fb4896" data-name="Group 282">
          <Path
            d="M80.302 45.383v11.91l-.018 9.967q-.354 9.963-9.932 11.551a24.038 24.038 0 01-3.938.3H55.379a23.885 23.885 0 01-3.938-.3q-9.582-1.589-9.932-11.551l-.009-9.967v-11.91h9.083V65.86c0 2.389.578 4.025 1.724 4.927s3.29 1.339 6.406 1.339h4.367q4.673 0 6.406-1.339c1.146-.9 1.724-2.538 1.724-4.927V45.383z"
            data-name="Path 68"
          />
          <G data-name="Group 281">
            <Path
              d="M59.7 33.664h-7.341a16.435 16.435 0 01-2.778-1.287c-1.4-.867-1.606-1.555-1.644-1.988a4.5 4.5 0 01.93-2.562c.879-1.415 1.619-2.129 2.409-2.32a2.954 2.954 0 012.2.561c2.592 1.593 6.288 5.671 6.224 7.596z"
              data-name="Path 69"
            />
            <Path
              d="M73.695 30.387c-.038.433-.242 1.121-1.644 1.988a16.444 16.444 0 01-2.778 1.287h-7.341c-.064-1.925 3.632-6 6.22-7.6 1.364-.841 2.129-.637 2.587-.42a5.378 5.378 0 012.027 2.179 4.5 4.5 0 01.929 2.566z"
              data-name="Path 70"
            />
            <Path d="M80.182 36.58v5.621a.7.7 0 01-.7.7h-12.5v-7.023h12.5a.7.7 0 01.7.702z" data-name="Path 71" />
            <Path d="M56.896 35.879h7.889v7.023h-7.889z" data-name="Rectangle 191" />
            <Path d="M54.685 35.879v7.023H42.201a.691.691 0 01-.7-.7v-5.621a.691.691 0 01.7-.7z" data-name="Path 72" />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
