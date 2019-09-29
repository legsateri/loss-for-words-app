// FIXME: Set up component. Will act as a sidebar to filter prompts on prompt list page.
import React from 'react';
import CategoryList from '../CategoryList/CategoryList';
import AppContext from '../AppContext';
import { Link } from 'react-router-dom';

class FilteredList extends React.Component {
    static contextType = AppContext;

    // on click filter prompts by category and render

    render() {
        const prompts = this.context.prompts
        console.log(prompts)
        const categoryPrompts = []

        for (let i = 0; i < prompts.length; i++) {
            if (prompts[i].category === 'Fiction') {
                categoryPrompts.push(
                    <li key={prompts[i].id} className='prompt_list_item'>
                        <div>
                            <h2 className='prompt_list_h2'>{prompts[i].prompt_content}</h2>
                            <p className='prompt_author'>Submitted By: {prompts[i].author}</p>
                        </div>

                        <Link to={`/prompts/${prompts[i].id}`}>
                            <button className='prompt_button'>View Prompt</button>
                        </Link>

                        <p className='prompt_category'>Category: {prompts[i].category}</p>
                    </li>
                )
            }
        }

        console.log(categoryPrompts)

        return (
            <>
                <section className='sidebar'>
                    <CategoryList />
                </section>

                <ul>
                    {categoryPrompts}
                </ul>
            </>
        );
    }
}

export default FilteredList;