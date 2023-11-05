import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import registerImage from "../../assets/images/register.png";
import "./auth.css";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rePassword: "",
    });

    const changeHandler = (e) => {
        setFormData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.type == "checkbox" ? e.target.checked : e.target.value,
        }));
    };

    const registerHandler = (e) => {
        e.preventDefault();

        console.log(formData);
    };
    return (
        <>
            <div id="auth-container">
                <div className="auth-left">
                    <NavLink to="/">
                        <img src={registerImage} alt="register" />
                    </NavLink>
                </div>

                <div className="auth-right">
                    <h1 className="text-dark">REGISTER</h1>
                    <form className="auth-form" onSubmit={registerHandler}>
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
                        <div className="auth-form-group">
                            <label className="text-dark" htmlFor="rePassword">
                                <b>Confirm Password</b>
                            </label>
                            <input
                                type="password"
                                id="rePassword"
                                name="rePassword"
                                placeholder="******"
                                value={formData.rePassword}
                                onChange={changeHandler}
                                autoComplete="on"
                                required
                            />
                        </div>
                        <button className="btn btn-dark" type="submit">
                            Register
                        </button>
                    </form>

                    <p>
                        If you have an account,{" "}
                        <NavLink className="link-dark" to="/login">
                            <b>login</b>
                        </NavLink>{" "}
                        instead.
                    </p>
                </div>
            </div>
        </>
    );
}
