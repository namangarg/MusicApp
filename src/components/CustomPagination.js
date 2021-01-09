import React, { useState, useEffect } from "react";
import "./Pagination.css";
import $ from "jquery";
import "./CustomPagination.css";

function CustomPagination({ showPerPage, onPaginationChange, total }) {
  const [counter, setCounter] = useState(1);
  //   const renderSongs= currentTodos.map((todo, index) => {
  //     return <li key={index}>{todo}</li>;
  //   });
  const [upperPageBound, setUpperPageBound] = useState(10);
  const [pageBound, setPageBound] = useState(10);
  const [lowerPageBound, setLowerPageBound] = useState(0);
  const [isPrevBtnActive, setIsPrevBtnActive] = useState("disabled");
  const [isNextBtnActive, setIsNextBtnActive] = useState("");

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / showPerPage); i++) {
    pageNumbers.push(i);
  }
  const setPrevAndNextBtnClass = listid => {
    let totalPage = Math.ceil(total / showPerPage);
    setIsPrevBtnActive("disabled");
    setIsNextBtnActive("disabled");
    if (totalPage === listid && totalPage > 1) {
      setIsPrevBtnActive("");
    } else if (listid === 1 && totalPage > 1) {
      setIsNextBtnActive("");
    } else if (totalPage > 1) {
      setIsPrevBtnActive("");
      setIsNextBtnActive("");
    }
  };
  function btnPrevClick() {
    if ((counter - 1) % pageBound === 0) {
      setUpperPageBound(upperPageBound - pageBound);
      setLowerPageBound(lowerPageBound - pageBound);
    }
    let listid = counter - 1;
    setCounter(listid);
    setPrevAndNextBtnClass(listid);
  }
  function btnIncrementClick() {
    setUpperPageBound(upperPageBound + pageBound);
    setLowerPageBound(lowerPageBound + pageBound);

    let listid = upperPageBound + pageBound;
    setCounter(listid);
    setPrevAndNextBtnClass(listid);
  }
  function btnDecrementClick() {
    setUpperPageBound(upperPageBound - pageBound);
    setLowerPageBound(lowerPageBound - pageBound);

    let listid = upperPageBound - pageBound;
    setCounter(listid);
    setPrevAndNextBtnClass(listid);
  }

  function btnNextClick() {
    if (counter + 1 > upperPageBound) {
      setUpperPageBound(upperPageBound + pageBound);
      setLowerPageBound(lowerPageBound + pageBound);
    }
    let listid = counter + 1;
    setCounter(listid);
    setPrevAndNextBtnClass(listid);
  }
  const handleClick = event => {
    let listid = Number(event.target.id);
    setCounter(listid);
    $("ul li.active").removeClass("active");
    $("ul li#" + listid).addClass("active");
    setPrevAndNextBtnClass(listid);
  };
  useEffect(() => {
    const value = counter * showPerPage;
    onPaginationChange(value - showPerPage, value);
    $("ul li.active").removeClass("active");
    $("ul li#" + counter).addClass("active");
    return () => {};
  }, [counter]);
  const renderPageNumbers = pageNumbers.map(number => {
    if (number === 1 && counter === 1) {
      return (
        <li key={number} className="page-item active" id={number}>
          <a className="page-link" id={number} onClick={handleClick}>
            {number}
          </a>
        </li>
      );
    } else if (number < upperPageBound + 1 && number > lowerPageBound) {
      return (
        <li className="page-item" key={number} id={number}>
          <a className="page-link" id={number} onClick={handleClick}>
            {number}
          </a>
        </li>
      );
    }
  });
  let pageIncrementBtn = null;
  if (pageNumbers.length > upperPageBound) {
    pageIncrementBtn = (
      <li className="">
        <a className="page-link" onClick={btnIncrementClick}>
          {" "}
          &hellip;{" "}
        </a>
      </li>
    );
  }
  let pageDecrementBtn = null;
  if (lowerPageBound >= 1) {
    pageDecrementBtn = (
      <li className="">
        <a className="page-link" onClick={btnDecrementClick}>
          {" "}
          &hellip;{" "}
        </a>
      </li>
    );
  }
  let renderPrevBtn = null;
  if (isPrevBtnActive === "disabled") {
    renderPrevBtn = (
      <li className={isPrevBtnActive}>
        <span className="page-link" id="btnPrev">
          {" "}
          Prev{" "}
        </span>
      </li>
    );
  } else {
    renderPrevBtn = (
      <li className={isPrevBtnActive}>
        <a className="page-link" id="btnPrev" onClick={btnPrevClick}>
          {" "}
          Prev{" "}
        </a>
      </li>
    );
  }
  let renderNextBtn = null;
  if (isNextBtnActive === "disabled") {
    renderNextBtn = (
      <li className={isNextBtnActive}>
        <span id="btnNext"> Next </span>
      </li>
    );
  } else {
    renderNextBtn = (
      <li className={isNextBtnActive}>
        <a className="page-link" id="btnNext" onClick={btnNextClick}>
          {" "}
          Next{" "}
        </a>
      </li>
    );
  }

  return (
    <div className="pagination_container">
      <ul className="pagination">
        {renderPrevBtn}
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        {renderNextBtn}
      </ul>
    </div>
  );
}

export default CustomPagination;
