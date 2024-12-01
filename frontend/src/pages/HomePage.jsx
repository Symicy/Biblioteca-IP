//dezactivare eslint
/* eslint-disable */
import React, {useState, useEffect} from "react";
import {getBooks, saveBook} from "../api/bookService";
import {HashRouter, Routes, Route, Navigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import BookList from "../components/BookList.jsx";

function HomePage()
{
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [userType, setUserType] = useState('guest');
    const [fileBook, setFileBook] = useState(undefined);
    const [valuesBook, setValuesBook] = useState({
        titlu: '',
        isbn_issn: '',
        autor_id: '',
        data_publicare: '',
        status: ''
    });


    const getAllBooks = async (page = 0, size = 10) =>
    {
        try
        {
            setCurrentPage(page);
            const {data} = await getBooks(page, size);
            setData(data);
            console.log(data);
        } catch (error)
        {
            console.error("Error getting books", error);
        }
    };

    const onchangeBook = (event) =>
    {
        setValuesBook({...valuesBook, [event.target.name]: event.target.value});
        console.log(valuesBook);
    }

    const onchangeBookFile = (event) =>
    {
        setFileBook(event.target.files[0]);
        console.log(fileBook);
    }

    const handleNewBook = async (event) =>
    {
        event.preventDefault();
        try
        {
            const respons = await saveBook(valuesBook);
            console.log(respons);
            //Reset form
            setValuesBook({
                titlu: '',
                isbn_issn: '',
                autor_id: '',
                data_publicare: '',
                status: ''
            });
        } catch (error)
        {
            console.error("Error saving book", error);
        }
    }
    useEffect(() =>
    {
        getAllBooks();
    }, []);

    return (
        <>

            <Header userType={userType} nbOfBooks={data.totalElements}/>
            <main className="main">
                <div className="container-fluid mt-3 mb-3">
                    <BookList data={data} currentPage={currentPage} getAllBooks={getAllBooks}/>
                </div>
            </main>

            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adaugare carte</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleNewBook}>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Nume:</span>
                                    <input type="text" name="titlu" value={valuesBook.titlu}
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Autor:</span>
                                    <input type="text" name="autor_id" value={valuesBook.autor_id}
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">ISBN/ISSN:</span>
                                    <input type="text" value={valuesBook.isbn_issn} name="isbn_issn"
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                          id="inputGroup-sizing-default">Data publicare:</span>
                                    <input type="text" value={valuesBook.data_publicare} name="data_publicare"
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Status:</span>
                                    <div className="d-flex mt-1 ms-3">
                                        <div className="form-check me-3">
                                            <input className="form-check-input" type="radio" name="status"
                                                   id="statusDisponibila" value="Disponibila"
                                                   checked={valuesBook.status === "Disponibila"}
                                                   onChange={onchangeBook} required/>
                                            <label className="form-check-label" htmlFor="statusDisponibila">
                                                Disponibila
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="status"
                                                   id="statusIndisponibila" value="Indisponibila"
                                                   checked={valuesBook.status === "Indisponibila"}
                                                   onChange={onchangeBook} required/>
                                            <label className="form-check-label" htmlFor="statusIndisponibila">
                                                Indisponibila
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFileBook" className="form-label">Adaugare poza carte</label>
                                    <input className="form-control" type="file" id="formFileBook" name="pozaURL"
                                           onChange={onchangeBookFile}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit" className="btn btn-primary">Salveaza</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;