import React, { useState } from "react";
import { addProduct } from "../axios/productAxios";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddModal = (props) => {
    const [form, setForm] = useState({
        name: "",
        new_price: 0,
        second_price: 0,
        stock: 0,
        image: null,
    });
    const [isLoading, setLoading] = useState(false);

    const uploadHandler = (image) => {
        const imgType = ["image/png", "image/jpeg"];

        if (!imgType.includes(image.type)) {
            Swal.fire("Add Item", "Only accepting PNG/JPG image!", "error");
            return;
        }

        if (image.size > 100000) {
            Swal.fire(
                "Add Item",
                "Image's size should be less than 100KB!",
                "error"
            );
            return;
        }

        setForm({ ...form, image: image });
    };

    const submitHandler = () => {
        setLoading(true);

        if (
            form.name.length &&
            form.new_price &&
            form.second_price &&
            form.stock
        ) {
            addProduct(form).then(() => {
                setLoading(false);
            });
        } else {
            Swal.fire("Add Item", "Please fill all required fields!", "error");
            setLoading(false);
            return;
        }
    };

    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className="main-text"
                    >
                        New Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="mx-auto p-2">
                        <div className="mb-3">
                            <label>Name</label>
                            {isLoading ? (
                                <Skeleton height={34}></Skeleton>
                            ) : (
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        });
                                    }}
                                    type="text"
                                    className="form-control"
                                    placeholder="Insert Name"
                                    required
                                />
                            )}
                        </div>

                        <div className="mb-3">
                            <label>New Price</label>
                            {isLoading ? (
                                <Skeleton height={34}></Skeleton>
                            ) : (
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            new_price: +e.target.value,
                                        });
                                    }}
                                    type="number"
                                    className="form-control"
                                    placeholder="Insert New Price"
                                    required
                                />
                            )}
                        </div>

                        <div className="mb-3">
                            <label>Second Price</label>
                            {isLoading ? (
                                <Skeleton height={34}></Skeleton>
                            ) : (
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            second_price: +e.target.value,
                                        });
                                    }}
                                    type="number"
                                    className="form-control"
                                    placeholder="Insert Second Price"
                                    required
                                />
                            )}
                        </div>

                        <div className="mb-3">
                            <label>Stock</label>
                            {isLoading ? (
                                <Skeleton height={34}></Skeleton>
                            ) : (
                                <input
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            stock: +e.target.value,
                                        });
                                    }}
                                    type="number"
                                    className="form-control"
                                    placeholder="Insert Stock"
                                    required
                                />
                            )}
                        </div>

                        <div className="mb-3">
                            <label>Picture (Optional)</label>
                            {isLoading ? (
                                <Skeleton height={34}></Skeleton>
                            ) : (
                                <input
                                    placeholder="Select Pictures"
                                    onChange={(e) => {
                                        uploadHandler(e.target.files[0]);
                                    }}
                                    type="file"
                                    accept="image/png, image/jpg"
                                    className="form-control"
                                />
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => submitHandler()}
                        className="add-btn bg-main border-0 shadow-sm mx-auto"
                        type="button"
                    >
                        {isLoading ? (
                            <ReactLoading
                                type="bars"
                                width={30}
                                className="mx-auto"
                            ></ReactLoading>
                        ) : (
                            "Add"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
