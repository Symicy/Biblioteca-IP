import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { getBooks } from "./api/bookService";
import { Routes, Route, Navigate } from "react-router-dom";
import BookList from "./components/BookList";

function App() {
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal]=useState(false);

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
                                <h5 className="modal-title">Titlu Modal</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={toggleModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Modal Content.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={toggleModal}
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Save Changes
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
