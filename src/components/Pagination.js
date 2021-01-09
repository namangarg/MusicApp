import React, { useState, useEffect } from "react";
import "./Pagination.css";

function Pagination({ showPerPage, onPaginationChange, total }) {
  const [counter, setCounter] = useState(1);
  //   const renderSongs= currentTodos.map((todo, index) => {
  //     return <li key={index}>{todo}</li>;
  //   });

  // Logic for displaying page numbers
  //   const pageNumbers = [];
  //   for (let i = 1; i <= Math.ceil(total / showPerPage); i++) {
  //     pageNumbers.push(i);
  //   }

  useEffect(() => {
    const value = counter * showPerPage;
    onPaginationChange(value - showPerPage, value);
    return () => {};
  }, [counter]);
  const onButtonClick = type => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage === 8)) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="paginationHeader">
      <button className="btn btn-primary" onClick={() => onButtonClick("prev")}>
        Previous
      </button>
      <button className="btn btn-primary" onClick={() => onButtonClick("next")}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
