// eslint-disable-next-line no-unused-vars
import React from "react";
import {Link} from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Header.css";

const Header = ({userType,nbOfBooks}) => {
  return (
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <Link to="/" className="navbar-brand text-light">
                BIBLIOTECA
                <Icons.FaBook/>
            </Link>
          <div className="container-fluid">
              <h3 className="text-light">Numar carti: {nbOfBooks}</h3>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Adaugare carte
              </button>
              <div className="dropdown">
                  <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                          aria-expanded="false" data-bs-auto-close="outside">
                      Utilizator
                  </button>
                  <div className="dropdown-menu dropdown-menu-end" style={{minWidth: "300px"}}>
                      <form className="px-4 py-3">
                          <div className="mb-3">
                              <label htmlFor="exampleDropdownFormEmail1" className="form-label">Adresa email</label>
                              <input type="email" className="form-control" id="exampleDropdownFormEmail1"
                                     placeholder="email@exemplu.com"/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="exampleDropdownFormPassword1" className="form-label">Parola</label>
                              <input type="password" className="form-control" id="exampleDropdownFormPassword1"
                                     placeholder="Parola"/>
                          </div>
                          <button type="submit" className="btn btn-primary">Logare</button>
                      </form>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/register">Inregistrare</Link>
                      <Link className="dropdown-item" to="/forgot-password">Parola uitata?</Link>
                  </div>
              </div>
          </div>
      </nav>
  );
}
export default Header;