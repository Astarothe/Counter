import React, {useState} from 'react';
import './App.css';
import {Count} from "./components/Count/Count";
import {Button} from "./components/Button/Button";

function App() {
    const initNumber = 0;
    const stepUp = 1;
    const maxNumber = 5;

    let [count, setCount] = useState<number>(initNumber);

    const increment = () => count < maxNumber ? setCount(count + stepUp) : "";
    const reset = () => setCount(initNumber);

    const disabledReset = initNumber === count;
    const disabledIncrement = maxNumber === count;

    return (
        <div className={"App"}>
            <div className={"Monitor"}>
                <Count count={count} maxNumber={maxNumber}/>

                <div className={"wrapperButton"}>
                    <Button text={"inc"} callback={increment} disabled={disabledIncrement}/>
                    <Button text={"reset"} callback={reset} disabled={disabledReset}/>
                </div>
            </div>
        </div>
    );
}

export default App;
