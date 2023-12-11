import React from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import Navigation from "../../components/Navigation/Navigation";
import HomeImage from "../../assets/images/chat-home.svg";
import "./home.css";

export default function Home() {
    const { user } = useAuthContext();

    return (
        <>
            <Navigation />

            <div id="home-container" className="container">
                <div className="home-left">
                    <img className="home-image" src={HomeImage} alt="home-image" />
                </div>
                <div className="home-right">
                    <h1 className="text-dark">Harness the Power of Connection</h1>

                    <p>
                        Elevate your online conversations with our sleek and user-friendly chat application, designed
                        for seamless communication on the web.
                    </p>
                    <p>
                        Experience real-time connectivity and dynamic messaging features that bring your conversations
                        to life, whether you're chatting with friends, colleagues, or clients.
                    </p>
                    <p>
                        Empower your digital interactions with our secure and customizable chat platform, offering a
                        modern and engaging way to connect in the digital age.
                    </p>

                    {user ? (
                        <Link to="/chats" style={{ textDecoration: "none" }}>
                            <button className="btn btn-dark">Start a chat now</button>
                        </Link>
                    ) : (
                        <Link to="/register" className="btn btn-dark" style={{ textDecoration: "none" }}>
                            <button className="btn btn-dark">Register now for free</button>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
