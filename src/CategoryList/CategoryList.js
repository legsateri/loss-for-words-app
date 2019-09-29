// FIXME: Set up component. Will act as a sidebar to filter prompts on prompt list page.
import React from 'react';
import './CategoryList.css';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';

class CategoryList extends React.Component {
    static contextType = AppContext;

    render() {
        const category = ['Animals', 'Comedy', 'Fantasy', 'Fiction', 'Horror', 'Mystery', 'Nonfiction', 'Poems', 'Romance', 'Science Fiction', 'Sports']
        return (
            <>
                <ul className='categories'>
                    <Link to={`/prompts/${category[0]}`}><li className='categories_list'>Animals</li></Link>
                    <Link to={`/prompts/${category[1]}`}><li className='categories_list'>Comedy</li></Link>
                    <Link to={`/prompts/${category[2]}`}><li className='categories_list'>Fantasy</li></Link>
                    <Link to={`/prompts/${category[3]}`}><li className='categories_list'>Fiction</li></Link>
                    <Link to={`/prompts/${category[4]}`}><li className='categories_list'>Horror</li></Link>
                    <Link to={`/prompts/${category[5]}`}><li className='categories_list'>Mystery</li></Link>
                    <Link to={`/prompts/${category[6]}`}><li className='categories_list'>Nonfiction</li></Link>
                    <Link to={`/prompts/${category[7]}`}><li className='categories_list'>Poems</li></Link>
                    <Link to={`/prompts/${category[8]}`}><li className='categories_list'>Romance</li></Link>
                    <Link to={`/prompts/${category[9]}`}><li className='categories_list'>Science Fiction</li></Link>
                    <Link to={`/prompts/${category[10]}`}><li className='categories_list'>Sports</li></Link>
                </ul>
            </>
        );
    }
}

export default CategoryList;