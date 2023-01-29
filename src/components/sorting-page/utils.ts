import {IRandomArr} from './sorting-page'

export const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const swap = (arr: IRandomArr[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const selectionSort = (array: IRandomArr[]) => {
    const { length } = array;
    for (let i = 0; i < length; i++) {
        let maxInd = i;
        for (let j = i + 1; j < length; j++) {
            if (array[maxInd].number < array[j].number) {
                maxInd = j;
            }
        }
        if (maxInd !== i) {
            swap(array, i, maxInd);
        }
    }
    return array;
};

export const bubbleSort = (array: IRandomArr[]) => {
    const { length } = array;
    for (let i = 0; i < length; i++) {
        for (let compareIndex = 0; compareIndex < length - i - 1; compareIndex++) {
            const left = array[compareIndex].number;
            const right = array[compareIndex + 1].number;
            if (left < right) {
                array[compareIndex].number = right;
                array[compareIndex + 1].number = left;
            }
        }
    }

    return array;
}