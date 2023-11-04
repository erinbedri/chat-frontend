import React from "react";
import { NavLink } from "react-router-dom";

import notFound from "../../assets/images/not-found.png";
import "./not-found.css";

export default function NotFound() {
    return (
        <div id="not-found-container">
            <NavLink className="link-dark" to="/">
                <h2>Go to Home</h2>
            </NavLink>
        </div>
    );
}
