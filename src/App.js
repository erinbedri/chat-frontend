import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";

import "./App.css";

function App() {
    return (
        <div className="App">
            <header></header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<h1>logout</h1>} />

                    <Route path="/profile" element={<Profile />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
