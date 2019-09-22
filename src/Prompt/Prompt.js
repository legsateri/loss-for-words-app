import React from 'react';
import './Prompt.css';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import AddComment from '../AddComment/AddComment';

// FIXME: Add comment section back to the page.
// FIXME: Add view comments section to the page.
class Prompt extends React.Component {
    static contextType = AppContext;

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
                </section>
            </>
        )
    }
}

export default Prompt;