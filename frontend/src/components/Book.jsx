//dezactivare EsLint
/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";

/**
 * Component for displaying a book card.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.book - The book object.
 * @param {Object} props.author - The author object.
 * @param {Array} props.authors - The list of authors.
 * @returns {JSX.Element} The rendered book card component.
 */
const Book = ({ book, author, authors }) => {
    return (
        <Link to={`/books/${book.id}`} state={{ book, author, authors }} className="card" style={{ textDecoration: 'none' }}>
            <div className="card max-auto" style={{ backgroundColor: "#6B5F57", color: "floralwhite" }}>
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={book.photoURL} className="img-fluid rounded-start" alt={book.title} />
                    </div>
                    <div className="col-md-9">
                        <div className="card-body">
                            <h3 className="card-title">{book.title}</h3>
                            <h5><span className="badge" style={{ backgroundColor: "#49ADEB" }}>Nume autor:</span> {author ? `${author.firstName} ${author.lastName}` : 'Nespecificat'}</h5>
                            <h5><span className="badge" style={{ backgroundColor: "#49ADEB" }}>ISBN/ISSN:</span> {book.isbnIssn}</h5>
                            <h5><span className="badge" style={{ backgroundColor: "#49ADEB" }}>Status:</span> {book.status}</h5>
                            <h5><span className="badge" style={{ backgroundColor: "#49ADEB" }}>An publicare:</span> {book.yearOfPublication}</h5>
                            <h5><span className="badge" style={{ backgroundColor: "#49ADEB" }}>Limba:</span> {book.language}</h5>
                            <h5><span className="badge" style={{ backgroundColor: "#49ADEB" }}>Categorie:</span> {book.category}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Book;