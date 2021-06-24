import React, {useEffect, useState} from 'react';
import s from './App.module.css';
import {Count} from "./components/Count/Count";
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";

type errorInputType = {
    [key: string]: {
        error: string | null
    }
}

function App() {
    const initialiseValue = 0;
    const initialiseMaxValue = 5;
    const stepUp = 1;

    const errorInputStartId = "1";
    const errorInputMaxId = "2";
    const errorButtonSetId = "3";
    const errorCountTable = "4";


    let [count, setCount] = useState(initialiseValue);
    let [maxCount, setMaxCount] = useState(initialiseMaxValue);
    let [startCount, setStartCount] = useState(initialiseValue)
    let [disabledButton, setDisabledButton] = useState<null | boolean>(null)
    let [error, setError] = useState<errorInputType>({
            [errorInputStartId]: {error: null},// null
            [errorInputMaxId]: {error: null},
            [errorButtonSetId]: {error: s.error},
            [errorCountTable]: {error: null},
        }
    )



    let disabledResetButton = startCount === count; //startCount === count && !disabledButton
    let disabledIncrementButton = maxCount === count;
    let disabledSetValueButton = false;

    const checkDisabled = (changeDisabledButton: boolean): boolean => disabledButton ? disabledButton : changeDisabledButton;
    const checkDisabledSet = (changeDisabledButton: boolean): boolean => (
        error[errorInputStartId].error ||
        error[errorInputMaxId].error ||
        error[errorButtonSetId].error
    ) ? true : changeDisabledButton


    const conditionErrorCountMax = () => {
        (maxCount === count) ? error[errorCountTable].error = s.maxValue : error[errorCountTable].error = null;
        setError({...error})
    }

    const conditionErrorAll = () => {
        let err = {...error};
        err[errorInputStartId].error = (
            startCount < 0 ||
            (startCount >= 0 && disabledButton) ||
            maxCount <= startCount
        ) ? s.error : null

        if (startCount < 0) {
            error[errorInputStartId].error = s.error
            error[errorButtonSetId].error = s.error
        } else if (startCount >= 0 && disabledButton) {
            error[errorInputStartId].error = null
            error[errorButtonSetId].error = null
            error[errorCountTable].error = null
        }

        if (maxCount <= startCount) {
            error[errorInputStartId].error = s.error
            error[errorInputMaxId].error = s.error
            error[errorButtonSetId].error = s.error
        } else if (maxCount > startCount && disabledButton) {
            error[errorInputMaxId].error = null
            error[errorButtonSetId].error = null
        }

        setError({...error})
    }

    const incrementHandler = () => {
        if (count < maxCount) setCount(count + stepUp)
        else {
            error[errorCountTable].error = s.maxValue;
            setError({...error})
        }
    }

    const resetHandler = () => setCount(startCount);

    const saveSettingsHandler = () => {
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

    useEffect(() => {
        let counterValue = localStorage.getItem("CounterValue");
        let counterMaxValue = localStorage.getItem("CounterMaxValue");
        let counterStartValue = localStorage.getItem("CounterStartValue");
        
        if (counterValue) setCount(JSON.parse(counterValue))
        if (counterMaxValue) setMaxCount(JSON.parse(counterMaxValue))
        if (counterStartValue) setStartCount(JSON.parse(counterStartValue))
    }, [])

    useEffect(() => {
        localStorage.setItem("CounterValue", JSON.stringify(count))
        localStorage.setItem("CounterMaxValue", JSON.stringify(maxCount))
        localStorage.setItem("CounterStartValue", JSON.stringify(startCount))
    }, [count])

    useEffect(conditionErrorCountMax, [count, maxCount])

    useEffect(conditionErrorAll, [startCount, maxCount])

    return (
        <div className={s.App}>
            <div className={s.Monitor}>
                <div className={s.wrapperInputs}>
                    <Input title={"max value:"}
                           callback={maxCountOnChange}
                           countValue={maxCount}
                           error={error[errorInputMaxId].error}/>
                    <Input title={"start value:"}
                           callback={startCountOnChange}
                           countValue={startCount}
                           error={error[errorInputStartId].error}/>
                </div>
                <div className={s.wrapperButton}>
                    <Button text={"set"} callback={saveSettingsHandler}
                            disabled={checkDisabledSet(disabledSetValueButton)}/>
                </div>
            </div>

            <div className={s.Monitor}>
                <Count count={count}
                       maxNumber={maxCount}
                       error={error[errorCountTable].error}
                       disabled={disabledButton}
                       errorInputStart={error[errorInputStartId].error}
                       errorInputMax={error[errorInputMaxId].error}/>
                <div className={s.wrapperButton}>
                    <Button text={"inc"} callback={incrementHandler} disabled={checkDisabled(disabledIncrementButton)}/>
                    <Button text={"reset"} callback={resetHandler}
                            disabled={checkDisabled(disabledResetButton)}/>
                </div>
            </div>
        </div>
    );
}

export default App;
