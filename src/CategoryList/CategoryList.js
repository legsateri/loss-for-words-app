// FIXME: Set up component. Will act as a sidebar to filter prompts on prompt list page.
import React from 'react';
import './CategoryList.css'

class CategoryList extends React.Component {
    render() {
        return (
            <>
                <ul className='categories'>
                    <li className='categories_list'>Animals</li>
                    <li className='categories_list'>Comedy</li>
                    <li className='categories_list'>Fantasy</li>
                    <li className='categories_list'>Fiction</li>
                    <li className='categories_list'>Horror</li>
                    <li className='categories_list'>Mystery</li>
                    <li className='categories_list'>Nonfiction</li>
                    <li className='categories_list'>Poems</li>
                    <li className='categories_list'>Romance</li>
                    <li className='categories_list'>Science Fiction</li>
                    <li className='categories_list'>Sports</li>
                </ul>
            </>
        );
    }
}

export default CategoryList;