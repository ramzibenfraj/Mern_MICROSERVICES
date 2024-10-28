import React, { lazy, Component } from "react";
import axios from "axios"; 
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
    filteredProducts: [],
    filterNew: false,
    filterHot: false,
  };

  async componentDidMount() {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log(apiUrl);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/produit/getproduits`);
      const products = response.data;
      //console.log("Type of products:", typeof products);

      const firstKey = Object.keys(products)[0];
      const firstKeyValue = products[firstKey];
      const firstKeyValueLength = firstKeyValue.length;

      console.log( firstKeyValue);
      //console.log( firstKeyValueLength);

      this.setState({ currentProducts: firstKeyValue, totalItems: firstKeyValueLength });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  
  

  onPageChanged = (page) => {
    
    let products = this.getProducts();
    console.log(products)
    const { currentPage, totalPages, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };
  

  getProducts = () => {
    return this.state.currentProducts;
  };
  handlePriceFilterChange = (selectedPrices) => {
    const { currentProducts } = this.state;
  
    const filteredProducts = currentProducts.filter((product) => {
      const productPrice = product.price; // Assuming 'price' is the key for the product price
  
      // Check each selected price range and filter accordingly
      for (const selectedPrice of selectedPrices) {
        if (selectedPrice === "0-1000") {
          if (productPrice >= 0 && productPrice <= 1000) {
            return true;
          }
        } else if (selectedPrice === "1000-3000") {
          if (productPrice > 1000 && productPrice <= 3000) {
            return true;
          }
        } else if (selectedPrice === "3000-5000") {
          if (productPrice > 3000 && productPrice <= 5000) {
            return true;
          }
        }
        // Add other conditions for additional price ranges as needed
      }
      return false; // Return false for products that don't match any price range
    });
  
    this.setState({ filteredProducts });
  };

  

  render() {
    const productsToDisplay =
      this.state.filteredProducts.length > 0
        ? this.state.filteredProducts
        : this.state.currentProducts;

    return (
      <React.Fragment>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/12.jpg)",
          }}
        >
        </div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterPrice onFilterChange={this.handlePriceFilterChange} />
              <FilterTag  />
              <FilterClear />
              <CardServices />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.totalItems} results for{" "}
                    <span className="text-warning">"SmartPhone"</span>
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">
                  <select
                    className="form-select mw-180 float-start"
                    aria-label="Default select"
                  >
                    <option value={1}>Most Popular</option>
                    <option value={2}>Latest items</option>
                    <option value={3}>Trending</option>
                    <option value={4}>Price low to high</option>
                    <option value={4}>Price high to low</option>
                  </select>
                  <div className="btn-group ms-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${
                        this.state.view === "grid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-grid" />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${
                        this.state.view === "list"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                    >
                      <i className="bi bi-list" />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
              {this.state.view === "grid" &&
                  productsToDisplay.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-4">
                        <CardProductGrid data={product} />
                      </div>
                    );
                  })}
                {this.state.view === "list" &&
                  productsToDisplay.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProductList data={product} />
                      </div>
                    );
                })}
              </div>
              <hr />
              <Paging
                totalRecords={this.state.totalItems} // Make sure this is correctly set
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
