import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import Messages from "./pages/Messages/Messages";
import NotFound from "./components/NotFound/NotFound";
import Loader from "./components/Loader/Loader";

import { useGlobalContext } from "./contexts/context";
import AuthenticatedUser from "./AuthenticatedUser";

import "./App.css";

function App() {
    const { user, isLoading } = useGlobalContext();

    return (
        <div className="App">
            <main>
                <div className={isLoading ? "loading-mask" : ""}>
                    <Loader isLoading={isLoading} />
                </div>

                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/messages" element={<Messages />} />

                    <Route element={<AuthenticatedUser />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
