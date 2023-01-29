import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styleList from './list.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementStates} from "../../types/element-states";
import List from './utils';
import {delay} from "../../utils/delay";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";

export interface IListArr {
  element: string,
  state: ElementStates,
  add?: boolean;
  delete?: boolean;
  smallCircle?: {
    element?: string | null;
  };
}
export const ListPage: React.FC = () => {

  const initialArray = ["85", "13", "34", "1"];
  const defaultArr: IListArr[] = initialArray.map((item) => ({
    element: item,
    state: ElementStates.Default,
  }))

  const [input, setInput] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(1);
  const [listArr, setListArr] = useState<IListArr[]>(defaultArr);
  const [loaderAddHead, setLoaderAddHead] = useState<boolean>(false);
  const [loaderAddTail, setLoaderAddTail] = useState<boolean>(false);
  const [loaderDeleteHead, setLoaderDeleteHead] = useState<boolean>(false);
  const [loaderDeleteTail, setLoaderDeleteTail] = useState<boolean>(false);
  const [loaderAddIndex, setLoaderAddIndex] = useState<boolean>(false);
  const [loaderDeleteIndex, setLoaderDeleteIndex] = useState<boolean>(false);

  const list = new List<string>(initialArray);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.target.value));
  };

  const addHead = async () => {
    setLoaderAddHead(true);
    list.prepend(input);
    listArr[0] = {
      ...listArr[0], add:true,
      smallCircle: {
        element: input,
      },
    }

    setListArr([...listArr])
    await delay(500);
    listArr[0] = {
      ...listArr[0], add: false,
      smallCircle: {
        element: null,
      },
    }

    listArr.unshift({
      element: input,
      state: ElementStates.Modified,
    });
    setListArr([...listArr])
    await delay(500);
    listArr[0].state= ElementStates.Default
    setLoaderAddHead(false);
    setInput('')
  }

  const addTail = async () => {
    setLoaderAddTail(true);
    list.append(input);
    const { length } = listArr;
    listArr[length - 1] = {
      ...listArr[length - 1], add:true,
      smallCircle: {
        element: input,
      },
    }

    setListArr([...listArr])
    await delay(SHORT_DELAY_IN_MS);
    listArr[length - 1] = {
      ...listArr[length - 1], add: false,
      smallCircle: {
        element: null,
      },
    }

    listArr.push({
      add: false,
      element: input,
      state: ElementStates.Modified,
    });

    setListArr([...listArr])
    await delay(SHORT_DELAY_IN_MS);
    listArr.map((item) => item.state= ElementStates.Default)
    setLoaderAddTail(false);
    setInput('')
  }

  const deleteHead = async () => {
    setLoaderDeleteHead(true);
    listArr[0] = {
      ...listArr[0],
      element: "",
      state: ElementStates.Modified,
      delete: true,
      smallCircle: {
        element: listArr[0].element,
      }
    };
    setListArr([...listArr]);
    await delay(DELAY_IN_MS);
    listArr.shift();

    setListArr([...listArr]);
    setLoaderDeleteHead(false);
  }

  const deleteTail = async () => {
    setLoaderDeleteTail(true);
    const { length } = listArr;
    listArr[length - 1] = {
      ...listArr[length - 1],
      element: "",
      delete: true,
      smallCircle: {
        element: listArr[listArr.length - 1].element,
      },
    }

    setListArr([...listArr]);
    await delay(DELAY_IN_MS);
    listArr.pop();
    setListArr([...listArr]);
    setLoaderDeleteTail(false);
  }

  const addIndex = async () => {
    setLoaderAddIndex(true);
    list.addByIndex(input, inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listArr[i] = {
        ...listArr[i],
        add: true,
        smallCircle: {
          element: input,
        },
      };

      if (i > 0) {
        listArr[i - 1] = {
          ...listArr[i - 1],
          add: false,
          state: ElementStates.Changing,
          smallCircle: {
            element: null,
          },
        }
      }
      setListArr([...listArr]);
      await delay(DELAY_IN_MS)
    }

    listArr[inputIndex] = {
      ...listArr[inputIndex],
      add: false,
      smallCircle: {
        element: null,
      },
    };
    listArr.splice(inputIndex, 0, {
      element: input,
      state: ElementStates.Modified,
    });

    listArr.forEach((item) => (item.state = ElementStates.Default));
    setListArr([...listArr]);
    await delay(DELAY_IN_MS);
    setLoaderAddIndex(false);
    setInputIndex(1);
  }

  const deleteIndex = async (index: number) => {
    setLoaderDeleteIndex(true);
    list.deleteByIndex(inputIndex);
    for (let i = 0; i <= inputIndex; i++) {
      listArr[i] = {
        ...listArr[i],
        state: ElementStates.Changing,
      };
      await delay(DELAY_IN_MS);
      setListArr([...listArr]);
    }
    listArr[inputIndex] = {
      ...listArr[inputIndex],
      element: '',
      delete: true,
      state: ElementStates.Changing,
      smallCircle: {
        element: null,
      },
    }
    await delay(DELAY_IN_MS);
    setListArr([...listArr]);
    listArr.splice(inputIndex, 1);

    listArr[inputIndex - 1] = {
      ...listArr[inputIndex - 1],
      element: listArr[inputIndex - 1].element,
      state: ElementStates.Modified,
    };
    await delay(DELAY_IN_MS);
    setListArr([...listArr]);
    listArr.forEach((elem) => {
      elem.state = ElementStates.Default;
    })
    await delay(DELAY_IN_MS);
    setListArr([...listArr])
    setLoaderDeleteIndex(false);
    setInputIndex(1);
  }

  return (
      <SolutionLayout title="Связный список">
        <div className={styleList.container}>
          <div className={styleList.form}>
            <Input
                data-tested='input'
                placeholder="Введите значение"
                isLimitText={true}
                maxLength={4}
                value={input}
                onChange={handleChangeInput}
            />
            <Button
                text="Добавить в head"
                type="button"
                onClick={addHead}
                disabled={!input.length}
                isLoader={loaderAddHead}
            />
            <Button
                text="Добавить в tail"
                type="button"
                onClick={addTail}
                disabled={!input.length}
                isLoader={loaderAddTail}
            />
            <Button
                text="Удалить из head"
                type="button"
                onClick={deleteHead}
                disabled={loaderAddTail || loaderAddHead
            }
                isLoader={loaderDeleteHead}
            />
            <Button
                text="Удалить из tail"
                type="button"
                onClick={deleteTail}
                disabled={loaderAddTail || loaderAddHead
            }
                isLoader={loaderDeleteTail}
            />
          </div>
          <div className={styleList.form}>
            <Input
                data-tested='input-index'
                // type="number"
                placeholder="Введите индекс"
                min={0}
                max={listArr.length - 1}
                isLimitText={false}
                value={inputIndex}
                onChange={handleChangeIndex}
            />
            <Button
                text="Добавить по индексу"
                type="button"
                onClick={addIndex}
                isLoader={loaderAddIndex}
                disabled={
                    !input
                    || !inputIndex
                    || inputIndex > listArr.length - 1
                }
            />
            <Button
                text="Удалить по индексу"
                type="button"
                onClick={(index) =>  deleteIndex(Number(index))}
                isLoader={loaderDeleteIndex}
                disabled={
                    !inputIndex
                    || listArr.length === 0
                    || inputIndex > listArr.length - 1
                }
            />

          </div>
          <ul className={styleList.list}>
            {listArr.map((item, index) => {
              return (
                  <li className={styleList.item} key={index}>
                    {item.add && (
                        <Circle
                            isSmall={true}
                            extraClass={styleList.upCircle}
                            state={ElementStates.Changing}
                            letter={item.smallCircle?.element}
                        />
                    )}
                    <Circle
                        index={index}
                        state={item.state}
                        letter={item.element}
                        head={index === 0 && !item.add && !item.delete ? "head" : ""}
                        tail={index === listArr.length - 1 && !item.add && !item.delete ? "tail" : ""}
                    />
                    <ArrowIcon />
                    {item.delete && (
                        <Circle
                            isSmall={true}
                            extraClass={styleList.downCircle}
                            state={ElementStates.Changing}
                            letter={item.smallCircle?.element}
                        />
                    )}
                  </li>
              )
            })}
          </ul>
        </div>
      </SolutionLayout>
  );
};
