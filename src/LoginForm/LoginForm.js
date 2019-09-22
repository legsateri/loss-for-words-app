import React from 'react';
import SignupForm from '../SignupForm/SignupForm';
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            form: "login",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            form: event.target.value
        })
    }

    render() {
        let formOutput;

        if (this.state.form === "login") {
            formOutput =
                <>
                    <form className='login_form'>
                        <div>
                            <label htmlFor="loginEmail">Email</label>
                            <input type="text" name='loginEmail' id='loginEmail' />
                        </div>
                        <div>
                            <label htmlFor="loginPassword">Password</label>
                            <input type="loginPassword" name='loginPassword' id='loginPassword' />
                        </div>
                        {/* FIXME: Make submit functionality work */}
                        <button type='submit'>Login</button>
                    </form>
                </>
        } else {
            formOutput =
                <>
                    <SignupForm />
                </>
        }

        return (
            <>
                <main>
                    <header>
                        <h1>Start Writing</h1>
                        <form>
                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value="login"
                                        checked={this.state.form === "login"}
                                        onChange={this.handleChange}
                                        onClick={this.handleForms}
                                    />
                                    Login
                            </label>
                            </div>

                            <div className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value="signup"
                                        checked={this.state.form === "signup"}
                                        onChange={this.handleChange}
                                        onClick={this.handleForms}
                                    />
                                    Signup
                            </label>
                            </div>
                        </form>
                    </header>

                    <section>
                        {formOutput}
                    </section>
                </main>
            </>
        );
    }
}

export default LoginForm;