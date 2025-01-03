import axios from "axios";

const BOOK_API_BASE_URL = "http://localhost:8080/books";

/**
 * Saves a new book.
 *
 * @param {Object} book - The book to save.
 * @returns {Promise<Object>} The response data from the save request.
 */
export async function saveBook(book) {
    return await axios.post(BOOK_API_BASE_URL, book);
}


export async function getBooksNoPagination() {
    return await axios.get(`${BOOK_API_BASE_URL}/no-pagination`);
}

/**
 * Retrieves a book by its unique identifier.
 *
 * @param {string} id - The unique identifier of the book.
 * @returns {Promise<Object>} The response data from the get request.
 */
export async function getContact(id) {
    return await axios.get(`${BOOK_API_BASE_URL}/${id}`);
}

/**
 * Updates an existing book.
 *
 * @param {Object} book - The book to update.
 * @returns {Promise<Object>} The response data from the update request.
 */
export async function updateBook(book) {
    return await axios.put(BOOK_API_BASE_URL, book);
}

/**
 * Updates the photo of a book.
 *
 * @param {FormData} formData - The form data containing the photo to update.
 * @returns {Promise<Object>} The response data from the update request.
 */
export async function updatePhoto(formData) {
    return await axios.put(`${BOOK_API_BASE_URL}/photo`, formData);
}

/**
 * Deletes a book by its unique identifier.
 *
 * @param {string} id - The unique identifier of the book.
 * @returns {Promise<Object>} The response data from the delete request.
 */
export async function deleteBook(id) {
    return await axios.delete(`${BOOK_API_BASE_URL}/${id}`);
}