import React, {useEffect, useState} from 'react';
import './App.css';
import {Count} from "./components/Count/Count";
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";

function App() {
    const initNumber = 0;
    const stepUp = 1;
    const maxInitialise = 5;

    let [count, setCount] = useState<number>(initNumber);
    let [error, setError] = useState<string | null>(null)

    let [maxCount, setMaxCount] = useState(maxInitialise);
    let [startCount, setStartCount] = useState(initNumber)

    let [errorInputStart, setErrorInputStart] = useState<null | string>(null);
    let [errorInputMax, setErrorInputMax] = useState<null | string>(null);

    let [errorSet, setErrorSet] = useState<null | string>("max");

    let [disabled, setDisabled] = useState<null | boolean>(null)


    let disabledReset = startCount === count;
    let disabledIncrement = maxCount === count;
    let disabledSetValue = false;

    const checkDisabled = (disableds: boolean): boolean => disabled ? disabled : disableds;
    const checkDisabled2 = (disableds: boolean): boolean => {
        if (errorInputMax || errorInputStart || errorSet) {
            if (disabled) {
                return disabled
            }
        } else {
            return disableds
        }
        return true;
    }

    useEffect(() => {
        if (maxCount === count) setError("maxNumber")
        else setError(null);
    }, [count, maxCount])

    useEffect(() => {
        if (startCount < 0) {
            setErrorInputStart("error")
        } else {
            setErrorSet(null)
            setErrorInputStart(null);
        }

        if (maxCount <= startCount) {
            setErrorInputMax("error")
            setErrorInputStart("error")
        } else {
            setErrorSet(null)
            setErrorInputMax(null);
        }
    }, [startCount,maxCount])


    const increment = () => {
        if (count < maxCount) {
            setCount(count + stepUp)
        } else {
            setError("maxNumber")
        }
    }
    const reset = () => setCount(startCount);

    const setValue = () => {
        setErrorSet("max")
        setDisabled(null);
        setCount(startCount)
    }

    const maxCountOnChange = (maxNumber: number) => {

        setDisabled(true)
        setMaxCount(maxNumber)
    }

    const startCountOnChange = (startNumber: number) => {
        setDisabled(true)
        setStartCount(startNumber)
    }

    return (
        <div className={"App"}>
            <div className={"Monitor"}>
                <div className={"wrapperInputs"}>
                    <Input title={"max value:"} callback={maxCountOnChange} countValue={maxCount}
                           error={errorInputMax}/>
                    <Input title={"start value:"} callback={startCountOnChange} countValue={startCount}
                           error={errorInputStart}/>
                </div>
                <div className={"wrapperButton"}>
                    <Button text={"set"} callback={setValue} disabled={checkDisabled2(disabledSetValue)}/>
                </div>
            </div>

            <div className={"Monitor"}>
                <Count count={count} maxNumber={maxCount} error={error} disabled={disabled}
                       errorInputStart={errorInputStart}/>
                <div className={"wrapperButton"}>
                    <Button text={"inc"} callback={increment} disabled={checkDisabled(disabledIncrement)}/>
                    <Button text={"reset"} callback={reset} disabled={checkDisabled(disabledReset)}/>
                </div>
            </div>
        </div>
    );
}

export default App;
