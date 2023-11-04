import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
    return (
        <div className="App">
            <main>
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />

                    <Route path="/login" element={<h1>Login</h1>} />

                    <Route path="/register" element={<h1>Register</h1>} />

                    <Route path="/logout" element={<h1>logout</h1>} />

                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
