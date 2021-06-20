import React from 'react';
import "../../App.css"

type CountPropsType = {
    count: number
    maxNumber: number
    error: string | null
    disabled: boolean | null
    errorInputStart: string | null
}

export function Count(props: CountPropsType) {
    let FinalClassNameSpan = `${"count"} ${props.error ? props.error : ""} ${props.disabled ? "errorClass" : ""} ${props.errorInputStart ? "incorrectValue" : ""}`

    let text;
    if (props.disabled) {
        text = "enter values and press 'set'";
        if (props.errorInputStart) {
            text = "incorrect value"
        }
    } else {
        text = props.count
    }
    return (
        <div className={"wrapperCount"}>
            <h1 className={FinalClassNameSpan}>{text}</h1>
        </div>
    );
}
