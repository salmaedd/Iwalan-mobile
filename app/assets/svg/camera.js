import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
        >
            <G transform="translate(.486 .486)">
                <Circle
                    cx={0.939}
                    cy={0.939}
                    r={0.939}
                    transform="translate(6.575 7.827)"
                />
                <Path d="M11.897 4.379h-1.878v.061a1.565 1.565 0 00-1.567-1.561H6.575a1.565 1.565 0 00-1.566 1.565v-.065H3.131a1.879 1.879 0 00-1.879 1.883v5.009a1.879 1.879 0 001.879 1.879h8.767a1.879 1.879 0 001.879-1.879V6.262a1.879 1.879 0 00-1.88-1.883zm-5.636.061a.313.313 0 01.313-.313h1.878a.313.313 0 01.313.313v-.061h-2.5zm1.253 6.519a2.192 2.192 0 112.192-2.192 2.192 2.192 0 01-2.192 2.192z" />
            </G>
        </Svg>
    )
}

export default SvgComponent
