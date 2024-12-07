//dezactivare eslint
/* eslint-disable */
import React, {useState, useEffect, useRef} from "react";
import {getBooks, saveBook, updatePhoto} from "../api/bookService";
import {HashRouter, Routes, Route, Navigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import BookList from "../components/BookList.jsx";

/**
 * HomePage component
 * @returns {JSX.Element} The rendered HomePage component.
 * @constructor
 */
function HomePage()
{
    const fileBookRef = useRef();
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [userType, setUserType] = useState('guest');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [fileBook, setFileBook] = useState(undefined);
    const [valuesBook, setValuesBook] = useState({
        title: '',
        isbnIssn: '',
        authorId: '',
        yearOfPublication: '',
        status: '',
        language: '',
        category: ''
    });

    /**
     * Fetch all books for a given page
     * @param {number} [page=0] - The page number to fetch.
     * @param {number} [size=10] - The number of books per page.
     */
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

    /**
     * Handle change in book input fields
     * @param {Event} event - The input change event.
     */
    const onchangeBook = (event) =>
    {
        setValuesBook({...valuesBook, [event.target.name]: event.target.value});
        console.log(valuesBook);
    }

    /**
     * Handle change in book file input
     * @param {Event} event - The file input change event.
     */
    const onchangeBookFile = (event) =>
    {
        setFileBook(event.target.files[0]);
        console.log(fileBook);
    }

    /**
     * Handle new book form submission
     * @param {Event} event - The form submission event.
     */
    const handleNewBook = async (event) =>
    {
        event.preventDefault();
        try
        {
            const {data} = await saveBook(valuesBook);
            const formData = new FormData();
            formData.append("file", fileBook, fileBook.name);
            formData.append("id", data.id);
            const {data: photoURL}=await updatePhoto(formData);
            setFileBook(undefined);
            fileBookRef.current.value = null;
            console.log(photoURL);
            //Reset form
            setValuesBook({
                title: '',
                isbnIssn: '',
                authorId: '',
                yearOfPublication: '',
                status: '',
                language: '',
                category: ''
            });
            getAllBooks();
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
            <Header userType={userType} userEmail={userEmail} userUserName={userName} setUserType={setUserType} setUserName={setUserName} setUserEmail={setUserEmail} nbOfBooks={data.totalElements}/>
            <main className="main">
                <div className="container-fluid mt-3 mb-3">
                    <BookList data={data} currentPage={currentPage} getAllBooks={getAllBooks}/>
                </div>
            </main>

            {/* Modal */}
            {userType&&
                <div></div>
            }
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
                                    <input type="text" name="title" value={valuesBook.title}
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Autor:</span>
                                    <input type="text" name="authorId" value={valuesBook.authorId}
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">ISBN/ISSN:</span>
                                    <input type="text" value={valuesBook.isbnIssn} name="isbnIssn"
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                          id="inputGroup-sizing-default">An publicare:</span>
                                    <input type="text" value={valuesBook.yearOfPublication} name="yearOfPublication"
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                          id="inputGroup-sizing-default">Limba:</span>
                                    <input type="text" value={valuesBook.language} name="language"
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                          id="inputGroup-sizing-default">Categorie:</span>
                                    <input type="text" value={valuesBook.category} name="category"
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
                                    <input className="form-control" type="file" id="formFileBook" ref={fileBookRef}
                                           name="photoURL" onChange={onchangeBookFile} required/>
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