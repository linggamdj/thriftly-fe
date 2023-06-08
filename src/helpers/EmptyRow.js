import React from "react";
import ReactLoading from "react-loading";

const EmptyRow = (props) => {
    return (
        <tr>
            <td
                className="text-center fw-semibold green-color"
                colSpan={props.col}
            >
                <ReactLoading
                    type="bars"
                    width={100}
                    height={100}
                    color="grey"
                    className="mx-auto"
                ></ReactLoading>
            </td>
        </tr>
    );
};

export default EmptyRow;
