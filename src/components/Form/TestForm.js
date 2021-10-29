import React from 'react';
import { useState } from 'react';

const TestForm = () => {
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState('');

    // The regular exprssion to validate the email pattern
    // It may not be 100% perfect but can catch most email pattern errors and assures that the form is mostly right
    const emailRegex = /\S+@\S+\.\S+/;

    const validateEmail = (event) => {
        const email = event.target.value;
        if (emailRegex.test(email)) {
            setIsValid(true);
            setMessage('Your email looks good!');
            console.log("email ok: ", email);
        } else {
            setIsValid(false);
            setMessage('Please enter a valid email!');
            console.log("email fail: ", email);
        }
    };

    return (
        <div className="container">
            <input
                type="email"
                placeholder="Enter your email"
                className="email-input"
                onChange={validateEmail}
            />

            {/*If the entered email is valid, the message will be blue, otherwise it will be red. */}
            <div className={`message ${isValid ? 'success' : 'error'}`}>
                {message}
            </div>
        </div>
    );
};

export default TestForm;
