import React, {ChangeEvent} from 'react';
import "../../App.css"

type InputPropsType = {
    title: string
    callback: (maxNumber: number) => void
    countValue: number
    error: string | null
}

export function Input(props:InputPropsType) {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.callback(JSON.parse(e.currentTarget.value));
    const finalInputClassName = `${"input"} ${props.error ? props.error : ""}`

    return (
        <div className={"wrapperItem"}>
            <label className={"label"}>
                {props.title}
                <input className={finalInputClassName} type="number" value={props.countValue} onChange={onChangeHandler}  />
            </label>

        </div>
    );
}
