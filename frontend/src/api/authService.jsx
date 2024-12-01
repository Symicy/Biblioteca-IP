import axios from 'axios';

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