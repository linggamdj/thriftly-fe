import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";

const URL = `${API_URL}/users`;
let isLoading = false;

const getUsers = async (cb) => {
    try {
        let users = await axios({
            method: "GET",
            url: URL,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        });

        cb(users.data.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const getUserById = async (id, cb) => {
    try {
        let result = await axios({
            method: "GET",
            url: `${URL}/${id}`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        });

        cb(result.data.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const searchUser = async (query, cb) => {
    try {
        let result = await axios({
            method: "GET",
            url: `${URL}/search/${query}`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        });

        cb(result.data.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const getUserDetail = async (cb) => {
    try {
        let result = await axios({
            method: "GET",
            url: `${URL}/detail`,
            headers: {
                access_token: localStorage.getItem("access_token"),
            },
        });

        cb(result.data.data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const editUser = async (id, user) => {
    try {
        isLoading = true;

        await axios({
            method: "PUT",
            url: `${URL}/update/${id}`,
            data: user,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.getItem("access_token"),
            },
        }).then(() => {
            isLoading = false;

            if (!isLoading) {
                Swal.fire(
                    "Edit User ",
                    "User has been updated",
                    "success"
                ).then(() => {
                    window.location.reload();
                });
            }
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const deleteUser = async (id) => {
    try {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const userId = localStorage.getItem("user_id");
                await axios({
                    method: "DELETE",
                    url: `${URL}/delete/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token"),
                    },
                });

                Swal.fire("Delete User", "User has been deleted", "Success");
                if (id !== userId) {
                    window.location.reload();
                }
            }
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const login = async (user, cbHandler) => {
    try {
        let result = await axios({
            method: "POST",
            url: `${URL}/login`,
            data: user,
        });

        const access_token = result.data.data.access_token;
        localStorage.setItem("access_token", access_token);

        cbHandler(true);

        Swal.fire("Login", "Login Success", "success");
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response.status !== 500
                    ? `${error.response.data.message}`
                    : `Server Error`,
        });
    }
};

const register = async (user, cbHandler) => {
    if (user.password === user.confirmPassword) {
        try {
            await axios({
                method: "POST",
                url: `${URL}/register`,
                data: user,
            });

            Swal.fire("Register", "Register Success", "success").then(
                async (result) => {
                    if (result.isConfirmed) {
                        cbHandler(true);
                        window.location.reload();
                    }
                }
            );
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:
                    error.response.status !== 500
                        ? `${error.response.data.message}`
                        : `Server Error`,
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect Confirm Password",
        });
    }
};

const logout = async (cbHandler) => {
    localStorage.clear();
    cbHandler(false);

    Swal.fire("Logout", "Logout Success", "success");
};

export {
    getUsers,
    getUserById,
    searchUser,
    getUserDetail,
    login,
    register,
    logout,
    editUser,
    deleteUser,
};
