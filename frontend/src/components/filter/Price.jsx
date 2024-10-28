import React, { useState } from "react";

const FilterPrice = ({ onFilterChange }) => {
  const [selectedPrices, setSelectedPrices] = useState([]);

  const handlePriceChange = (value) => {
    let updatedPrices = [...selectedPrices];
    if (updatedPrices.includes(value)) {
      updatedPrices = updatedPrices.filter((price) => price !== value);
    } else {
      updatedPrices.push(value);
    }
    setSelectedPrices(updatedPrices);
    onFilterChange(updatedPrices); // Send the selected price ranges back to parent
  };
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault1"
              checked={selectedPrices.includes("0-1000")}
              onChange={() => handlePriceChange("0-1000")}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              0 DT - 1000 DT <span className="text-muted">(4)</span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault1"
              checked={selectedPrices.includes("1000-3000")}
              onChange={() => handlePriceChange("1000-3000")}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              1000 DT - 3000 DT <span className="text-muted">(4)</span>
            </label>
          </div>
        </li>
        <li className="list-group-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault1"
              checked={selectedPrices.includes("3000-5000")}
              onChange={() => handlePriceChange("3000-5000")}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              3000 DT - 5000 DT <span className="text-muted">(4)</span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FilterPrice;
