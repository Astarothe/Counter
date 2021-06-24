import React, {ChangeEvent} from 'react';
import s from "./Input.module.css"
import "../../App.module.css"

type InputPropsType = {
    title: string
    callback: (maxNumber: number) => void
    countValue: number
    error: string | null
}

export function Input(props:InputPropsType) {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.callback(JSON.parse(e.currentTarget.value));
    const finalInputClassName = `${s.input} ${props.error ? props.error : ""}`

    return (
        <div className={s.wrapperItem}>
            <label className={s.label}>
                {props.title}
                <input className={finalInputClassName} type="number" value={props.countValue} onChange={onChangeHandler}  />
            </label>
        </div>
    );
}
