import * as React from "react"

export interface IProps {
    isDragging?: boolean,
    innerRef?: any,
    style?: any,
}

const Heading = (props: IProps) => {
    const {
        innerRef,
        isDragging,
        ...rest
    } = props

    return (
        <h3
            ref={innerRef}
            className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl"
            {...rest}
        >
            Heading 3
        </h3>
    )
}

export default Heading
