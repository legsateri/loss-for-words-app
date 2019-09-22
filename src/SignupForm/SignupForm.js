import React from 'react';
import './SignupForm.css';

class SignupForm extends React.Component {
    render() {
        return (
            <>
                <form className='signup_form'>
                    <div>
                        <label htmlFor="first-name">First Name</label>
                        <input placeholder='First Name' type="text" name='first-name' id='first-name' />
                    </div>
                    <div>
                        <label htmlFor="last-name">Last Name</label>
                        <input placeholder='Last Name' type="text" name='last-name' id='last-name' />
                    </div>
                    <div>
                        <label htmlFor="signupEmail">Email</label>
                        <input type="text" name='emsignupEmailail' id='signupEmail' />
                    </div>
                    <div>
                        <label htmlFor="signupPassword">Password</label>
                        <input type="signupPassword" name='signupPassword' id='signupPassword' />
                    </div>

                    {/* FIXME: Make submit functionality work */}
                    <button type='submit'>Sign Up</button>
                </form>
            </>
        );
    }
}

export default SignupForm;