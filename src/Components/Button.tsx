import styled from "@emotion/styled"
import * as React from "react"

export interface IProps {
    isDragging?: boolean,
    innerRef?: any,
    style?: any,
}

const Button = (props: IProps) => {
    const {
        innerRef,
        isDragging,
        ...rest
    } = props

    return (
        <button
            ref={props.innerRef}
            {...rest}
            className={`
                inline-flex items-center px-4 py-2
                border border-transparent
                text-base font-medium text-white
                rounded-md shadow-sm
                bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            `}
        >
            I am a Button!
        </button>
    )
}

export default Button
