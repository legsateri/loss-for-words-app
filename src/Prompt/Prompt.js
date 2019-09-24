import React from 'react';
import './Prompt.css';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import AddComment from '../AddComment/AddComment';

// FIXME: Only want to view comments associated with their respective prompts.

class Prompt extends React.Component {
    static contextType = AppContext;

    render() {
        const promptId = parseInt(this.props.match.params.promptId);
        const prompt = this.context.prompts.find(prompt => prompt.id === promptId);
        console.log(prompt.prompt_content);

        const comments = this.context.comments.map(comment => {
            return (
                <>
                    <li key={comment.id} className='comment_list_item'>
                        <div>
                            <p>{comment.prompt_response}</p>
                            <p>{comment.author}</p>
                        </div>
                    </li>
                </>
            );
        });

        return (
            <>
                <section className='prompt_align'>
                    <div className='content_container'>
                        <Link to={`/prompts/${promptId}`} className='prompt_link'>
                            <h2 className='prompt_content'>{prompt.prompt_content}</h2>
                            <p className='prompt_info'>{prompt.author}, {prompt.category}</p>
                        </Link>
                    </div>
                </section>

                <section className='add_comment'>
                    <AddComment />
                    <ul className='view_comments'>
                        {comments}
                    </ul>
                </section>
            </>
        )
    }
}

export default Prompt;