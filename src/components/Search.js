import React, { useRef } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
function Search() {
  let history = useHistory();
  const location = useLocation();
  const searchRef = useRef("");
  const handleSearchSubmit = () => {
    console.log(location);
    history.push({
      pathname: location.pathname,
      search: `?query=${searchRef.current.value}`,
      state: { detail: `${searchRef.current.value}` }
    });
  };
  return (
    <div className="searchWrapper">
      <SearchIcon className="searchWrapper__searchIcon" />
      <input ref={searchRef} type="text" placeholder="Search for songs..." />
      <Button onClick={handleSearchSubmit} variant="outline-info">
        Search
      </Button>
    </div>
  );
}

export default Search;
