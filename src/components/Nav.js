import React from "react";
import "./Nav.css";
import Search from "./Search";
import { Link } from "react-router-dom";

function Nav({ tabs, changeTab, active }) {
  return (
    <nav>
      <div className="navDetails">
        <div className="title">
          <span>Visual BI Music App</span>
        </div>
        <ul className="nav-links">
          {tabs.map(tab => (
            <li
              onClick={changeTab.bind(this, tab)}
              className={active === tab ? "activeTab" : ""}
            >
              <Link to={tab.link}> {tab.name}</Link>
            </li>
          ))}
        </ul>
        <Search />
      </div>
    </nav>
  );
}

export default Nav;
