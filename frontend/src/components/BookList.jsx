//dezactivare EsLint
/* eslint-disable */

import React from "react";
import Book from "./Book.jsx";

/**
 * Book list component
 * @param {Object} props - The properties object.
 * @param {Object} props.data - The data object containing book information.
 * @param {number} props.currentPage - The current page number.
 * @param {Function} props.getAllBooks - The function to fetch all books for a given page.
 * @returns {JSX.Element} The rendered BookList component.
 * @constructor
 */
const BookList = ({data, currentPage, getAllBooks}) => {
    /**
     * Handle page change
     * @param {number} newPage - The new page number to fetch.
     */
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < data.totalPages) {
            getAllBooks(newPage);
        }
    };

    /**
     * Render component
     */
    return(
        <main className={'main'}>
            {data?.content?.length===0 && <div>No books found</div>}

            <div className="row">
                {data?.content?.length > 0 && data.content.map(book => (
                    <div className="col-md-4 mb-3" key={book.id}>
                        <Book book={book}/>
                    </div>
                ))}
            </div>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className="pagination justify-content-center">
                    <button className="btn btn-primary" onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}>
                        Pagina anterioara
                    </button>

                    <p className="text-center">Pagina {currentPage + 1} din {data.totalPages}</p>
                    <button className="btn btn-primary" onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === data.totalPages - 1}>
                        Pagina urmatoare
                    </button>
                </div>
            }

        </main>
    )
}
export default BookList;