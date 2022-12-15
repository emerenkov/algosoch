import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import stylesSorting from './sorting.module.css';
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {ElementStates} from "../../types/element-states";
import {random} from "nanoid";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

interface IRandomArr {
  number: number,
  state: ElementStates,
}

export const SortingPage: React.FC = () => {
  const [sortingArray, setSortingArray] = useState<Array<IRandomArr>>([]);

  const swap = (arr: Array<IRandomArr>, i: number, j: number): void => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const selectionSort = async () => {
    const arr:Array<IRandomArr> = sortingArray.slice();
    const {length} = arr;
    for (let i = 0; i < arr.length - 1; i++) {
      let maxInd = i;
      // arr[maxInd].state = ElementStates.Changing;
      // setSortingArray([...arr]);
      // await delay(SHORT_DELAY_IN_MS)
      for (let j = i + 1; j < arr.length; j++) {
        // arr[j].state = ElementStates.Changing;
        // setSortingArray([...arr]);
        // await delay(SHORT_DELAY_IN_MS);
        if (arr[j] < arr[maxInd]) {
          maxInd = j;
          swap(arr, i, j);
          // arr[j].state = ElementStates.Default;
          // setSortingArray([...arr]);
          // await delay(SHORT_DELAY_IN_MS);
        }
        swap(arr, i, j);
        arr[maxInd].state = ElementStates.Default;
        arr[i].state = ElementStates.Modified;
        setSortingArray([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        console.log(sortingArray);
      }
    }
  }

  const generationNumber = () => {
    const reserveSum = Math.floor(Math.random()* 10);
    const sum = Math.floor(Math.random()* 10) * (reserveSum + 1);
    return sum > 36 ? sum + 10 : sum + 1;
  }

  const randomArr = () => {
    const array:Array<number> = [];
    let arrayLength: number = generationNumber();
    const coint = arrayLength > 17 ? 6 : arrayLength < 3 ? 3 : arrayLength;
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
    console.log(sortingArray)
  }

  useEffect(()=> {
    randomArr();
  },[])

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={stylesSorting.form}>
        <div className={stylesSorting.block}>
          <RadioInput
              // disabled={isLoader === desc || isLoader === asc}
              label="Выбор"
              name={"sorting-type"}
              value={"selection-sort"}
              defaultChecked
              extraClass="mr-20"
              // onChange={onChangeRadio}
          />
          <RadioInput
              // disabled={isLoader === desc || isLoader === asc}
              label="Пузырек"
              name={"sorting-type"}
              value={"bubble-sort"}
              // onChange={onChangeRadio}
          />
        </div>
        <div className={stylesSorting.block}>
          <Button
              // isLoader={isLoader === asc}
              // disabled={isLoader === desc}
              text="По возрастанию"
              onClick={() => selectionSort()}
              // onClick={() => onClickSort(asc)} //////////
              // sorting={Direction.Ascending}
              extraClass="mr-6"
          />
          <Button
              // isLoader={isLoader === desc}
              // disabled={isLoader === asc}
              text="По убыванию"
              // onClick={() => onClickSort(desc)}
              // sorting={Direction.Descending}
              extraClass="mr-40"
          />
          <Button
              // disabled={isLoader !== array && isLoader !== initial}
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
