import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { getBooks } from "./api/bookService";
import { Routes, Route, Navigate } from "react-router-dom";
import BookList from "./components/BookList";

function App() {
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal]=useState(false);
    const [userType, setUserType]=useState('guest');

    const getAllBooks = async (page = 0, size = 10) => {
        try {
            setCurrentPage(page);
            const { data } = await getBooks(page, size);
            setData(data);
            console.log(data);
        } catch (error) {
            console.error("Error getting books", error);
        }
    };

    const toggleModal=()=>{
        setShowModal(!showModal);
        console.log(showModal);
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <>
            <Header toggleModal={toggleModal} nbOfBooks={data.totalElements}/>
            <main className="main">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Navigate to="/books"/>}/>
                        <Route
                            path="/books"
                            element={<BookList data={data} currentPage={currentPage} getAllBooks={getAllBooks}/>}
                        />
                    </Routes>
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{display: "block", backgroundColor: "rgba(0,0,0,0.5)"}}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Adaugare carte</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={toggleModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Nume:</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default"/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Autor:</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">ISBN/ISSN:</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default"/>
                                    </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Data publicare:</span>
                                    <input type="text" className="form-control" aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">Adaugare poza carte</label>
                                    <input className="form-control" type="file" id="formFile"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={toggleModal}
                                >
                                    Inchide
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Salveaza
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
