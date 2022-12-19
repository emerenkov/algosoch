import React, {useState} from "react";
import styleStack from "./stack.module.css";
import { ElementStates } from "../../types/element-states"
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Stack from "./utils";

export const StackPage: React.FC = () => {
  const [stackArray, setStackArray] = useState<string[]>([]); // начальное состояние
  const [input, setInput] = useState<string>('');
  const [theme, setTheme] = useState<ElementStates>(ElementStates.Changing)

  const stack = React.useMemo(() => {
    return new Stack<string>()
  }, [])

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  }

  const handleAdd = async () => {
    stack.push(input)
    setInput("")
    setTimeout(() => {
      setTheme(ElementStates.Changing)
      setStackArray([...stack.getElements()])
      setTimeout(() => {
        setTheme(ElementStates.Default)
        setStackArray([...stack.getElements()])
      }, 500)
    }, 500)
  }

  const handleDelete = async () => {
    setTimeout(() => {
      setTheme(ElementStates.Changing)
      setStackArray([...stack.getElements()])
      setTimeout(() => {
        stack.pop()
        setTheme(ElementStates.Default)
        setStackArray([...stack.getElements()])
      }, 500)
    }, 500)
  }

  const handleClear = async () => {
    stack.clear()
    setStackArray([])
  }

  return (
      <SolutionLayout title="Стек">
        <div className={styleStack.block}>
          <div className={styleStack.form}>
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
            />
            <Button
                text='Удалить'
                disabled={!stackArray.length}
                onClick={handleDelete}
            />
          </div>
          <Button
              text='Очистить'
              disabled={!stackArray.length}
              onClick={handleClear}
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
