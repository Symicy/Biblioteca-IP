//dezactivare EsLint
/* eslint-disable */
import React from "react";
import {Link} from "react-router-dom";

const Book=({book})=>{
    return(
        <Link to={`/books/${book.id}`} className="card">
            <div className="card max-auto">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={book.pozaURL} className="img-fluid rounded-start" alt={book.titlu}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{book.titlu}</h3>
                            <h4><span className="badge text-bg-secondary">Nume autor:</span>{book.autor_id}</h4>
                            <h4><span className="badge text-bg-secondary">ISBN/ISSN:</span>{book.isbn_issn}</h4>
                            <h4><span className="badge text-bg-secondary">Data publicare:</span>{book.data_publicare}</h4>
                            <h4><span className="badge text-bg-secondary">Status:</span>{book.status}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Book;