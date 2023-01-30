import React from 'react';
import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from "../../../types/element-states";

//use snapshots for correct test, correct view element
describe('test component Circle', () => {
    it('Circle has not symbol', () => {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle has symbol (Snapshot)', () => {
        const tree = renderer.create(<Circle letter={'test text'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with head (Snapshot)', () => {
        const tree = renderer.create(<Circle head={'24'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with react-element in head', () => {
        const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with tail', () => {
        const tree = renderer.create(<Circle tail={'24'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle с react-element in tail', () => {
        const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle has index', () => {
        const tree = renderer.create(<Circle index={24} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle has props isSmall === true', () => {
        const tree = renderer.create(<Circle isSmall />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle has default position', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle has changing position', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle has modified position', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
