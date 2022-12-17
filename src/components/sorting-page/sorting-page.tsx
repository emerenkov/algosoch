import React, {ChangeEvent, useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import stylesSorting from './sorting.module.css';
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

interface IRandomArr {
  number: number,
  state: ElementStates,
}

export const SortingPage: React.FC = () => {
  const [sortingArray, setSortingArray] = useState<Array<IRandomArr>>([]);
  const [position, setPosition] = useState<boolean>(false);
  const [optSort, setOptSort] = useState<string>('selection');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>): void => {
    setOptSort((e.target as HTMLInputElement).value);
  };

  const swap = (arr: Array<IRandomArr>, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const selectionSort = async (line:boolean) => {
    const arr:Array<IRandomArr> = sortingArray;
    setIsLoading(false);
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let maxInd = i;
      arr[maxInd].state = ElementStates.Changing;
      setSortingArray([...arr]);
      await delay(SHORT_DELAY_IN_MS)
      for (let j = i + 1; j < l; j++) {
        arr[j].state = ElementStates.Changing;
        setSortingArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (arr[maxInd].number > arr[j].number && line) {
          maxInd = j;
          setSortingArray([...arr]);
        }
        if (arr[maxInd].number < arr[j].number && !line) {
          maxInd = j;
          setSortingArray([...arr]);
        }
        arr[j].state = ElementStates.Default;
        setSortingArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
      }
      swap(arr, i, maxInd);
      arr[maxInd].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setSortingArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setIsLoading(true)
  }

  const bubbleSort = async (line: boolean) => {
    const arr:Array<IRandomArr> = sortingArray;
    setIsLoading(false);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setSortingArray([...arr]);
        await delay(500);
          if (arr[j].number > arr[j + 1].number && line) {
            swap(arr, j, j + 1);
            setSortingArray([...arr]);
            await delay(500);
          }
          if (arr[j].number < arr[j + 1].number && !line) {
            swap(arr, j, j + 1);
            setSortingArray([...arr]);
            await delay(500);
          }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setSortingArray([...arr]);

      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setSortingArray([...arr]);
      await delay(500);
    }
    setIsLoading(true);
  }

  const arrSort = (line: boolean) => {
    if (optSort === "selection") {
      selectionSort(line);
    }
    if (optSort === "bubble") {
      bubbleSort(line);
    }
  }

// генерация длины и чисел массива
  const generationNumber = () => {
    const reserveSum = Math.floor(Math.random()* 10);
    const sum = Math.floor(Math.random()* 10) * (reserveSum + 1);
    return sum > 36 ? sum + 10 : sum + 1;
  }
  // создание массива
  const randomArr = () => {
    const array:Array<number> = [];
    let arrayLength: number = generationNumber();
    const coint = arrayLength > 17 ? 17 : arrayLength < 3 ? 3 : arrayLength;
    for (let i = 0; i < coint; i++) {
      let j = generationNumber()
      // if(!array.includes(j)) {
        array[i] = j;
      // }
    }
    const sortArr = array.map((number) => {
      return {
        number,
        state: ElementStates.Default
      }
    })
    setSortingArray(sortArr);
  }
  //  отрисовка массива по умолчанию
  useEffect(()=> {
    randomArr();
  },[])

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={stylesSorting.form}>
        <div className={stylesSorting.block}>
          <RadioInput
              disabled={!isLoading}
              label="Выбор"
              name={"sorting-type"}
              value={"selection"}
              defaultChecked
              extraClass="mr-20"
              onChange={onChangeRadio}
          />
          <RadioInput
              disabled={!isLoading}
              label="Пузырек"
              name={"sorting-type"}
              value={"bubble"}
              onChange={onChangeRadio}
          />
        </div>
        <div className={stylesSorting.block}>
          <Button
              disabled={!isLoading}
              text="По возрастанию"
              onClick={() => arrSort(true)}
              extraClass="mr-6"
          />
          <Button
              disabled={!isLoading}
              text="По убыванию"
              onClick={() => arrSort(false)}
              extraClass="mr-40"
          />
          <Button
              disabled={!isLoading}
              text="Новый массив"
              onClick={randomArr}
          />
        </div>
      </form>
      <ul className={stylesSorting.list}>
        {sortingArray.map((element: IRandomArr, index: number, state: IRandomArr[]) => {
          return (
              <Column
                  key={index}
                  index={element.number}
                  state={element.state}
              />)
        })}
      </ul>
    </SolutionLayout>
  );
};
