import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <Path
                fill={props.fill}
                d="M18.84 5.168A9.724 9.724 0 003.008 15.862a1.03 1.03 0 01.088.622l-.856 4.113a.966.966 0 00.972 1.167h.194l4.162-.836a1.226 1.226 0 01.622.087 9.722 9.722 0 0010.7-15.827zM8.074 13.014a.972.972 0 11.972-.972.972.972 0 01-.972.972zm3.89 0a.972.972 0 11.972-.972.972.972 0 01-.973.972zm3.89 0a.972.972 0 11.972-.972.972.972 0 01-.973.972z"
            />
        </Svg>
    )
}

export default SvgComponent