import * as React from 'react';
import Svg, { Defs, LinearGradient, Stop, G, Circle, Text, TSpan } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} viewBox="0 0 33 33" {...props}>
      <Defs>
        <LinearGradient
          id="prefix__a"
          start={{ x: 0.139, y: 0.245 }}
          end={{ x: 0.896, y: 0.663 }}
          colors={['#ffd584', '#ffffff']}
          // x1={0.139}
          // x2={0.896}
          // y1={0.245}
          // y2={0.663}
          // gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} />
          <Stop offset={1} />
        </LinearGradient>
        <LinearGradient
          id="prefix__b"
          start={{ x: 0.139, y: 0.245 }}
          end={{ x: 0.896, y: 0.717 }}
          colors={['#ffd584', '#ffffff']}
          // x1={0.139}
          // x2={0.865}
          // y1={0.245}
          // y2={0.717}
          // gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} />
          <Stop offset={1} />
        </LinearGradient>
      </Defs>
      <G data-name="Group 41" transform="translate(0 .051)">
        <G fill="url(#prefix__a)" stroke="#fcc967" data-name="Ellipse 35" transform="translate(0 -.051)">
          <Circle cx={16.5} cy={16.5} r={16.5} stroke="none" />
          <Circle cx={16.5} cy={16.5} r={16} fill="none" />
        </G>
        <Circle
          cx={13.5}
          cy={13.5}
          r={13.5}
          fill="url(#prefix__b)"
          data-name="Ellipse 36"
          transform="translate(3 2.949)"
        />
        <Text fill="#c18e2a" stroke="#ffd584" transform="translate(11 22.949)">
          <TSpan x={0} y={0}>
            {' P '}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}

export default SvgComponent;
