import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import { login } from "../../services/authService";
import loginImage from "../../assets/images/login.png";
import "./auth.css";

export default function Login() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

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

    const loginHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await login(formData.email, formData.password);

            setFormData({
                email: "",
                password: "",
            });

            if (response.status === 200) {
                const user = await response.json();
                navigate("/");
            } else {
                const message = await response.json();
                setMessage(message.msg);

                setTimeout(() => {
                    setMessage("");
                }, 5000);
            }

            setIsLoading(false);
        } catch (error) {
            setMessage(error.message);

            setTimeout(() => {
                setMessage("");
            }, 5000);

            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={isLoading ? "loading-mask" : ""}>
                <BounceLoader
                    color={"#3cc3bd"}
                    loading={isLoading}
                    size={50}
                    aria-label="Loading..."
                    data-testid="loader"
                />
            </div>

            {message && <div className="message-container">{message}</div>}

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
