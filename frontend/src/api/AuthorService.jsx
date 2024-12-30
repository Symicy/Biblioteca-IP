import axios from "axios";

const AUTHOR_API_BASE_URL = "http://localhost:8080/authors";

export async function saveAuthor(author) {
    return await axios.post(AUTHOR_API_BASE_URL, author);
}

export async function getAuthorById(id) {
    return await axios.get(`${AUTHOR_API_BASE_URL}/${id}`);
}

export async function getAuthors()
{
    return await axios.get(AUTHOR_API_BASE_URL);
}