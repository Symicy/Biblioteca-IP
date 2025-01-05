import axios from "axios";

const AUTHOR_API_BASE_URL = "http://localhost:8080/authors";

/**
 * Saves a new author.
 *
 * @param {Object} author - The author object to save.
 * @returns {Promise} - A promise that resolves to the response of the POST request.
 */
export async function saveAuthor(author) {
    return await axios.post(AUTHOR_API_BASE_URL, author);
}

/**
 * Retrieves an author by their unique identifier.
 *
 * @param {string} id - The unique identifier of the author.
 * @returns {Promise} - A promise that resolves to the response of the GET request.
 */
export async function getAuthorById(id) {
    return await axios.get(`${AUTHOR_API_BASE_URL}/${id}`);
}

/**
 * Retrieves all authors.
 *
 * @returns {Promise} - A promise that resolves to the response of the GET request.
 */
export async function getAuthors() {
    return await axios.get(AUTHOR_API_BASE_URL);
}