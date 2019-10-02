// FIXME: When adding a comment get TypeError.

import React, { Component } from 'react';
import './AddComment.css';
import AppContext from '../AppContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class AddComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {
                id: null,
                textArea: '',
                name: '',
                prompt_id: null,
                contentValid: false,
                nameValid: false,
                formValid: false,
                validationMessageName: '',
                validationMessageContent: ''
            }
        }
    }

    static contextType = AppContext;

    handleSubmitComment(event) {
        event.preventDefault();
        const commentId = parseInt(this.context.comments.length)
        const newComment = {
            id: commentId,
            prompt_response: this.state.comment.textArea,
            author: this.state.comment.name,
            prompt_id: this.state.comment.prompt_id
        };

        fetch(`${config.API_ENDPOINT}/api/comments`, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => Promise.reject(error))
                }
                return response.json();
            })
            .then(responseJson => {
                this.context.addComment(this.state.comment);
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    handlePromptId() {
        let currentPath = window.location.pathname
        let promptId = currentPath.match(/\d+/g).map(Number);
        const commentIndex = this.context.comments.length.toString();

        this.setState({
            comment: {
                id: commentIndex,
                prompt_id: promptId[0],
                textArea: this.state.comment.textArea,
                name: this.state.comment.name,
                contentValid: this.state.comment.contentValid,
                nameValid: this.state.comment.nameValid,
                formValid: false,
                validationMessageName: this.state.comment.validationMessageName,
                validationMessageContent: this.state.comment.validationMessageContent
            }
        })
    }

    handleChangeCommentName(event) {
        const input = event.target.value;
        const commentIndex = this.context.comments.length.toString();
        const hasError = this.validateName(input).hasError;
        const inputError = this.validateName(input).inputError;

        this.setState({
            comment: {
                id: commentIndex,
                prompt_id: this.state.comment.prompt_id,
                textArea: this.state.comment.textArea,
                name: input,
                contentValid: this.state.comment.contentValid,
                nameValid: !hasError,
                formValid: false,
                validationMessageName: inputError,
                validationMessageContent: this.state.comment.validationMessageContent
            }
        });
        this.validateForm();
    }

    handleChangeTextArea(event) {
        const commentIndex = this.context.comments.length.toString();
        const input = event.target.value;
        const hasError = this.validateTextArea(input).hasError;
        const inputError = this.validateTextArea(input).inputError;

        this.setState({
            comment: {
                id: commentIndex,
                prompt_id: this.state.comment.prompt_id,
                textArea: input,
                name: this.state.comment.name,
                contentValid: !hasError,
                nameValid: this.state.comment.nameValid,
                formValid: false,
                validationMessageName: this.state.comment.validationMessageName,
                validationMessageContent: inputError
            }
        });
        this.validateForm();
    }

    validateName(inputValue) {
        let inputError = '';
        let hasError = false;

        inputValue = inputValue.trim();
        if (inputValue.length === 0) {
            inputError = "Author is required";
            hasError = true;
        } else {
            if (inputValue.length < 3) {
                inputError = 'Name must be at least 4 characters long.';
                hasError = true;
            } else {
                inputError = '';
                hasError = false;
            }
        }

        let validity = {
            hasError: hasError,
            inputError: inputError
        }
        return validity;
    }

    validateTextArea(inputValue) {
        let inputError = '';
        let hasError = false;

        inputValue = inputValue.trim();
        if (inputValue.length === 0) {
            inputError = 'Prompt response is required.';
            hasError = true;
        } else {
            if (inputValue.length < 8) {
                inputError = 'Your response must be at least 10 characters long.';
                hasError = true;
            } else {
                inputError = '';
                hasError = false;
            }
        }

        let validity = {
            hasError: hasError,
            inputError: inputError
        }
        return validity;
    }

    validateForm() {
        const name = this.state.comment.nameValid;
        const content = this.state.comment.contentValid;

        if (name && content) {
            this.setState({
                formValid: true
            });
        }
    }

    render() {
        return (
            <>
                <section className='add_comment_section'>
                    <h3 className='comment_header'>What You Have To Say</h3>
                    <div className='add_comment_form'>
                        <form onSubmit={event => this.handleSubmitComment(event)}>
                            <label className='input_label text_label' htmlFor='content'>Your Response*</label>
                            <br />
                            <textarea
                                className='input_field text_field'
                                required
                                value={this.state.comment.textArea}
                                onChange={event => this.handleChangeTextArea(event)}
                                rows='7' />
                            <ValidationError
                                hasError={!this.state.comment.contentValid}
                                message={this.state.comment.validationMessageContent} />
                            <br />

                            <label className='input_label' htmlFor='name'>Your Name (Real or Otherwise)*</label>
                            <br />
                            <input
                                className='input_field author_field'
                                type='text'
                                id='name'
                                name='name'
                                required
                                onChange={event => this.handleChangeCommentName(event)} />
                            <ValidationError
                                hasError={!this.state.comment.nameValid}
                                message={this.state.comment.validationMessageName} />
                            <br />

                            <button
                                className='submit_comment_button'
                                type='submit'
                                disabled={!this.state.formValid}
                                onClick={event => this.handlePromptId(event)}
                            >Submit</button>
                        </form>
                    </div>
                </section>
            </>
        )
    }
}

export default AddComment;