import React from 'react';
import ReactDOM from 'react-dom';
import PromptList from './PromptList';
import { BrowerRouter } from 'react-router-dom';

describe('PromptList component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PromptList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});