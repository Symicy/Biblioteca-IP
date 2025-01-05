import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
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

/**
 * Component for user registration.
 *
 * @returns {JSX.Element} The rendered registration component.
 */
const Înregistrare = () => {
    const errRef = useRef();
    const navigate = useNavigate();

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
    }, [username, email, pwd, matchPwd]);

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    /**
     * Handles the form submission for user registration.
     *
     * @param {Object} e - The form submission event.
     */
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
            };
            await saveUser(valuesUser);
            setSuccess(true);
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Serverul nu răspunde');
            } else if (err.response?.status === 409) {
                setErrMsg('Email folosit deja');
            } else {
                setErrMsg('Înregistrare eșuată');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {errMsg && (
                <div className="alert alert-danger" role="alert">
                    {errMsg}
                </div>
            )}
            {success && (
                <div className="alert alert-success" role="alert">
                    Înregistrare reușită! Vei fi redirecționat la pagina principală.
                </div>
            )}
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg)'}}>
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Crează un cont.</h2>
                        <form onSubmit={handleSubmit}>
                            <MDBInput wrapperClass='mb-4' label='Numele tău' size='lg' id='username' type='text'
                                      value={username} onChange={(e) => setUsername(e.target.value)} required
                                      aria-invalid={validUsername ? "false" : "true"}
                                      aria-describedby="uidnote"
                                      onFocus={() => setUsernameFocus(true)}
                                      onBlur={() => setUsernameFocus(false)} />
                            <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Între 4 și 24 de caractere.<br />
                                Trebuie să înceapă cu literă mare.<br />
                                Litere, numere, underscores, cratime sunt permise.
                            </p>
                            <MDBInput wrapperClass='mb-4' label='Email-ul tău' size='lg' id='email' type='email'
                                      value={email} onChange={(e) => setEmail(e.target.value)} required
                                      aria-invalid={validEmail ? "false" : "true"}
                                      aria-describedby="emailnote"
                                      onFocus={() => setEmailFocus(true)}
                                      onBlur={() => setEmailFocus(false)} />
                            <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Trebuie să fie o adresă validă.
                            </p>
                            <MDBInput wrapperClass='mb-4' label='Parola' size='lg' id='password' type='password'
                                      value={pwd} onChange={(e) => setPwd(e.target.value)} required
                                      aria-invalid={validPwd ? "false" : "true"}
                                      aria-describedby="pwdnote"
                                      onFocus={() => setPwdFocus(true)}
                                      onBlur={() => setPwdFocus(false)} />
                            <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Între 8 și 24 de caractere.<br />
                                Trebuie să includă litere mari și mici, un numar și un caracter special. <br />
                                Caractere speciale permise: <span aria-label="exclamation mark">!</span>
                                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                            <MDBInput wrapperClass='mb-4' label='Repetă parola' size='lg' id='confirm_pwd' type='password'
                                      value={matchPwd} onChange={(e) => setMatchPwd(e.target.value)} required
                                      aria-invalid={validMatch ? "false" : "true"}
                                      aria-describedby="confirmnote"
                                      onFocus={() => setMatchFocus(true)}
                                      onBlur={() => setMatchFocus(false)} />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Parolele trebuie să coincidă.
                            </p>
                            <div className='d-flex flex-row justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Sunt de-acord cu termenii și condițiile.' />
                            </div>
                            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' disabled={!validUsername || !validEmail || !validPwd || !validMatch}>Înregistrare</MDBBtn>
                        </form>
                        <p>
                            Deja înregistrat?<br />
                            <span className="line">
                                <Link to="/">Login</Link>
                            </span>
                        </p>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    )
}

export default Înregistrare;