import React from "react";
import { Link } from "react-router-dom";

const FilterTag = () => {
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterTag"
        aria-expanded="true"
        aria-controls="filterTag"
      >
        Product Tags
      </div>
      <div className="card-body show" id="filterTag" >
        <Link to="/" className="btn btn-sm btn-outline-success me-2 mb-2">
          New
        </Link>
        <Link to="/" className="btn btn-sm btn-outline-danger me-2 mb-2" >
          Hot
        </Link>
       
      </div>
    </div>
  );
};

export default FilterTag;
