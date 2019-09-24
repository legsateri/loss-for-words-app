import React from 'react';
import './Prompt.css';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import AddComment from '../AddComment/AddComment';

// FIXME: Only want to view comments associated with their respective prompts.

class Prompt extends React.Component {
    static contextType = AppContext;

    renderComments() {
        const commentId = parseInt(this.props.match.params.promptId);
        const comments = this.context.comments;
        console.log(commentId);
        console.log(comments);

        for(let i=0; i < comments.length; i++){
            if (commentId[i] === comments[i].prompt_id) {
                return (
                    <>
                        <li key={comments.i.id} className='comment_list_item'>
                            <div>
                                <p>{comments.i.prompt_response}</p>
                                <p>{comments.i.author}</p>
                            </div>
                        </li>
                    </>
                )
            }
        }
    }

    render() {
        const promptId = parseInt(this.props.match.params.promptId);
        const prompt = this.context.prompts.find(prompt => prompt.id === promptId);
        console.log(prompt.prompt_content);

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
                    <ul className='comment_list'>
                        {this.renderComments()}
                    </ul>
                </section>
            </>
        )
    }
}

export default Prompt;