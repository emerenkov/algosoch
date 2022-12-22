import React, {FormEvent, useState} from "react";
import styleStack from "./stack.module.css";
import { ElementStates } from "../../types/element-states"
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Stack from "./utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../utils/delay";

export interface ILoader {
  add: boolean,
  remove: boolean,
  clean: boolean,
  disabled: boolean,
}

export const StackPage: React.FC = () => {
  const [stackArray, setStackArray] = useState<string[]>([]); // начальное состояние
  const [input, setInput] = useState<string>('');
  const [theme, setTheme] = useState<ElementStates>(ElementStates.Changing)
  const [isLoader, setIsLoader] = useState<ILoader>({
    add: false,
    remove: false,
    clean: false,
    disabled: false,
  })

  const stack = React.useMemo(() => {
    return new Stack<string>()
  }, [])

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  }

  const handleAdd = async (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader({
      ...isLoader,
      add: true,
    });
    stack.push(input);
    setTheme(ElementStates.Changing);
    setStackArray(stack.getElements());
    setInput('');
    await delay(SHORT_DELAY_IN_MS);
    setTheme(ElementStates.Default)
    setIsLoader({
      ...isLoader,
      add: false,
    });
  }

  const handleDelete = async () => {
    setIsLoader({
      ...isLoader,
      remove: true,
    });
    setTheme(ElementStates.Changing)
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArray(stack.getElements());
    setTheme(ElementStates.Default);
    setIsLoader({
      ...isLoader,
      remove: false,
    });
  }

  const handleClear = async () => {
    setIsLoader({
      ...isLoader,
      clean: true,
    });
    stack.clear()
    setStackArray([])
    setIsLoader({
      ...isLoader,
      clean: false,
    });
  }

  return (
      <SolutionLayout title="Стек">
        <div className={styleStack.block}>
          <form className={styleStack.form} onSubmit={handleAdd}>
            <Input
                onChange={handleChangeInput}
                isLimitText={true}
                maxLength={4}
                value={input}
            />
            <Button
                text='Добавить'
                disabled={!input.length}
                onClick={handleAdd}
                isLoader={isLoader.add}
            />
            <Button
                text='Удалить'
                disabled={!stackArray.length}
                onClick={handleDelete}
                isLoader={isLoader.remove}
            />
          </form>
          <Button
              text='Очистить'
              disabled={!stackArray.length}
              onClick={handleClear}
              isLoader={isLoader.clean}
          />
        </div>
        <div className={styleStack.circle}>
          {stack.getElements().map((item, index) => {
            return (
                <Circle
                    letter={item}
                    key={index}
                    head={index === stackArray.length - 1 ? "top" : ""}
                    state={stackArray.length === index ? theme : ElementStates.Changing &&
                    stackArray.length - 1 === index ? theme : ElementStates.Default}
                    index={index}
                />
            )
          })}
        </div>
      </SolutionLayout>
  );
};
