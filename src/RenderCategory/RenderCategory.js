import React from 'react';
import CategoryList from '../CategoryList/CategoryList';
import AppContext from '../AppContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RenderCategory extends React.Component {
    static contextType = AppContext;

    renderSelectedCategory() {
        const prompts = this.props.prompts.map(prompt => {
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
        return prompts;
    }

    render() {
        return (
            <>
                <CategoryList />
                <ul>{this.renderSelectedCategory}</ul>
            </>
        )
    }
}

RenderCategory.propTypes = {
    prompts: PropTypes.array.isRequired
}

export default RenderCategory;