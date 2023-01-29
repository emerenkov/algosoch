import React from 'react';
import { render, screen, waitFor, fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {StringComponent} from "./string";
import userEvent from '@testing-library/user-event';

//reverse string test
jest.setTimeout(10000)
describe('correct reverse string',() => {
    it('string has honest symbols', async () => {

        //go to page String
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = "string";

        userEvent.type(input, testString)
        expect(input).toHaveValue(testString)
        //can press on button (element under control)
        fireEvent.click(button)
        //use waitFor - when is waiting element
        await waitFor(() => {
            const id = screen.getAllByTestId('testCircle').map((el) => el.textContent)
            expect(id.join('')).toBe(Array(testString).reverse().join(''))
        }, {timeout: 1000})

    })

    it('string has odd symbols', async () => {
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = 'world';
        userEvent.type(input, testString)
        expect(input).toHaveValue(testString)
        fireEvent.click(button)
        await waitFor(() => {
            const id = screen.getAllByTestId('testCircle').map((el) => el.textContent)
            expect(id.join('')).toBe(Array(testString).reverse().join(''))
        }, {timeout: 1000})

    })

    it('string has one symbol', async () => {
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = "S";
        userEvent.type(input, testString)
        expect(input).toHaveValue(testString)
        fireEvent.click(button)
        await waitFor(() => {
            const id = screen.getAllByTestId('testCircle').map((el) => el.textContent)
            expect(id.join('')).toBe(testString)
        }, {timeout: 1000})
    })

    it('string has empty (without) symbol', async () => {
        render(
            <BrowserRouter >
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        expect(input).toHaveValue('')
        //use not correct data (get element turn on)
        expect(button).toBeDisabled()
    })
})
