import React from 'react';
import "../../App.module.css"
import s from "./Count.module.css"

type CountPropsType = {
    count: number
    maxNumber: number
    error: string | null
    disabled: boolean | null
    errorInputStart: string | null
    errorInputMax: string | null
}

export function Count(props: CountPropsType) {
    const textPressSet = "enter values and press 'set'"
    const textIncorrectValue = "incorrect value"
    let text: string;

    const FinalClassNameCountValue = `
    ${s.count} ${props.error ?? ""} 
    ${props.disabled ? s.errorClass : ""} 
    ${props.errorInputStart || props.errorInputMax ? s.incorrectValue : ""}
    `
    const finalClassNameWrapperCount = `${s.wrapperCount} ${props.disabled ? s.wrapperCountSet : ""}`

    if (props.disabled) {
        text = textPressSet;
        if (props.errorInputStart) text = textIncorrectValue
    } else {
        text = (props.count).toString()
    }

    return (
        <div className={finalClassNameWrapperCount}>
            <h1 className={FinalClassNameCountValue}>{text}</h1>
        </div>
    );
}
