import React from "react";

const FilterSize = (props) => {
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterSize"
        aria-expanded="true"
        aria-controls="filterSize"
      >
        Size
      </div>
      <ul className="list-group list-group-flush show" id="filterSize">
        <li className="list-group-item">
          <div className="row g-0">
            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckSize1"
              />
              <label className="form-check-label" htmlFor="flexCheckSize1">
                4 <span className="text-muted">(GB)</span>
              </label>
            </div>

            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckSize4"
              />
              <label className="form-check-label" htmlFor="flexCheckSize4">
                6 <span className="text-muted">(GB)</span>
              </label>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row g-0">
            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckSize2"
              />
              <label className="form-check-label" htmlFor="flexCheckSize2">
                8 <span className="text-muted">(GB)</span>
              </label>
            </div>

            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckSize5"
              />
              <label className="form-check-label" htmlFor="flexCheckSize5">
                12 <span className="text-muted">(GB)</span>
              </label>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row g-0">
            <div className="form-check col">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckSize3"
              />
              <label className="form-check-label" htmlFor="flexCheckSize3">
                16 <span className="text-muted">(GB)</span>
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FilterSize;
