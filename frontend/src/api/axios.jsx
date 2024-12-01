import axios from 'axios';

/**
 * Creates an Axios instance with a predefined base URL.
 *
 * @returns {AxiosInstance} The Axios instance configured with the base URL.
 */
export default axios.create({
    baseURL: 'http://localhost:3306'
});