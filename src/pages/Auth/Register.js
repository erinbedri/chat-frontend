import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../context";

import { register } from "../../services/authService";
import Loader from "../../components/Loader/Loader";
import registerImage from "../../assets/images/register.png";
import "./auth.css";

export default function Register() {
    const navigate = useNavigate();

    const { saveUser } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

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

    const registerHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formData.password !== formData.rePassword) {
            setMessage("Passwords do not match");

            setTimeout(() => {
                setMessage("");
            }, 5000);

            setIsLoading(false);
            return;
        }

        try {
            const response = await register(formData.email, formData.password);

            if (response.status === 201) {
                setFormData({
                    email: "",
                    password: "",
                    rePassword: "",
                });

                const user = await response.json();

                saveUser(user.user);
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
                <Loader isLoading={isLoading} />
            </div>

            {message && <div className="message-container">{message}</div>}

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
