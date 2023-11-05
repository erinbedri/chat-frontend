import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import loginImage from "../../assets/images/login.png";
import "./auth.css";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setFormData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.type == "checkbox" ? e.target.checked : e.target.value,
        }));
    };

    const loginHandler = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <>
            <div id="auth-container">
                <div className="auth-left">
                    <NavLink to="/">
                        <img src={loginImage} alt="login" />
                    </NavLink>
                </div>

                <div className="auth-right">
                    <h1 className="text-dark">LOGIN</h1>
                    <form className="auth-form" onSubmit={loginHandler}>
                        <div className="auth-form-group">
                            <label className="text-dark" htmlFor="email">
                                <b>Email</b>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="john@doe.com"
                                value={formData.email}
                                onChange={changeHandler}
                                autoComplete="on"
                                required
                            />
                        </div>
                        <div className="auth-form-group">
                            <label className="text-dark" htmlFor="password">
                                <b>Password</b>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="******"
                                value={formData.password}
                                onChange={changeHandler}
                                autoComplete="on"
                                required
                            />
                        </div>
                        <button className="btn btn-dark" type="submit">
                            Login
                        </button>
                    </form>

                    <p>
                        If you do not have an account,{" "}
                        <NavLink className="link-dark" to="/register">
                            <b>register</b>
                        </NavLink>{" "}
                        first.
                    </p>
                </div>
            </div>
        </>
    );
}
