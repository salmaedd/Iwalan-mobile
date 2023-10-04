import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={11.139}
            height={15.484}
            viewBox="0 0 11.139 15.484"
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
            <Path
                fill={props.fill}
                stroke="rgba(0,0,0,0)"
                d="M12.867 2h-1.762a.311.311 0 00-.311.311V4.94A6.479 6.479 0 0113.691 6V2.823A.823.823 0 0012.867 2zM8.984 2H7.272a.823.823 0 00-.823.823V6a6.479 6.479 0 012.9-1.057V2.361A.362.362 0 008.984 2zm1.086 14.484A5.07 5.07 0 105 11.415a5.07 5.07 0 005.07 5.069zm-.887-6.17l.887-1.8.887 1.8 1.983.288L11.5 12l.339 1.975-1.774-.932-1.765.933L8.635 12 7.2 10.6z"
                data-name="Path 87"
                transform="translate(-4.5 -1.5)"
            />
        </Svg>
    )
}

export default SvgComponent
