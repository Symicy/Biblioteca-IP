import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/UserService.jsx";

const Header = ({ userType, userName, userEmail, setUserType, setUserName, setUserEmail, nbOfBooks }) => {
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

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginUser(email, password);
            setUserType(user.type);
            setUserName(user.username);
            setUserEmail(user.email);
            setError('');
            localStorage.setItem('userType', user.type);
            localStorage.setItem('userName', user.username);
            localStorage.setItem('userEmail', user.email);
        } catch (error) {
            setError('Email sau parola incorecta!');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        setUserType('guest');
        setUserName('');
        setUserEmail('');
    };

    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <h3 className="text-light">Numar carti: {nbOfBooks}</h3>
                {userType === 'admin' &&
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }} data-bs-toggle="modal" data-bs-target="#addBookBackdrop">
                            <i className="fas fa-book"></i> Adaugare carte
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAuthorBackdrop">
                            <i className="fas fa-user"></i> Adaugare autor
                        </button>
                    </div>
                }
                {userType === 'guest' &&
                    <div className="dropdown">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false" data-bs-auto-close="outside">
                            Utilizator
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" style={{ minWidth: "300px" }}>
                            <form className="px-4 py-3" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">Adresa email</label>
                                    <input type="email" className="form-control" id="exampleDropdownFormEmail1"
                                           placeholder="email@exemplu.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Parola</label>
                                    <input type="password" className="form-control" id="exampleDropdownFormPassword1"
                                           placeholder="Parola" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn btn-primary">Logare</button>
                            </form>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/register">Inregistrare</Link>
                            <Link className="dropdown-item" to="/forgot-password">Parola uitata?</Link>
                        </div>
                    </div>
                }
                {userType !== 'guest' &&
                    <div className="dropdown">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false" data-bs-auto-close="outside">
                            {userName}
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" style={{ minWidth: "300px" }}>
                            <Link className="dropdown-item" to="/profile">Profil</Link>
                            <button className="dropdown-item" onClick={handleLogout}>Deconectare</button>
                        </div>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Header;