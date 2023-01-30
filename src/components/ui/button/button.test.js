import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

//use snapshots for correct test
describe('test component Button', () => {
    it('button has text', () => {
        //render button with text
        const tree = renderer.create(<Button text={'test text'} />).toJSON();
        //test toMatchSnapshot() between in data & out data
        expect(tree).toMatchSnapshot();
    });

    it('button has not text', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('block button', () => {
        const tree = renderer.create(<Button disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('button has loading icon', () => {
        const tree = renderer.create(<Button isLoader />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('press on button appear alert', () => {
        window.alert = jest.fn();
        render(
            <Button onClick={() => window.alert('text')}
                    text={'test text'}
            />)
        const button = screen.getByText('test text');
        //fake press button
        fireEvent.click(button);
        //test works alert
        expect(window.alert).toHaveBeenCalledWith('text');
    })
});
