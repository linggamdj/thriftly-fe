import React from "react";
import { Routes, Route } from "react-router-dom";
import { Products, NotFound } from "../pages";

const MainContent = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="" element={<Products></Products>}></Route>
                <Route path="*" element={<NotFound></NotFound>} />
            </Routes>
        </div>
    );
};

export default MainContent;
