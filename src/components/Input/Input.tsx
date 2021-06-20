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

    return (
        <div className={"wrapperItem"}>
            <label className={"label"}>
                {props.title}
                <input className={`${"input"} ${props.error ? props.error : ""}`} type="number" value={props.countValue} onChange={onChangeHandler}  />
            </label>

        </div>
    );
}
