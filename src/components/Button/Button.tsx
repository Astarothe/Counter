import React from 'react';
import "../../App.module.css"
import s from "./Button.module.css"

type ButtonPropsType = {
    text: string
    callback: () => void
    disabled: boolean
}

export function Button(props: ButtonPropsType) {
    return (
        <div>
            <button disabled={props.disabled} className={s.btn} onClick={props.callback}>{props.text}</button>
        </div>
    );
}
