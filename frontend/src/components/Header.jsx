import React from "react";

const Header = ({toggleModal, nbOfBooks}) => {
  return (
    <header className={'header'}>
        <div className={'container'}>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <h3>Book List({nbOfBooks})</h3>
                <button onClick={() => toggleModal(true)} type="button" className="btn btn-primary btn-lg">
                    Add Book
                </button>
            </div>
            </div>
    </header>
);
}
export default Header;