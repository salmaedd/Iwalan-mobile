import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            {...props}
        >
            <Path
                fill={props.fill}
                //  fill="#fb4896"
                d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1 1 0 111.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33z"
            />
        </Svg>
    )
}

export default SvgComponent
