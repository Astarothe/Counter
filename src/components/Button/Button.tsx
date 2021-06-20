import React from 'react';
import "../../App.css"

type ButtonPropsType = {
    text: string
    callback: () => void
    disabled: boolean
}

export function Button(props: ButtonPropsType) {
    return (
        <div>
            <button disabled={props.disabled} className={"btn"} onClick={props.callback}>{props.text}</button>
        </div>
    );
}
