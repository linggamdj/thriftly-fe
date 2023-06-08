import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaKey } from "react-icons/fa";
import logo from "../../assets/hi-logo.png";
import { login } from "../../axios/userAxios";
import ReactLoading from "react-loading";

const Login = (props) => {
    const { loginCbHandler, isLoginHandler } = props;

    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setLoading] = useState(false);

    const navigation = useNavigate();

    const submitHandler = () => {
        setLoading(true);
        login(form, loginCbHandler).then(() => {
            setLoading(false);
        });

        if (!isLoading) {
            navigation("/");
        }
    };

    const registerHandler = () => {
        isLoginHandler(false);
        navigation("/");
    };

    return (
        <>
            <section className="section-login d-flex align-items-center">
                <div className="container col-lg-6 col-xl-6 col-xxl-4">
                    <div className="text-center mb-4">
                        <img src={logo} className="custom-image" alt="#" />
                    </div>
                    <div
                        className="card text-black pt-2"
                        style={{ borderRadius: "10px" }}
                    >
                        <div className="card-body">
                            <p className="text-center text-uppercase main-text h3 fw-bold mb-4 mt-2">
                                Sign In
                            </p>

                            <div className="col align-items-center mx-1 mx-md-4">
                                <div className="d-flex justify-content-center mb-4">
                                    <FaUserAlt
                                        className="login-icon me-3 fa-fw"
                                        size={20}
                                    ></FaUserAlt>
                                    <div className="form-outline w-50 mb-0">
                                        <label className="form-label">
                                            Username
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                setForm({
                                                    ...form,
                                                    username: e.target.value,
                                                });
                                            }}
                                            type="text"
                                            className="form-control"
                                            minLength="4"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mb-4">
                                    <FaKey
                                        className="login-icon me-3 fa-fw"
                                        size={20}
                                    ></FaKey>
                                    <div className="form-outline w-50 mb-0">
                                        <label className="form-label">
                                            Password
                                        </label>
                                        <div className="d-inline">
                                            <input
                                                onChange={(e) => {
                                                    setForm({
                                                        ...form,
                                                        password:
                                                            e.target.value,
                                                    });
                                                }}
                                                type="password"
                                                className="form-control"
                                                minLength="6"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center pt-2 mb-2">
                                    {!isLoading ? (
                                        <input
                                            onClick={() => submitHandler()}
                                            className="login-btn btn text-white main-color btn-lg"
                                            type="submit"
                                            value="Login"
                                        />
                                    ) : (
                                        <div className="login-btn btn main-color btn-lg">
                                            <ReactLoading
                                                type="bars"
                                                height={35}
                                                width={35}
                                                className="mx-auto"
                                            ></ReactLoading>
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex justify-content-center mt-2">
                                    <p>
                                        Don't have an account?
                                        <Link
                                            onClick={() => registerHandler()}
                                            className="fw-semibold text-decoration-none"
                                        >
                                            <span className="sign-link">
                                                {" "}
                                                Sign Up
                                            </span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
