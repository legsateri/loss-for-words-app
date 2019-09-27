//FIXME: Basic setup is up and running, but need to actually get it working.

import React, { Component } from 'react';
import './AddComment.css';
import AppContext from '../AppContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';
import parse from 'url-parse';

class AddComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {
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
        const newComment = {
            content: this.state.comment.textArea,
            author: this.state.comment.name,
            prompt_id: null,
            id: this.context.comments.length.toString()
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
                this.context.addComment(newComment);
                this.props.history.goBack();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChangeCommentName(event) {
        const input = event.target.value;
        const hasError = this.validateName(input).hasError;
        const inputError = this.validateName(input).inputError;

        this.setState({
            comment: {
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
        const input = event.target.value;
        const hasError = this.validateTextArea(input).hasError;
        const inputError = this.validateTextArea(input).inputError;

        this.setState({
            comment: {
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
        let urlObject = url.parse(inUrlString);
        console.log(urlObject)

        return (
            <>
                <section className='add_comment_section'>
                    <h3>What You Have To Say</h3>
                    <div className='add_comment_form'>
                        <form onSubmit={event => this.handleSubmitComment(event)}>
                            <label className='input_label' htmlFor='content'>Your Response</label>
                            <br />
                            <textarea
                                className='input_field'
                                required
                                value={this.state.comment.textArea}
                                onChange={event => this.handleChangeTextArea(event)}
                                rows='7' />
                            <ValidationError
                                hasError={!this.state.comment.contentValid}
                                message={this.state.comment.validationMessageContent} />
                            <br />

                            <label className='input_label' htmlFor='name'>Author or Pseudonym</label>
                            <br />
                            <input
                                className='input_field'
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
                                className='submit_prompt_button'
                                type='submit'
                                disabled={!this.state.formValid}
                            >Submit</button>
                        </form>
                    </div>
                </section>
            </>
        )
    }
}

export default AddComment;