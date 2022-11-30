import React from "react";

function SortingBox() {
  return (
    <div className="box-border">
      <span className="text-sortby">Sort by:</span>
      <div className="dropdown dropdown-sort">
        <button
          className="btn dropdown-toggle"
          id="dropdownSort2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-display="static"
        >
          <span>Newest Post</span>
          <i className="fi-rr-angle-small-down"></i>
        </button>
        <ul
          className="dropdown-menu dropdown-menu-light"
          aria-labelledby="dropdownSort2"
        >
          <li>
            <a className="dropdown-item active" href="#">
              Newest Post
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Oldest Post
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Salary
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortingBox;
