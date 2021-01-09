import React, { useRef } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function Search(props) {
  let history = useHistory();
  const searchRef = useRef("");
  const handleSearchSubmit = () => {
    history.push({
      pathname: "/allSongs",
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
