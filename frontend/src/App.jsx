import {HashRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import * as Icons from "react-icons/fa";
import React from "react";

function App() {

    return (
        <HashRouter>
            <div className="container-fluid">
                <div className="d-flex justify-content-center">
                    <Link to="/" className="navbar-brand bg-transparent text-dark">
                        <div className="d-flex align-items-center">
                            <h1>BIBLIOTECA</h1>
                            <Icons.FaBook className="ms-2"style={{ fontSize: '2em' }}/>
                        </div>
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Navigate to={"/books"}/>}/>
                <Route path="/books" element={<HomePage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
            </Routes>
        </HashRouter>
    );

}

export default App;