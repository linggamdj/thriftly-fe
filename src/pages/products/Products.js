import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
    getProducts,
    searchProduct,
    deleteProduct,
} from "../../axios/productAxios";
import AddModal from "../../components/AddModal";
import EditModal from "../../components/EditModal";
import { Button } from "react-bootstrap";
import EmptyRow from "../../helpers/EmptyRow";
import Pagination from "../../components/Pagination";
import MoneyFormat from "../../helpers/MoneyFormat";
import { APP_URL } from "../../helpers/Constants";
import TitleCase from "../../helpers/TitleCase";

const Products = () => {
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    useEffect(() => {
        setLoading(true);
        query.length !== 0
            ? searchProduct(query, (result) => {
                  setItems(result);
                  setLoading(false);
              })
            : getProducts((result) => {
                  setItems(result);
                  setLoading(false);
              });
    }, [query]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = items.slice(firstPostIndex, lastPostIndex);

    const showProducts = () => {
        if (isLoading) {
            return <EmptyRow col={7}></EmptyRow>;
        } else {
            return currentPosts.map((item, index) => {
                const { id, name, new_price, second_price, stock, image } =
                    item;

                return (
                    <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{TitleCase(name)}</td>
                        <td>{MoneyFormat(new_price)}</td>
                        <td>{MoneyFormat(second_price)}</td>
                        <td>{stock}</td>
                        <td>
                            <img
                                src={
                                    image
                                        ? `${APP_URL}${image}`
                                        : `${APP_URL}/public/uploads/img-placeholder.png`
                                }
                                width="150px"
                                className="img-thumbnail rounded"
                                alt="img"
                            />
                        </td>
                        <td>
                            <button
                                className="btn p-0 mb-1 me-2"
                                onClick={() => setEditModalShow(true)}
                            >
                                <AiFillEdit className="dark-color"></AiFillEdit>
                            </button>

                            <EditModal
                                id={+id}
                                show={editModalShow}
                                onHide={() => setEditModalShow(false)}
                            />

                            <button
                                className="btn p-0 mb-1"
                                onClick={() => deleteHandler(+id)}
                            >
                                <AiFillDelete className="red-color"></AiFillDelete>
                            </button>
                        </td>
                    </tr>
                );
            });
        }
    };

    const deleteHandler = (id) => {
        deleteProduct(id);
    };

    return (
        <>
            <section className="container">
                <h3
                    className="main-text my-4 text-center"
                    style={{
                        textShadow: "2px 1px 5px rgba(192,192,192,0.5)",
                    }}
                >
                    PRODUCTS
                </h3>
                <div className="d-flex justify-content-between">
                    <Button
                        className="btn btn-dark bg-main border-0 shadow-lg"
                        onClick={() => setAddModalShow(true)}
                    >
                        + Add
                    </Button>

                    <AddModal
                        show={addModalShow}
                        onHide={() => setAddModalShow(false)}
                    />

                    <div className="md-form mt-0">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search by Name"
                            aria-label="Search"
                            onChange={(e) => {
                                e.target.value.length !== 0
                                    ? setQuery(e.target.value)
                                    : setQuery("");
                            }}
                        />
                    </div>
                </div>
                <section className="d-flex justify-content-center">
                    <table className="table table-bordered text-center mt-2 shadow">
                        <thead className="align-middle">
                            <tr className="bg-main text-primary">
                                <th>No</th>
                                <th>Name</th>
                                <th>New Price</th>
                                <th>Second Price</th>
                                <th>Stock</th>
                                <th>Picture</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {currentPosts.length ? (
                                showProducts()
                            ) : (
                                <tr>
                                    <td
                                        className="fw-semibold main-text"
                                        colSpan={7}
                                    >
                                        Product not Found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                <Pagination
                    totalPosts={items.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </section>
        </>
    );
};

export default Products;
