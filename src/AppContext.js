import React from 'react';

export default React.createContext({
    prompts: {},
    comments: [],
    addPrompt: () => { },
    addComment: () => { }
});