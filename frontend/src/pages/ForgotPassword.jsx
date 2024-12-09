import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email: email };
        axios.post('/api/forgot-password', data).then(
            res => {
                setMessage('Password reset link has been sent to your email.');
            }
        ).catch(
            err => {
                setMessage('Error sending password reset link. Please try again.');
            }
        );
    };

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
        </div>
    );
};

export default ForgotPassword;