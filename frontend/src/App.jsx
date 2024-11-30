import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";

function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/books"}/>}/>
                <Route path="/books" element={<HomePage/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;