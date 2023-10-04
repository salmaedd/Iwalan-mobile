import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
        >
            <Defs>
                <LinearGradient
                    id="prefix__a"
                    x1={0.68}
                    x2={0.303}
                    y1={0.309}
                    y2={0.622}
                    gradientUnits="objectBoundingBox"
                >
                    <Stop offset={0} />
                    <Stop offset={1} />
                </LinearGradient>
            </Defs>
            <G data-name="Layer 2">
                <Path
                    fill={props.fill}
                    d="M14.448 14.667l-1.561-6.08a4.013 4.013 0 00.885-2.533 4.053 4.053 0 10-8.107 0A4.013 4.013 0 006.57 8.6l-1.58 6.067a.676.676 0 001 .75l3.6-2.117 3.837 2.121a.615.615 0 00.345.088.676.676 0 00.676-.844zM9.719 3.351a2.7 2.7 0 11-2.7 2.7 2.7 2.7 0 012.7-2.7z"
                    data-name="Path 79"
                    transform="translate(-1.719 -.756)"
                />
            </G>
        </Svg>
    )
}

export default SvgComponent
