import React from 'react';
import { ElementStates } from '../../types/element-states';
import { bubbleSort, selectionSort } from './utils';

const stub = [
    {number: 9, state: ElementStates.Default},
    {number: 18, state: ElementStates.Default},
    {number: 3, state: ElementStates.Default},
    {number: 4, state: ElementStates.Default},
    {number: 2, state: ElementStates.Default}
]

const result = [
    {number: 18, state: ElementStates.Default},
    {number: 9, state: ElementStates.Default},
    {number: 4, state: ElementStates.Default},
    {number: 3, state: ElementStates.Default},
    {number: 2, state: ElementStates.Default}
]

describe('test component SortingPage', () => {

    it('sort empty array selection', () => {
        expect(selectionSort([])).toEqual([]);
    });
    //operation with sort of selection
    it('correct array from one element (selection)', () => {
        expect(selectionSort([{
            num: 9,
            state: ElementStates.Default
        }])).toStrictEqual([{
            num: 9,
            state: ElementStates.Default
        }]);
    });

    it('correct array from any elements (selection)', () => {
        expect(selectionSort(stub)).toStrictEqual(result);
    });

    //operation with sort of bubble
    it('sort empty array bubble', () => {
        expect(bubbleSort([])).toEqual([]);
    });

    it('correct array from one element (bubble)', () => {
        expect(bubbleSort([{
            num: 9,
            state: ElementStates.Default
        }])).toStrictEqual([{
            num: 9,
            state: ElementStates.Default
        }]);

    });
    it('correct array from any elements (bubble)', () => {
        expect(bubbleSort(stub)).toStrictEqual(result);
    });
})