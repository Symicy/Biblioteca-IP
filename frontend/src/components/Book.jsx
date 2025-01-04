//dezactivare EsLint
/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";

/**
 * Book component
 * @param {Object} props - The properties object.
 * @param {Object} props.book - The book object.
 * @param {string} props.book.id - The unique identifier of the book.
 * @param {string} props.book.photoURL - The URL of the book's photo.
 * @param {string} props.book.title - The title of the book.
 * @param {string} props.book.authorId - The author ID of the book.
 * @param {string} props.book.isbnIssn - The ISBN/ISSN of the book.
 * @param {string} props.book.status - The status of the book.
 * @param {string} props.book.yearOfPublication - The publication year of the book.
 * @param {string} props.book.language - The language of the book.
 * @param {string} props.book.category - The category of the book.
 * @returns {JSX.Element} The rendered Book component.
 * @constructor
 */
const Book = ({ book, author , authors}) => {

    return (
        <Link to={`/books/${book.id}`} state ={{book, author, authors}} className="card" style={{textDecoration:'none'}}>
            <div className="card max-auto" style={{backgroundColor: "#6B5F57",color:"floralwhite"}}>
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={book.photoURL} className="img-fluid rounded-start" alt={book.title} />
                    </div>
                    <div className="col-md-9">
                        <div className="card-body">
                            <h3 className="card-title">{book.title}</h3>
                            <h5><span className="badge " style={{backgroundColor:"#49ADEB"}}>Nume autor:</span>  {author ? `${author.firstName} ${author.lastName}` : 'Nespecificat'}</h5>
                            <h5><span className="badge " style={{backgroundColor:"#49ADEB"}}>ISBN/ISSN:</span>  {book.isbnIssn}</h5>
                            <h5><span className="badge " style={{backgroundColor:"#49ADEB"}}>Status:</span>  {book.status}</h5>
                            <h5><span className="badge " style={{backgroundColor:"#49ADEB"}}>An publicare:</span>  {book.yearOfPublication}</h5>
                            <h5><span className="badge " style={{backgroundColor:"#49ADEB"}}>Limba:</span>  {book.language}</h5>
                            <h5><span className="badge " style={{backgroundColor:"#49ADEB"}}>Categorie:</span>  {book.category}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Book;