import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import { Link } from 'react-router-dom';

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const auth = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, username, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, username, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setAuth({ email, username, pwd, roles, accessToken });
            setEmail('');
            setUsername('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid email, username, or password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Something went wrong');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Login</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register">Register</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login;