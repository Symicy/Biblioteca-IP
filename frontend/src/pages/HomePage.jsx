import React, { useState, useEffect, useRef } from "react";
import {getBooks, getBooksNoPagination, saveBook, updatePhoto} from "../api/bookService";
import { getAuthors } from "../api/AuthorService";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import BookList from "../components/BookList.jsx";
import { saveAuthor } from "../api/AuthorService.jsx";

function HomePage() {
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
    const [valuesAuthor, setValuesAuthor] = useState({
        lastName: '',
        firstName: '',
        dateOfBirth: '',
        dateOfDeath: '',
        country: ''
    });
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getAllBooks = async (page = 0, size = 12) => {
        try {
            setCurrentPage(page);
            const { data } = await getBooks(page, size);
            setData(data);
            console.log(data);
        } catch (error) {
            console.error("Error getting books", error);
        }
    };

    const getAllBooksNoPagination = async () => {
        try {
            const { data } = await getBooksNoPagination();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error("Error getting books", error);
        }
    };

    const getAllAuthors = async () => {
        try {
            const { data } = await getAuthors();
            setAuthors(data);
        } catch (error) {
            console.error("Error getting authors", error);
        }
    };

    const onchangeBook = (event) => {
        setValuesBook({ ...valuesBook, [event.target.name]: event.target.value });
        console.log(valuesBook);
    };

    const onchangeAuthor = (event) => {
        setValuesAuthor({ ...valuesAuthor, [event.target.name]: event.target.value });
        console.log(valuesAuthor);
    };

    const onchangeBookFile = (event) => {
        setFileBook(event.target.files[0]);
        console.log(fileBook);
    };

    const handleNewBook = async (event) => {
        event.preventDefault();
        try {
            const { data } = await saveBook(valuesBook);
            const formData = new FormData();
            formData.append("file", fileBook, fileBook.name);
            formData.append("id", data.id);
            const { data: photoURL } = await updatePhoto(formData);
            setFileBook(undefined);
            fileBookRef.current.value = null;
            console.log(photoURL);
            setValuesBook({
                title: '',
                isbnIssn: '',
                authorId: '',
                yearOfPublication: '',
                status: '',
                language: '',
                category: ''
            });
            //getAllBooks();
            getAllBooksNoPagination();
        } catch (error) {
            console.error("Error saving book", error);
        }
    };

    const handleNewAuthor = async (event) => {
        console.log(valuesAuthor);
        event.preventDefault();
        try {
            const { data } = await saveAuthor(valuesAuthor);
            console.log(valuesAuthor);
            setValuesAuthor({
                lastName: '',
                firstName: '',
                dateOfBirth: '',
                dateOfDeath: '',
                country: ''
            });
        } catch (error) {
            console.error("Error saving author", error);
        }
    };

    useEffect(() => {
        //getAllBooks();
        getAllBooksNoPagination();
        getAllAuthors();
    }, []);

    const filteredAuthors = authors.filter(author =>
        `${author.firstName} ${author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header userType={userType} userEmail={userEmail} userName={userName} setUserType={setUserType}
                setUserName={setUserName} setUserEmail={setUserEmail} nbOfBooks={data.totalElements} />
            <main className="main">
                <div className="container-fluid mt-3 mb-3">
                    <BookList books={data} authors={authors} />
                </div>
            </main>

            <div className="modal fade" id="addBookBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
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
                                        aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Autor:</span>
                                    <input type="text" name="searchTerm" value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" placeholder="Search author" />
                                    <select name="authorId" value={valuesBook.authorId} onChange={onchangeBook} className="form-control" required>
                                        <option value="">Select Author</option>
                                        {filteredAuthors.map(author => (
                                            <option key={author.id} value={author.id}>
                                                {author.firstName} {author.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">ISBN/ISSN:</span>
                                    <input type="text" value={valuesBook.isbnIssn} name="isbnIssn"
                                        onChange={onchangeBook} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                        id="inputGroup-sizing-default">An publicare:</span>
                                    <input type="text" value={valuesBook.yearOfPublication} name="yearOfPublication"
                                        onChange={onchangeBook} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                        id="inputGroup-sizing-default">Limba:</span>
                                    <input type="text" value={valuesBook.language} name="language"
                                        onChange={onchangeBook} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                        id="inputGroup-sizing-default">Categorie:</span>
                                    <input type="text" value={valuesBook.category} name="category"
                                        onChange={onchangeBook} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Status:</span>
                                    <div className="d-flex mt-1 ms-3">
                                        <div className="form-check me-3">
                                            <input className="form-check-input" type="radio" name="status"
                                                id="statusDisponibila" value="Disponibila"
                                                checked={valuesBook.status === "Disponibila"}
                                                onChange={onchangeBook} required />
                                            <label className="form-check-label" htmlFor="statusDisponibila">
                                                Disponibila
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="status"
                                                id="statusIndisponibila" value="Indisponibila"
                                                checked={valuesBook.status === "Indisponibila"}
                                                onChange={onchangeBook} required />
                                            <label className="form-check-label" htmlFor="statusIndisponibila">
                                                Indisponibila
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFileBook" className="form-label">Adaugare poza carte</label>
                                    <input className="form-control" type="file" id="formFileBook" ref={fileBookRef}
                                        name="photoURL" onChange={onchangeBookFile} required />
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

            <div className="modal fade" id="addAuthorBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Adaugare autor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleNewAuthor}>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Nume:</span>
                                    <input type="text" name="lastName" value={valuesAuthor.lastName}
                                        onChange={onchangeAuthor} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Prenume:</span>
                                    <input type="text" name="firstName" value={valuesAuthor.firstName}
                                        onChange={onchangeAuthor} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Data nasterii:</span>
                                    <input type="text" value={valuesAuthor.dateOfBirth} name="dateOfBirth"
                                        onChange={onchangeAuthor} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                        id="inputGroup-sizing-default">Data decesului:</span>
                                    <input type="text" value={valuesAuthor.dateOfDeath} name="dateOfDeath"
                                        onChange={onchangeAuthor} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                        id="inputGroup-sizing-default">Tara:</span>
                                    <input type="text" value={valuesAuthor.country} name="country"
                                        onChange={onchangeAuthor} className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" required />
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