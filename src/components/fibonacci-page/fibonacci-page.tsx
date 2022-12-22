import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesFibonacci from "./fibonacci.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
    const [array, setArray] = useState<Array<number>>([]);
    const [input, setInput] = useState<number | string>('');
    const [isLoader, setIsLoader] = useState<boolean>(false);

    const getFibonacci = async (input: number) => {
        setIsLoader(true)
        const fibonacci: number[] = [1, 1];
        for (let i = 2; i <= input; i++) {
            const a = fibonacci[i - 1];
            const b = fibonacci[i - 2];
            fibonacci.push(a + b);
        }
        for (let i = 0; i < input + 1; i++) {
            fibonacci.push(fibonacci[i - 2] + fibonacci[i - 1]);
            setArray(fibonacci.slice(0, i + 1));
            await delay(SHORT_DELAY_IN_MS);
        }
        setIsLoader(false)
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value.trim());

    }

    const addSymbols = (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        getFibonacci(Number(input));
        setInput('');
    }

    return (
    <SolutionLayout title="Последовательность Фибоначчи">
        <form className={stylesFibonacci.form} onSubmit={addSymbols} >
            <Input
                type='number'
                onChange={changeInput}
                value={input}
                maxLength={2}
                min={1}
                max={19}
                isLimitText={true}
            />
        <Button
            disabled={!input || input > 19}
            text="Развернуть"
            linkedList="small"
            onClick={addSymbols}
            isLoader={isLoader}
        />
        </form>
        <ul className={stylesFibonacci.list}>
            {array.length > 1 && array.map((item, index) => {
                return (
                    <Circle
                        key={index}
                        letter={`${item}`}
                        index={index}
                    />
                )
        })}
        </ul>
    </SolutionLayout>
    );
};
