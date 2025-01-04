import React, { useState } from "react";
import Book from "./Book.jsx";

const BookList = ({ books = [], authors = [] }) => {
    const [filters, setFilters] = useState({
        author: "",
        title: "",
        category: "",
        language: "",
        yearOfPublication: ""
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const booksPerPage = 12;

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
        setCurrentPage(1); // Reset to the first page when filter changes
    };

    const booksArray = Array.isArray(books) ? books : [];

    const filteredBooks = booksArray.filter((book) => {
        const author = authors.find((author) => author.id === book.authorId);
        const authorFullName = author ? `${author.firstName} ${author.lastName}`.toLowerCase() : "";

        return (
            (filters.author === "" || authorFullName.includes(filters.author.toLowerCase())) &&
            (filters.category === "" || book.category.toLowerCase().includes(filters.category.toLowerCase())) &&
            (filters.language === "" || book.language.toLowerCase().includes(filters.language.toLowerCase())) &&
            (filters.title === "" || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.yearOfPublication === "" || book.yearOfPublication.includes(filters.yearOfPublication))
        );
    });

    const booksWithAuthors = filteredBooks.map((book) => {
        const author = authors.find((author) => author.id === book.authorId);
        return { ...book, author };
    });

    const totalPages = Math.ceil(booksWithAuthors.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = booksWithAuthors.slice(startIndex, startIndex + booksPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <main className="main">
            <div className="container-fluid">
                <div className="row">
                    {isSidebarVisible && (
                        <div className="col-md-2 border border-primary" style={{ backgroundColor: "#49ACEA", color: "floralwhite", padding: "20px", height: "100vh", position: "fixed", left: "0", top:"70px" }}>
                            <h3>Filtreaza cartile</h3>
                            <div className="mb-3">
                                <strong>Numar de carti: {filteredBooks.length}</strong>
                            </div>
                            <div className="col">
                                <div className="col-md-8 mb-2">
                                    <label>Autor</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={filters.author}
                                        onChange={handleFilterChange}
                                        className="form-control form-control-sm"
                                    />
                                </div>
                                <div className="col-md-8 mb-2">
                                    <label>Titlu</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={filters.title}
                                        onChange={handleFilterChange}
                                        className="form-control form-control-sm"
                                    />
                                </div>
                                <div className="col-md-8 mb-2">
                                    <label>Categorie</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={filters.category}
                                        onChange={handleFilterChange}
                                        className="form-control form-control-sm"
                                    />
                                </div>
                                <div className="col-md-8 mb-2">
                                    <label>Limba</label>
                                    <input
                                        type="text"
                                        name="language"
                                        value={filters.language}
                                        onChange={handleFilterChange}
                                        className="form-control form-control-sm"
                                    />
                                </div>
                                <div className="col-md-8 mb-2">
                                    <label>An publicare</label>
                                    <input
                                        type="text"
                                        name="yearOfPublication"
                                        value={filters.yearOfPublication}
                                        onChange={handleFilterChange}
                                        className="form-control form-control-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <i
                        className={`fas fa-${isSidebarVisible ? "times" : "bars"} fa-2x mb-3 mt-5`}
                        onClick={toggleSidebar}
                        style={{
                            cursor: "pointer",
                            position: "fixed",
                            left: isSidebarVisible ? "255px" : "20px",
                            top: "50px",
                            zIndex: 1000,
                            color:"floralwhite"
                        }}
                    ></i>
                    <div className={`col-md-${isSidebarVisible ? "10 offset-md-2" : "12"}`}>
                        {currentBooks.length === 0 && <div>No books found</div>}

                        <div className="row ms-5 me-5 mb-5 mt-5">
                            {currentBooks.map((book) => (
                                <div className="col-md-4 mb-3" key={book.id}>
                                    <Book book={book} author={book.author} authors={authors} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {booksWithAuthors.length > 12 && (
                    <div className="pagination-container text-center mb-5">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="btn btn-primary"
                        >
                            Previous
                        </button>
                        <span className="mx-3">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="btn btn-primary"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default BookList;