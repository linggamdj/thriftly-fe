import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Navbar, Sidebar, MainContent, LoginContent } from "./components";

function App() {
    const [loginStatus, setLoginStatus] = useState(false);

    const loginCbHandler = (result) => {
        setLoginStatus(result);
    };

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
        }
    }, [loginStatus]);

    return (
        <>
            {loginStatus ? (
                <>
                    <div className="container-sidebar">
                        <Sidebar></Sidebar>
                        <div className="main-content w-100">
                            <Navbar
                                loginStatus={loginStatus}
                                loginCbHandler={loginCbHandler}
                            ></Navbar>
                            <MainContent></MainContent>
                        </div>
                    </div>
                </>
            ) : (
                <LoginContent loginCbHandler={loginCbHandler}></LoginContent>
            )}
        </>
    );
}

export default App;
