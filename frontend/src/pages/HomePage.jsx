import React, { useState, useEffect, useRef } from "react";
import { getBooksNoPagination, saveBook, updatePhoto } from "../api/bookService";
import { getAuthors, saveAuthor } from "../api/AuthorService";
import Header from "../components/Header.jsx";
import BookList from "../components/BookList.jsx";

function HomePage() {
    const fileBookRef = useRef();
    const [data, setData] = useState({});
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
                            <h4 className="modal-title">Adaugă carte</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleNewBook}>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Titlu:</span>
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
                                           aria-describedby="inputGroup-sizing-default" placeholder="Caută autor" />
                                    <select name="authorId" value={valuesBook.authorId} onChange={onchangeBook} className="form-control" required>
                                        <option value="">Selecteaza autor</option>
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
                                          id="inputGroup-sizing-default">Anul publicării:</span>
                                    <input type="number" value={valuesBook.yearOfPublication} name="yearOfPublication"
                                           onChange={onchangeBook} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                          id="inputGroup-sizing-default">Limbă:</span>
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
                                                   id="statusAvailable" value="Available"
                                                   checked={valuesBook.status === "Available"}
                                                   onChange={onchangeBook} required />
                                            <label className="form-check-label" htmlFor="statusAvailable">
                                                Disponibilă
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="status"
                                                   id="statusUnavailable" value="Unavailable"
                                                   checked={valuesBook.status === "Unavailable"}
                                                   onChange={onchangeBook} required />
                                            <label className="form-check-label" htmlFor="statusUnavailable">
                                                Indisponibilă
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFileBook" className="form-label">Adaugă copertă</label>
                                    <input className="form-control" type="file" id="formFileBook" ref={fileBookRef}
                                           name="photoURL" onChange={onchangeBookFile} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit" className="btn btn-primary">Save</button>
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
                            <h5 className="modal-title">Adaugă autor</h5>
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
                                    <span className="input-group-text" id="inputGroup-sizing-default">Data nașterii:</span>
                                    <input type="date" value={valuesAuthor.dateOfBirth} name="dateOfBirth"
                                           onChange={onchangeAuthor} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                          id="inputGroup-sizing-default">Data morții:</span>
                                    <input type="date" value={valuesAuthor.dateOfDeath} name="dateOfDeath"
                                           onChange={onchangeAuthor} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"
                                          id="inputGroup-sizing-default">Țară de origine:</span>
                                    <input type="text" value={valuesAuthor.country} name="country"
                                           onChange={onchangeAuthor} className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;