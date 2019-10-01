// FIXME: Add infinite scroll or load more so page doesn't take so long to load. 
        // Resource: https://infinite-scroll.com/

import React from 'react';
import shuffle from 'shuffle-array';
import './PromptList.css';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';
// import CategoryList from '../CategoryList/CategoryList';

class PromptList extends React.Component {
    static contextType = AppContext;

    render() {
        const prompts = this.context.prompts.map(prompt => {
            return (
                <>
                    <li key={prompt.id} className='prompt_list_item'>
                        <div>
                            <h2 className='prompt_list_h2'>{prompt.prompt_content}</h2>
                            <p className='prompt_author'>Submitted By: {prompt.author}</p>
                        </div>

                        <Link to={`/prompts/${prompt.id}`}>
                            <button className='prompt_button'>View Prompt</button>
                        </Link>

                        <p className='prompt_category'>Category: {prompt.category}</p>
                    </li>
                </>
            );
        });

        shuffle(prompts);

        return (
            <>
                <main>
                    {/* <section className='sidebar'>
                        <CategoryList />
                    </section> */}

                    <section className='prompt_list'>
                        <header role='banner'>
                            <h1 className='prompt_list_h1'>List O' Prompts</h1>
                        </header>

                        <ul>{prompts}</ul>
                    </section>
                </main>
            </>
        );
    }
}

export default PromptList;