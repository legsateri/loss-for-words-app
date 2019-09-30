import React from 'react';
import './AddPromptForm.css';
import AppContext from '../AppContext';
import ValidationError from '../ValidationError/ValidationError';
import config from '../config';

class AddPromptForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prompt: {
                id: null,
                textArea: '',
                option: '',
                name: '',
                contentValid: false,
                optionValid: false,
                nameValid: false,
                formValid: false,
                validationMessageContent: '',
                validationMessageOption: '',
                validationMessageName: ''
            }
        }
    }

    static contextType = AppContext;

    handleSubmitPrompt(event) {
        event.preventDefault();
        const promptId = parseInt(this.context.prompts.length)
        const newPrompt = {
            id: promptId,
            prompt_content: this.state.prompt.textArea,
            category: this.state.prompt.option,
            author: this.state.prompt.name
        };

        fetch(`${config.API_ENDPOINT}/api/prompts`, {
            method: 'POST',
            body: JSON.stringify(newPrompt),
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
                this.context.addPrompt(this.state.prompt);
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
            });
        this.setState({
            prompt: {
                id: null,
                textArea: '',
                option: 'Choose One',
                name: ' ',
                contentValid: false,
                optionValid: false,
                nameValid: false,
                formValid: false,
                validationMessageContent: '',
                validationMessageOption: '',
                validationMessageName: ''
            }
        })
    }

    handleSelectOption(option) {
        const hasError = this.validateOption(option).hasError;
        const inputError = this.validateOption(option).inputError;

        this.setState({
            prompt: {
                textArea: this.state.prompt.textArea,
                option: option,
                name: this.state.prompt.name,
                contentValid: this.state.prompt.contentValid,
                optionValid: !hasError,
                formValid: false,
                nameValid: this.state.prompt.nameValid,
                validationMessageContent: this.state.prompt.validationMessageContent,
                validationMessageOption: inputError,
                validationMessageName: this.state.prompt.validationMessageName
            }
        });
        this.validateForm();
    }

    handleChangePromptName(event) {
        const input = event.target.value;
        const promptIndex = this.context.prompts.length.toString();
        const hasError = this.validateName(input).hasError;
        const inputError = this.validateName(input).inputError;

        this.setState({
            prompt: {
                id: promptIndex,
                name: input,
                textArea: this.state.prompt.textArea,
                option: this.state.prompt.option,
                nameValid: !hasError,
                contentValid: this.state.prompt.contentValid,
                optionValid: this.state.prompt.optionValid,
                formValid: false,
                validationMessageName: inputError,
                validationMessageContent: this.state.prompt.validationMessageContent,
                validationMessageOption: this.state.prompt.validationMessageOption
            }
        });
        this.validateForm();
    }

    handleChangeTextArea(event) {
        const input = event.target.value;
        const promptIndex = this.context.prompts.length.toString();
        const hasError = this.validateTextArea(input).hasError;
        const inputError = this.validateTextArea(input).inputError;

        this.setState({
            prompt: {
                id: promptIndex,
                name: this.state.prompt.name,
                textArea: input,
                option: this.state.prompt.option,
                nameValid: this.state.prompt.nameValid,
                contentValid: !hasError,
                optionValid: this.state.prompt.optionValid,
                formValid: false,
                validationMessageName: this.state.prompt.validationMessageName,
                validationMessageContent: inputError,
                validationMessageOption: this.state.prompt.validationMessageOption
            }
        });
        this.validateForm();
    }

    validateTextArea(inputValue) {
        let inputError = '';
        let hasError = false;

        inputValue = inputValue.trim();

        if (inputValue.length === 0) {
            inputError = 'Prompt content is required.';
            hasError = true;
        } else {
            if (inputValue.length < 8) {
                inputError = 'Your prompt must be at least 10 characters long.';
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

    validateOption(inputValue) {
        let inputError = '';
        let hasError = false;

        inputValue = inputValue.trim();

        if (inputValue.length < 3) {
            inputError = 'Please select a category.';
            hasError = true;
        } else {
            inputError = '';
            hasError = false;
        }

        let validity = {
            hasError: hasError,
            inputError: inputError
        }
        return validity;
    }

    validateName(inputValue) {
        let inputError = '';
        let hasError = false;

        inputValue = inputValue.trim();

        if (inputValue.length === 0) {
            inputError = 'An author is required.';
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

    validateForm() {
        const name = this.state.prompt.nameValid;
        const content = this.state.prompt.contentValid;

        if (name && content) {
            this.setState({
                formValid: true
            });
        }
    }

    render() {
        return (
            <>
                <section className='add_prompt_section'>
                    <h1 className='add_prompt_header'>Create Your Own Prompt</h1>
                    <div className='add_prompt_form'>
                        <form onSubmit={event => this.handleSubmitPrompt(event)}>
                            <label className='input_label text_label' htmlFor='content'>Your Prompt</label>
                            <br />
                            <textarea
                                className='input_field text_field'
                                required
                                value={this.state.prompt.textArea}
                                onChange={event => this.handleChangeTextArea(event)}
                                rows='15' />
                            <ValidationError
                                hasError={!this.state.prompt.contentValid}
                                message={this.state.prompt.validationMessageContent} />
                            <br />

                            <label className='input_label' htmlFor='name'>Your Name (Real or Otherwise)</label>
                            <br />
                            <input
                                className='input_field author_field'
                                type='text'
                                id='name'
                                name='name'
                                required
                                onChange={event => this.handleChangePromptName(event)} />
                            <ValidationError
                                hasError={!this.state.prompt.nameValid}
                                message={this.state.prompt.validationMessageName} />
                            <br />

                            <label className='input_label' htmlFor='options'>Category</label>
                            <br />
                            <select
                                className='input_field option_field'
                                id='options'
                                name='options'
                                required
                                onChange={event => this.handleSelectOption(event.target.value)}
                            >
                                <option className='dropdown_options' value='Choose One'>Choose One</option>
                                <option className='dropdown_options' value='Animals'>Animals</option>
                                <option className='dropdown_options' value='Comedy'>Comedy</option>
                                <option className='dropdown_options' value='Fantasy'>Fantasy</option>
                                <option className='dropdown_options' value='Fiction'>Fiction</option>
                                <option className='dropdown_options' value='Horror'>Horror</option>
                                <option className='dropdown_options' value='Mystery'>Mystery</option>
                                <option className='dropdown_options' value='Nonfiction'>Nonfiction</option>
                                <option className='dropdown_options' value='Poems'>Poems</option>
                                <option className='dropdown_options' value='Romance'>Romance</option>
                                <option className='dropdown_options' value='Science Fiction'>Science Fiction</option>
                                <option className='dropdown_options' value='Sports'>Sports</option>
                            </select>
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
        );
    }
}

export default AddPromptForm;