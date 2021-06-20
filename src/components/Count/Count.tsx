import React from 'react';
import "../../App.css"

type CountPropsType = {
    count: number
    maxNumber: number
    error: string | null
    disabled: boolean | null
    errorInputStart: string | null
    errorInputMax: string | null
}

export function Count(props: CountPropsType) {
    let FinalClassNameCountValue = `
    ${"count"} ${props.error ? props.error : ""} 
    ${props.disabled ? "errorClass" : ""} 
    ${props.errorInputStart || props.errorInputMax ? "incorrectValue" : ""}
    `
    let finalClassNameWrapperCount = `${"wrapperCount"} ${props.disabled ? "wrapperCountSet" : ""}`

    let text;
    if (props.disabled) {
        text = "enter values and press 'set'";
        if (props.errorInputStart) text = "incorrect value"
    } else {
        text = props.count
    }

    return (
        <div className={finalClassNameWrapperCount}>
            <h1 className={FinalClassNameCountValue}>{text}</h1>
        </div>
    );
}
