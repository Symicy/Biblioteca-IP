import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {deleteBook, updateBook} from "../api/BookService.jsx";

const BookDetail = ({userType}) => {
    const location = useLocation();
    const { book, authors } = location.state ? location.state : {};
    const [isEditing, setIsEditing] = useState(false);
    const [editableBook, setEditableBook] = useState(book);

    if (!book) {
        return <h1 className="text-center mt-4">Book not found</h1>;
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const updatedBook = {
                id : editableBook.id,
                title: editableBook.title,
                isbnIssn: editableBook.isbnIssn,
                authorId: editableBook.authorId,
                yearOfPublication: editableBook.yearOfPublication,
                status: editableBook.status,
                language: editableBook.language,
                category: editableBook.category,
                photoURL: editableBook.photoURL
            };
            await updateBook(updatedBook);
            alert("Cartea a fost actualizată cu succes!");
            setIsEditing(false);
        } catch (error) {
            console.error("Eroare la actualizarea cărții:", error);
            alert("A apărut o eroare la actualizarea cărții.");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBook(book.id);
            alert("Cartea a fost ștearsă cu succes!");
            window.location.href = "/books";
        } catch (error) {
            console.error("Eroare la ștergerea cărții:", error);
            alert("A apărut o eroare la ștergerea cărții.");
        }
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card w-75 shadow-lg">
                <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <img
                            src={editableBook.photoURL ? editableBook.photoURL : "https://via.placeholder.com/300"}
                            alt={editableBook.title}
                            className="img-fluid rounded"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                {isEditing ? (
                                    <>
                                        <strong>Titlu:</strong>
                                        <input
                                            type="text"
                                            name="title"
                                            value={editableBook.title}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </>
                                ) : (
                                    editableBook.title
                                )}
                            </h2>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Autor:</strong> {isEditing ? (
                                    <select
                                        name="authorId"
                                        value={editableBook.authorId || ""}
                                        onChange={handleInputChange}
                                        className="form-select"
                                    >
                                        <option value="">Selectează autor</option>
                                        {authors && authors.map((author) => (
                                            <option key={author.id} value={author.id}>
                                                {author.firstName} {author.lastName}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    editableBook.author ? `${editableBook.author.firstName} ${editableBook.author.lastName}` : "Nespecificat"
                                )}
                                </li>
                                <li className="list-group-item">
                                    <strong>ISBN/ISSN:</strong> {isEditing ? (
                                    <input
                                        type="text"
                                        name="isbnIssn"
                                        value={editableBook.isbnIssn}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    editableBook.isbnIssn
                                )}
                                </li>
                                <li className="list-group-item">
                                    <strong>Status:</strong> {isEditing ? (
                                    <input
                                        type="text"
                                        name="status"
                                        value={editableBook.status}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    editableBook.status
                                )}
                                </li>
                                <li className="list-group-item">
                                    <strong>An publicare:</strong> {isEditing ? (
                                    <input
                                        type="text"
                                        name="yearOfPublication"
                                        value={editableBook.yearOfPublication}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    editableBook.yearOfPublication
                                )}
                                </li>
                                <li className="list-group-item">
                                    <strong>Limba:</strong> {isEditing ? (
                                    <input
                                        type="text"
                                        name="language"
                                        value={editableBook.language}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    editableBook.language
                                )}
                                </li>
                                <li className="list-group-item">
                                    <strong>Categorie:</strong> {isEditing ? (
                                    <input
                                        type="text"
                                        name="category"
                                        value={editableBook.category}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                ) : (
                                    editableBook.category
                                )}
                                </li>
                            </ul>
                            {userType === "admin" &&
                                <div className="mt-4 d-flex justify-content-around">
                                    {isEditing ? (
                                        <button
                                            onClick={handleSave}
                                            className="btn btn-success"
                                        >
                                            Salvează
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleEditToggle}
                                            className="btn btn-primary"
                                        >
                                            Editare
                                        </button>
                                    )}
                                    {isEditing ? (
                                        <button
                                            onClick={handleEditToggle}
                                            className="btn btn-danger"
                                        >
                                            Renunță
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleDelete}
                                            className="btn btn-danger"
                                        >
                                            Ștergere
                                        </button>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
