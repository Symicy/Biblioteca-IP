import React, { useState, useEffect, useRef } from "react";
import { getBooksNoPagination, saveBook, updatePhoto } from "../api/bookService";
import { getAuthors } from "../api/AuthorService";
import BookList from "../components/BookList.jsx";
import { saveAuthor } from "../api/AuthorService.jsx";
import homePageImages from "../images/homePage.jpg";

/**
 * HomePage component for displaying the list of books and handling book and author creation.
 *
 * @param {Object} props - The component props.
 * @param {function} props.setNbOfBooks - Function to set the number of books.
 * @returns {JSX.Element} The rendered HomePage component.
 */
function HomePage({ setNbOfBooks }) {
    const fileBookRef = useRef();
    const [data, setData] = useState({});
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

    /**
     * Fetches all books without pagination.
     */
    const getAllBooksNoPagination = async () => {
        try {
            const { data } = await getBooksNoPagination();
            setData(data);
            setNbOfBooks(data.length);
            console.log(data);
        } catch (error) {
            console.error("Error getting books", error);
        }
    };

    /**
     * Fetches all authors.
     */
    const getAllAuthors = async () => {
        try {
            const { data } = await getAuthors();
            setAuthors(data);
        } catch (error) {
            console.error("Error getting authors", error);
        }
    };

    /**
     * Handles changes to the book input fields.
     *
     * @param {Object} event - The event object.
     */
    const onchangeBook = (event) => {
        setValuesBook({ ...valuesBook, [event.target.name]: event.target.value });
        console.log(valuesBook);
    };

    /**
     * Handles changes to the author input fields.
     *
     * @param {Object} event - The event object.
     */
    const onchangeAuthor = (event) => {
        setValuesAuthor({ ...valuesAuthor, [event.target.name]: event.target.value });
        console.log(valuesAuthor);
    };

    /**
     * Handles changes to the book file input.
     *
     * @param {Object} event - The event object.
     */
    const onchangeBookFile = (event) => {
        setFileBook(event.target.files[0]);
        console.log(fileBook);
    };

    /**
     * Handles the submission of a new book.
     *
     * @param {Object} event - The form submission event.
     */
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

    /**
     * Handles the submission of a new author.
     *
     * @param {Object} event - The form submission event.
     */
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
            <div
                style={{
                    backgroundImage: `url(${homePageImages})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    width: "100%",
                    color: ""
                }}
            >
                <main className="main">
                    <div className="container-fluid">
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
                                        <select name="authorId" value={valuesBook.authorId} onChange={onchangeBook}
                                                className="form-control" required>
                                            <option value="">Selecteaza autor</option>
                                            {filteredAuthors.map(author => (
                                                <option key={author.id} value={author.id}>
                                                    {author.firstName} {author.lastName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"
                                              id="inputGroup-sizing-default">ISBN/ISSN:</span>
                                        <input type="text" value={valuesBook.isbnIssn} name="isbnIssn"
                                               onChange={onchangeBook} className="form-control"
                                               aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-default" required />
                                    </div>
                                    <div className="input-group mb-3">
                                    <span className="input-group-text"
                                          id="inputGroup-sizing-default">Anul publicării:</span>
                                        <input type="number" value={valuesBook.yearOfPublication}
                                               name="yearOfPublication"
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
                                                       id="statusAvailable" value="Disponibilă"
                                                       checked={valuesBook.status === "Disponibilă"}
                                                       onChange={onchangeBook} required />
                                                <label className="form-check-label" htmlFor="statusAvailable">
                                                    Disponibilă
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="status"
                                                       id="statusUnavailable" value="Indisponibilă"
                                                       checked={valuesBook.status === "Indisponibilă"}
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
                                        <span className="input-group-text"
                                              id="inputGroup-sizing-default">Prenume:</span>
                                        <input type="text" name="firstName" value={valuesAuthor.firstName}
                                               onChange={onchangeAuthor} className="form-control"
                                               aria-label="Sizing example input"
                                               aria-describedby="inputGroup-sizing-default" required />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"
                                              id="inputGroup-sizing-default">Data nașterii:</span>
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
            </div>
        </>
    );
}

export default HomePage;