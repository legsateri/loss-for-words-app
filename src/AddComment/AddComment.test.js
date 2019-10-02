import React from 'react';
import ReactDOM from 'react-dom';
import AddComment from './AddComment';

describe('AddComment component', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddComment />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});