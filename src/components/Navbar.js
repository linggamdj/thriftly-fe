import React, { useState, useEffect } from "react";
import { logout } from "../axios/userAxios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { getUserDetail } from "../axios/userAxios";
import { APP_URL } from "../helpers/Constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Navbar = (props) => {
    const { loginStatus, loginCbHandler } = props;
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(false);

    const navigation = useNavigate();

    useEffect(() => {
        setLoading(true);

        getUserDetail((result) => {
            setUser({ ...result });
            setLoading(false);
        });
    }, []);

    const logoutHandler = () => {
        logout(loginCbHandler);
        navigation("/users");
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm py-3">
            <div className="container-fluid">
                <ul className="navbar-nav ms-auto">
                    {loginStatus ? (
                        <li className="dropdown">
                            <Link
                                className="nav-link active p-0"
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-hover="dropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={
                                        user.profile_picture
                                            ? `${APP_URL}${user.profile_picture}`
                                            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                    }
                                    width="42"
                                    className="profile-image rounded-circle"
                                    alt="img"
                                />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end bg-custom">
                                {isLoading ? (
                                    <Skeleton height={28}></Skeleton>
                                ) : (
                                    <li className="dropdown-item">
                                        Hi, {user.username}!
                                    </li>
                                )}

                                <hr className="m-1" />
                                <li>
                                    <Link
                                        className="red-color dropdown-item dropdown-custom"
                                        onClick={() => logoutHandler()}
                                        to="/"
                                    >
                                        <FiLogOut
                                            className="me-1 mb-1 ms-0"
                                            size={20}
                                        ></FiLogOut>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        <Link className="nav-link active" to="/users/login">
                            Login
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
