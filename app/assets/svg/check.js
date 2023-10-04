import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            viewBox="0 0 12 12"
            {...props}
        >
            <Path
                fill={props?.fill??"#fff"}
                d="M5.011 8.775a.462.462 0 01-.338-.148L2.426 6.236a.463.463 0 01.676-.633l1.9 2.03 3.889-4.254a.462.462 0 11.684.62L5.353 8.622a.462.462 0 01-.338.153z"
            />
        </Svg>
    )
}

export default SvgComponent