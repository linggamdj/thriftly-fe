import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaUserTie, FaKey, FaLock } from "react-icons/fa";
import logo from "../../assets/hi-logo.png";
import Swal from "sweetalert2";
import { register } from "../../axios/userAxios";
import ReactLoading from "react-loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Register = (props) => {
    const { isLoginHandler } = props;

    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        profile_picture: "",
    });
    const [isLoading, setLoading] = useState(false);

    const submitHandler = () => {
        setLoading(true);

        if (
            form.username.length &&
            form.username.length &&
            form.password.length &&
            form.confirmPassword.length
        ) {
            register(form, isLoginHandler).then(() => setLoading(false));
        } else {
            Swal.fire("Register", "Please fill all the fields!", "error");
            setLoading(false);
            return;
        }
    };

    const loginHandler = () => {
        isLoginHandler(true);
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
                                Sign Up
                            </p>

                            <div className="col align-items-center mx-1 mx-md-4">
                                <div className="d-flex justify-content-center mb-4">
                                    <FaUserTie
                                        className="login-icon me-3 fa-fw"
                                        size={22}
                                    ></FaUserTie>
                                    <div className="form-outline w-50 mb-0">
                                        <label className="form-label">
                                            Full Name
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                setForm({
                                                    ...form,
                                                    name: e.target.value,
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
                                                    username:
                                                        e.target.value.toLowerCase(),
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

                                <div className="d-flex justify-content-center mb-4">
                                    <FaLock
                                        className="login-icon me-3 fa-fw"
                                        size={20}
                                    ></FaLock>
                                    <div className="form-outline w-50 mb-0">
                                        <label className="form-label">
                                            Confirm Password
                                        </label>
                                        <div className="d-inline">
                                            <input
                                                onChange={(e) => {
                                                    setForm({
                                                        ...form,
                                                        confirmPassword:
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
                                            className="register-btn btn text-white main-color btn-lg"
                                            type="submit"
                                            value="Register"
                                        />
                                    ) : (
                                        <div className="register-btn login-btn btn main-color btn-lg">
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
                                    {isLoading ? (
                                        <Skeleton height={36} />
                                    ) : (
                                        <p>
                                            Already have an account?
                                            <Link
                                                onClick={() => loginHandler()}
                                                className="fw-semibold text-decoration-none"
                                            >
                                                <span className="sign-link">
                                                    {" "}
                                                    Sign In
                                                </span>
                                            </Link>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
