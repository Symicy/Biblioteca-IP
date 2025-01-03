import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('forgot-password', { email });
            setMessage('Password reset link sent!');
            setError('');
            console.log(response);
        } catch (err) {
            setError('Error sending password reset link');
            setMessage('');
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Forgot Password</h3>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <button className="btn btn-primary btn-block">Submit</button>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
        </form>
    );
};

export default ForgotPassword;