import React, {FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import stylesString from "./string.module.css"
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/delay";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const StringComponent: React.FC = () => {
    const [array, setArray] = useState<Array<string>>([]);
    const [input, setInput] = useState<string>('');
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [done, setDone] = useState<number>(0)

    const swap = (arr: string[], i: number, j: number) => {
        const step = arr[i];
        arr[i] = arr[j];
        arr[j] = step;
    }

    const reverseInput = async (string: string) => {
        const arrayOfString = string.split('');
        const end = arrayOfString.length;
        setIsLoader(true);
        setDone(0)
        setArray([...arrayOfString])
        await delay(DELAY_IN_MS);

        for(let i = 0; i < Math.floor(end / 2); i++) {
            swap(arrayOfString, i, end -1 - i);
            setDone(i => i + 1);
            setArray([...arrayOfString]);
            await delay(DELAY_IN_MS);
        }

        setDone(i => i + 1);
        setIsLoader(false);
        return arrayOfString;

    }
    const isColor = (index:number, done: number, array:Array<string | number>) => {
        let arrLength = array.length - 1
        if (done < index || done > arrLength - index) {
            return ElementStates.Modified
        }
        if (done === index || done === arrLength - index) {
            return ElementStates.Changing
        }
        return ElementStates.Default
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value.trim());
    }

    const addSymbols = (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        reverseInput(input);
    }

  return (
    <SolutionLayout title="Строка">
      <form className={stylesString.form} onSubmit={addSymbols}>
        <Input
            onChange={changeInput}
            value={input}
            maxLength={11}
            isLimitText={true}
        />
        <Button
            disabled={!input}
            text="Развернуть"
            linkedList="small"
            onClick={addSymbols}
            isLoader={isLoader}
        />
      </form>
        <ul className={stylesString.list}>
            {array.map((item, index) => {
                return (
                <Circle
                    key={index}
                    letter={item}
                    index={index + 1}
                    state={isColor(done, index, array)}
                />
                )
            })}
        </ul>
    </SolutionLayout>
  );
};
