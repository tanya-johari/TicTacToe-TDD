import React from "react";

const Square = ({ value, onSquareClick }) => (
    <button className="square" onClick={onSquareClick}>
        {value}
    </button>
);

export default Square;