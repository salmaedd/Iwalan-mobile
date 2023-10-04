import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <G data-name="Layer 2">
                <G data-name="lock">
                    <Circle cx={12} cy={15} r={1} />
                    <Path d="M17 8h-1V6.11a4 4 0 10-8 0V8H7a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3v-8a3 3 0 00-3-3zm-7-1.89A2.06 2.06 0 0112 4a2.06 2.06 0 012 2.11V8h-4zM12 18a3 3 0 113-3 3 3 0 01-3 3z" />
                </G>
            </G>
        </Svg>
    )
}

export default SvgComponent