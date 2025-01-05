// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as Icons from "react-icons/fa";
import {login, loginUser} from "../api/UserService.jsx";
import { FaBook, FaUser } from "react-icons/fa";

/**
 * Header component
 * @param {string} userType - The type of the user.
 * @param {string} userName - The name of the user.
 * @param {string} userEmail - The email of the user.
 * @param {function} setUserType - Function to set the user type.
 * @param {function} setUserName - Function to set the user name.
 * @param {function} setUserEmail - Function to set the user email.
 * @param {number} nbOfBooks - The number of books.
 * @param {boolean} showControls - Flag to show or hide controls.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({userType, userName, userEmail, setUserType, setUserName, setUserEmail, nbOfBooks, showControls}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType');
        const storedUserName = localStorage.getItem('userName');
        const storedUserEmail = localStorage.getItem('userEmail');
        if (storedUserType && storedUserName && storedUserEmail) {
            setUserType(storedUserType);
            setUserName(storedUserName);
            setUserEmail(storedUserEmail);
        }
    }, [setUserType, setUserName, setUserEmail]);

    /**
     * Handle login form submission
     * @param {Event} event - The form submission event.
     */
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginUser(email, password);
            setUserType(user.type);
            setUserName(user.username);
            setUserEmail(user.email);
            setError('');
            console.log(user);
            // Save the user in the local storage
            localStorage.setItem('userType', user.type);
            localStorage.setItem('userName', user.username);
            localStorage.setItem('userEmail', user.email);
        } catch (error) {
            if(error.response && error.response.status === 401){
                setError('Email sau parola incorecta!');
            }
            else
            {
                setError('Email sau parola incorecta!');
            }
        }
    };

    /**
     * Handle user logout
     */
    const handleLogout = () => {
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setUserType('guest');
        setUserName('');
        setUserEmail('');
    };

    return (
        <nav className="navbar fixed-top border-bottom border-body" data-bs-theme="dark"
             style={{backgroundColor: "#49ACEA", color: "floralwhite"}}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <div className="d-flex align-items-center">
                        <h1>BIBLIOTECA</h1>
                        <Icons.FaBook className="ms-2" style={{fontSize: "2em", color: "black"}}/>
                    </div>
                </Link>
                {userType === 'admin' && showControls &&
                    <div style={{display: 'flex', alignItems: 'center', marginRight: "90px"}}>
                        <button type="button" className="btn"
                                style={{marginRight: '15px', backgroundColor: "#6B5F57", color: "floralwhite"}}
                                data-bs-toggle="modal" data-bs-target="#addBookBackdrop">
                            <i className="fas fa-book"></i> Adaugare carte
                        </button>
                        <button type="button" className="btn" style={{backgroundColor: "#6B5F57", color: "floralwhite"}}
                                data-bs-toggle="modal"
                                data-bs-target="#addAuthorBackdrop">
                            <i className="fas fa-user"></i> Adaugare autor
                        </button>
                    </div>
                }
                {userType === 'guest' &&
                    <div className="dropdown">
                        <button type="button" className="btn dropdown-toggle"
                                style={{backgroundColor: "#6B5F57", color: "floralwhite"}} data-bs-toggle="dropdown"
                                aria-expanded="false" data-bs-auto-close="outside">
                            Utilizator
                        </button>
                        <div className="dropdown-menu dropdown-menu-end"
                             style={{minWidth: "300px", backgroundColor: "#6B6557", color: "floralwhite"}}>
                            <form className="px-4 py-3" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Adresa
                                        email</label>
                                    <input type="email" className="form-control" id="exampleDropdownFormEmail1"
                                           placeholder="email@exemplu.com" value={email}
                                           onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Parola</label>
                                    <input type="password" className="form-control" id="exampleDropdownFormPassword1"
                                           placeholder="Parola" value={password}
                                           onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn "
                                        style={{backgroundColor: "#6B5F57", color: "floralwhite"}}>Logare
                                </button>
                            </form>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/register"
                                  style={{color: "floralwhite"}}>Inregistrare</Link>
                            <Link className="dropdown-item" to="/forgot-password" style={{color: "floralwhite"}}>Parola
                                uitata?</Link>
                        </div>
                    </div>
                }
                {userType !== 'guest' &&
                    <div className="dropdown">
                        <button type="button" className="btn dropdown-toggle"
                                style={{backgroundColor: "#6B5F57", color: "floralwhite"}} data-bs-toggle="dropdown"
                                aria-expanded="false" data-bs-auto-close="outside">
                            {userName}
                        </button>
                        <div className="dropdown-menu dropdown-menu-end"
                             style={{minWidth: "300px", backgroundColor: "#6B6557", color: "floralwhite"}}>
                            <Link className="dropdown-item" to="/profile" style={{color: "floralwhite"}}>Profil</Link>
                            <button className="dropdown-item" onClick={handleLogout}
                                    style={{color: "floralwhite"}}>Deconectare
                            </button>
                        </div>
                    </div>
                }
            </div>
        </nav>
    );
}
export default Header;