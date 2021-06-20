import React, {useEffect, useState} from 'react';
import './App.css';
import {Count} from "./components/Count/Count";
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";

type errorInputType = {
    [key: string]: {
        error: string | null
    }
}

function App() {
    const initNumber = 0;
    const maxInitialise = 5;
    const stepUp = 1;

    const errorInputStartId = "1";
    const errorInputMaxId = "2";
    const errorButtonSetId = "3";
    const errorCountTable = "4";

    let [count, setCount] = useState(initNumber);
    let [maxCount, setMaxCount] = useState(maxInitialise);
    let [startCount, setStartCount] = useState(initNumber)
    let [disabledButton, setDisabledButton] = useState<null | boolean>(null)
    let [error, setError] = useState<errorInputType>({
            [errorInputStartId]: {error: null},
            [errorInputMaxId]: {error: null},
            [errorButtonSetId]: {error: "error"},
            [errorCountTable]: {error: null},
        }
    )

    let disabledReset = startCount === count;
    let disabledIncrement = maxCount === count;
    let disabledSetValue = false;

    const checkDisabled = (checkDisabledButton: boolean): boolean => disabledButton ? disabledButton : checkDisabledButton;
    const checkDisabled2 = (checkDisabledButton: boolean): boolean => (
        error[errorInputStartId].error ||
        error[errorInputMaxId].error ||
        error[errorButtonSetId].error
    ) ? true : checkDisabledButton

    const conditionErrorCountMax = () => {
        if (maxCount === count) {
            error[errorCountTable].error = "maxNumber";
        } else {
            error[errorCountTable].error = null;
        }
        setError({...error})
    }

    const conditionError = () => {
        if (startCount < 0) {
            error[errorInputStartId].error = "error"
            error[errorButtonSetId].error = "error"
        } else if (startCount >= 0 && disabledButton) {
            error[errorInputStartId].error = null
            error[errorButtonSetId].error = null
            error[errorCountTable].error = null
        }

        if (maxCount <= startCount) {
            error[errorInputStartId].error = "error"
            error[errorInputMaxId].error = "error"
            error[errorButtonSetId].error = "error"
        } else if (maxCount > startCount && disabledButton) {
            error[errorInputMaxId].error = null
            error[errorButtonSetId].error = null
        }

        setError({...error})
    }

    useEffect(conditionErrorCountMax, [count, maxCount])

    useEffect(conditionError, [startCount, maxCount])


    const increment = () => {
        if (count < maxCount) setCount(count + stepUp)
        else {
            error[errorCountTable].error = "maxNumber";
            setError({...error})
        }
    }
    const reset = () => setCount(startCount);

    const setValue = () => {
        error[errorButtonSetId].error = "error"
        setError({...error})

        setDisabledButton(null);
        setCount(startCount)
    }

    const maxCountOnChange = (maxNumber: number) => {
        setDisabledButton(true)
        setMaxCount(maxNumber)
    }

    const startCountOnChange = (startNumber: number) => {
        setDisabledButton(true)
        setStartCount(startNumber)
    }

    return (
        <div className={"App"}>
            <div className={"Monitor"}>
                <div className={"wrapperInputs"}>
                    <Input title={"max value:"}
                           callback={maxCountOnChange}
                           countValue={maxCount}
                           error={error[errorInputMaxId].error}/>
                    <Input title={"start value:"}
                           callback={startCountOnChange}
                           countValue={startCount}
                           error={error[errorInputStartId].error}/>
                </div>
                <div className={"wrapperButton"}>
                    <Button text={"set"} callback={setValue} disabled={checkDisabled2(disabledSetValue)}/>
                </div>
            </div>

            <div className={"Monitor"}>
                <Count count={count}
                       maxNumber={maxCount}
                       error={error[errorCountTable].error}
                       disabled={disabledButton}
                       errorInputStart={error[errorInputStartId].error}
                       errorInputMax={error[errorInputMaxId].error}/>
                <div className={"wrapperButton"}>
                    <Button text={"inc"} callback={increment} disabled={checkDisabled(disabledIncrement)}/>
                    <Button text={"reset"} callback={reset} disabled={checkDisabled(disabledReset)}/>
                </div>
            </div>
        </div>
    );
}

export default App;
