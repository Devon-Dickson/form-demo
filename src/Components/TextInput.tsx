import * as React from "react"

export interface IProps {
    isDragging?: boolean,
    innerRef?: any,
    style?: any,
}

const TextInput = (props: IProps) => {
    const {
        innerRef,
        isDragging,
        ...rest
    } = props

    return (
        <div
            ref={innerRef}
            {...rest}
        >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1">
                <input type="text" name="email" id="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com" />
            </div>
        </div>
    )
}

export default TextInput
