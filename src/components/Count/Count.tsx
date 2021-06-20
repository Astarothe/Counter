import React from 'react';
import "../../App.css"

type CountPropsType = {
    count: number
    maxNumber: number
}

export function Count(props: CountPropsType) {
    let FinalClassNameSpan = `${"count"} ${props.maxNumber === props.count ? "maxNumber" : ""}`

    return (
            <div className={"wrapperCount"}>
                <h1 className={FinalClassNameSpan}>{props.count}</h1>
            </div>
    );
}
