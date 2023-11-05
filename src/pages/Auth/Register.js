import React from "react";
import { NavLink } from "react-router-dom";

import registerImage from "../../assets/images/register.png";
import "./auth.css";

export default function Register() {
    return (
        <>
            <div id="auth-container">
                <div className="auth-left">
                    <img src={registerImage} alt="register" />
                </div>

                <div className="auth-right">
                    <h1 className="text-dark">REGISTER</h1>
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
                        <div className="auth-form-group">
                            <label className="text-dark" htmlFor="rePassword">
                                Confirm Password
                            </label>
                            <input type="rePassword" id="rePassword" name="rePassword" required />
                        </div>
                        <button className="btn btn-dark" type="submit">
                            Register
                        </button>
                    </form>

                    <p>
                        If you have an account, please{" "}
                        <NavLink className="link-dark" to="/login">
                            login
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    );
}
