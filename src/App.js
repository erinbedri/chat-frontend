import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import NotFound from "./components/NotFound/NotFound";
import Loader from "./components/Loader/Loader";

import { useAuthContext } from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/ChatContext";

import AuthenticatedUser from "./AuthenticatedUser";

import "./App.css";

function App() {
    const { user, isLoading } = useAuthContext();

    return (
        <ChatContextProvider user={user}>
            <div className="App">
                <main>
                    <div className={isLoading ? "loading-mask" : ""}>
                        <Loader isLoading={isLoading} />
                    </div>

                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<AuthenticatedUser />}>
                            <Route path="/chats" element={<Chat />} />
                        </Route>

                        <Route element={<AuthenticatedUser />}>
                            <Route path="/profile" element={<Profile />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </ChatContextProvider>
    );
}

export default App;
