import React from 'react';
import ReactDOM from 'react-dom';
import Prompt from './Prompt';
import { BrowserRouter, Route } from 'react-router-dom';

describe('Prompt component', () => {

    it('renders without crashing', () => {

        const testPath = '/prompts/cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1';
        const div = document.createElement('div');
        ReactDOM.render(
        <BrowserRouter>
            <Route path={testPath} component={Prompt}/>
        </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});