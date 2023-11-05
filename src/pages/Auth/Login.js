import React from "react";
import { NavLink } from "react-router-dom";

import loginImage from "../../assets/images/login.png";
import "./auth.css";

export default function Login() {
    return (
        <>
            <div id="auth-container">
                <div className="auth-left">
                    <img src={loginImage} alt="login" />
                </div>

                <div className="auth-right">
                    <h1 className="text-dark">LOGIN</h1>
                    <form className="auth-form">
                        <div className="auth-form-group">
                            <label className="text-dark" htmlFor="email">
                                Email
                            </label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="auth-form-group">
                            <label className="text-dark" htmlFor="password">
                                Password
                            </label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button className="btn btn-dark" type="submit">
                            Login
                        </button>
                    </form>

                    <p>
                        If you do not have an account, please{" "}
                        <NavLink className="link-dark" to="/register">
                            register
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    );
}
