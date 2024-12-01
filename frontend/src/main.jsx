import ReactDOM, {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {StrictMode} from "react";

/**
 * Renders the App component into the root element of the HTML.
 * Uses React.StrictMode to highlight potential problems in the application.
 */
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)