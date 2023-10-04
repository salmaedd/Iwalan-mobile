import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <G data-name="Layer 2">
                <G data-name="shopping-cart">
                    <Path d="M21.08 7a2 2 0 00-1.7-1H6.58L6 3.74A1 1 0 005 3H3a1 1 0 000 2h1.24L7 15.26A1 1 0 008 16h9a1 1 0 00.89-.55l3.28-6.56A2 2 0 0021.08 7z" />
                    <Circle cx={7.5} cy={19.5} r={1.5} />
                    <Circle cx={17.5} cy={19.5} r={1.5} />
                </G>
            </G>
        </Svg>
    )
}

export default SvgComponent