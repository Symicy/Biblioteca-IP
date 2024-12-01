//dezactivare EsLint
/* eslint-disable */

import React from "react";
import Book from "./Book.jsx";

/**
 * Book list component
 * @param data
 * @param currentPage
 * @param getAllBooks
 * @returns {Element}
 * @constructor
 */
const BookList = ({data, currentPage, getAllBooks}) => {
    /**
     * Handle page change
     * @param newPage
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