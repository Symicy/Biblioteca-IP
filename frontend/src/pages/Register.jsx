import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from '../api/axios.jsx';
import { saveUser } from "../api/UserService.jsx";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGISTER_URL = '/register';

const Register = () => {
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [username, email, pwd, matchPwd])

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUsername(result);
    }, [username])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(username);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid entry');
            return;
        }
        try {
            const valuesUser = {
                email: email,
                username: username,
                type: 'user',
                password: pwd,
            }
            await saveUser(valuesUser);
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg)'}}>
                    <div className='mask gradient-custom-3'></div>
                    <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                        <MDBCardBody className='px-5'>
                            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                            <form onSubmit={handleSubmit}>
                                <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='username' type='text'
                                          value={username} onChange={(e) => setUsername(e.target.value)} required
                                          aria-invalid={validUsername ? "false" : "true"}
                                          aria-describedby="uidnote"
                                          onFocus={() => setUsernameFocus(true)}
                                          onBlur={() => setUsernameFocus(false)} />
                                <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                                <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='email' type='email'
                                          value={email} onChange={(e) => setEmail(e.target.value)} required
                                          aria-invalid={validEmail ? "false" : "true"}
                                          aria-describedby="emailnote"
                                          onFocus={() => setEmailFocus(true)}
                                          onBlur={() => setEmailFocus(false)} />
                                <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must be a valid email address.
                                </p>
                                <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='password' type='password'
                                          value={pwd} onChange={(e) => setPwd(e.target.value)} required
                                          aria-invalid={validPwd ? "false" : "true"}
                                          aria-describedby="pwdnote"
                                          onFocus={() => setPwdFocus(true)}
                                          onBlur={() => setPwdFocus(false)} />
                                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number, and a special character. <br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                                    <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                                <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='confirm_pwd' type='password'
                                          value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)} required
                                          aria-invalid={validMatch ? "false" : "true"}
                                          aria-describedby="confirmnote"
                                          onFocus={() => setMatchFocus(true)}
                                          onBlur={() => setMatchFocus(false)} />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p>
                                <div className='d-flex flex-row justify-content-center mb-4'>
                                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                                </div>
                                <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' disabled={!validUsername || !validEmail || !validPwd || !validMatch}>Register</MDBBtn>
                            </form>
                            <p>
                                Already registered?<br />
                                <span className="line">
                                    <Link to="/">Login</Link>
                                </span>
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            )}
        </>
    )
}

export default Register;