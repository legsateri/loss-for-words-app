import React from 'react';
import ReactDOM from 'react-dom';
import AddPromptForm from './AddPromptForm';

describe('AddPromptForm component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddPromptForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});