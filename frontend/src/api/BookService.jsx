import axios from "axios";

const BOOK_API_BASE_URL = "http://localhost:8080/books";

export async function saveBook(book) {
    return await axios.post(BOOK_API_BASE_URL, book);
}

export async function getBooks(page=0, size=10) {
    return await axios.get(`${BOOK_API_BASE_URL}?page=${page}&size=${size}`);
}

export async function getContact(id) {
    return await axios.get(`${BOOK_API_BASE_URL}/${id}`);
}

export async function updateBook(book) {
    return await axios.put(BOOK_API_BASE_URL, book);
}

export async function updatePhoto(formData) {
    return await axios.put(`${BOOK_API_BASE_URL}/photo`, formData);
}

export async function deleteBook(id) {
    return await axios.delete(`${BOOK_API_BASE_URL}/${id}`);
}