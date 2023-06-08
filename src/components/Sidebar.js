import React from "react";
import { Link } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
import logo from "../assets/side-logo.png";

const Sidebar = () => {
    return (
        <>
            <div className="sidebar text-white shadow">
                <div className="header text-center">
                    <div className="list-item inline-block">
                        <Link to="/">
                            <img
                                src={logo}
                                className="custom-image-side mx-auto my-1 mb-2"
                                alt="#"
                            />
                        </Link>
                    </div>
                </div>

                <hr className="border border-white" />

                <div className="main text-white">
                    <div className="list-item">
                        <Link className="nav-link active" to="/">
                            <BsFillBagCheckFill
                                className="me-2 pb-1"
                                size={25}
                            ></BsFillBagCheckFill>
                            Products
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
