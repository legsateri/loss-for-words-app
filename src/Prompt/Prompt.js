import React from 'react';
import './Prompt.css';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import AddComment from '../AddComment/AddComment';
import { nextTick } from 'q';

class Prompt extends React.Component {
    static contextType = AppContext;

    render() {
        const promptId = parseInt(this.props.match.params.promptId);
        const prompt = this.context.prompts.find(prompt => prompt.id === promptId);

        const commentPromptId = parseInt(this.props.match.params.promptId);
        const comments = this.context.comments;
        
        const promptComment = []

        for (let i = 0; i < comments.length; i++) {
            if (commentPromptId === comments[i].prompt_id) {
                promptComment.push(
                    <li key={comments[i].id} className='comment_list_item'>
                        <div>
                            <p>{comments[i].prompt_response}</p>
                            <p>{comments[i].author}</p>
                        </div>
                    </li>
                )
            }
        }

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
                        {promptComment}
                    </ul>
                </section>
            </>
        )
    }
}

export default Prompt;