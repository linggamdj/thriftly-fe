import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";

const URL = `${API_URL}/products`;
let isLoading = false;

const getProducts = async (cb) => {
    try {
        let result = await axios({
            method: "GET",
            url: `${URL}`,
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

const getProductById = async (id, cb) => {
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

const searchProduct = async (query, cb) => {
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

const addProduct = async (data) => {
    try {
        isLoading = true;
        await axios({
            method: "POST",
            url: `${URL}/create`,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.getItem("access_token"),
            },
        }).then(() => {
            isLoading = false;
            if (!isLoading) {
                Swal.fire(
                    "Add Product",
                    "Product has been added",
                    "success"
                ).then((result) => {
                    if (result.isConfirmed) window.location.reload();
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

const editProduct = async (id, data) => {
    try {
        isLoading = true;

        await axios({
            method: "PUT",
            url: `${URL}/update/${id}`,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token: localStorage.getItem("access_token"),
            },
        }).then(() => {
            isLoading = false;

            if (!isLoading) {
                Swal.fire(
                    "Edit Product",
                    "Product has been updated",
                    "success"
                ).then((result) => {
                    if (result.isConfirmed) window.location.reload();
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

const deleteProduct = async (id) => {
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
                await axios({
                    method: "DELETE",
                    url: `${URL}/delete/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token"),
                    },
                });

                Swal.fire(
                    "Deleted!",
                    "Product has been deleted.",
                    "success"
                ).then((result) => {
                    if (result.isConfirmed) window.location.reload();
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

export {
    getProducts,
    getProductById,
    searchProduct,
    addProduct,
    editProduct,
    deleteProduct,
};
