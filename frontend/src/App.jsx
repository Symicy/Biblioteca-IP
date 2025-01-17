import { HashRouter, Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import Header from "./components/Header.jsx";
import * as Icons from "react-icons/fa";
import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

/**
 * App component
 * @returns {JSX.Element} The rendered App component.
 * @constructor
 */
function App() {
    const [userType, setUserType] = useState("guest");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [nbOfBooks, setNbOfBooks] = useState(0);

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        const storedUserName = localStorage.getItem("userName");
        const storedUserEmail = localStorage.getItem("userEmail");
        if (storedUserType && storedUserName && storedUserEmail) {
            setUserType(storedUserType);
            setUserName(storedUserName);
            setUserEmail(storedUserEmail);
        }
    }, []);

    /**
     * HeaderConst component
     * @returns {JSX.Element|null} The rendered Header component or null.
     */
    const HeaderConst = () => {
        const location = useLocation();
        const showControls = location.pathname === "/books";
        return (
            (location.pathname === "/books" || location.pathname.startsWith("/books/")) && (
                <Header
                    userType={userType}
                    userName={userName}
                    userEmail={userEmail}
                    setUserType={setUserType}
                    setUserName={setUserName}
                    setUserEmail={setUserEmail}
                    nbOfBooks={nbOfBooks}
                    showControls={showControls}
                />
            )
        );
    };

    return (
        <HashRouter>
            <HeaderConst></HeaderConst>
            <Routes>
                <Route path="/" element={<Navigate to={"/books"}/>}/>
                <Route path="/books" element={<HomePage setNbOfBooks={setNbOfBooks}/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/books/:bookId" element={<BookDetail userType={userType}/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;