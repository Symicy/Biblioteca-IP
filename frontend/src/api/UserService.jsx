import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/users";
/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} The response data from the login request.
 * @throws {Error} If the credentials are invalid.
 */
export const login = async (email, password) => {
    try {
        const response = await axios.post('/api/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error('Invalid credentials');
    }
};

export async function saveUser(user) {
    return await axios.post(`${USER_API_BASE_URL}/register`, user);
}

export async function loginUser(email, password) {
    //return await axios.get(`${USER_API_BASE_URL}/${id}`);
    const response = await axios.post(`${USER_API_BASE_URL}/login`, { email, password },{
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}