import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './MainPage';
import { BrowserRouter } from 'react-router-dom';

describe('MainPage component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><MainPage /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});