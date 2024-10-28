import React, { lazy, Component } from "react";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const CardProduc = lazy(() =>
  import("../../components/admin/card/CardProduct")
);
const AddProductModal = lazy(() =>
  import("../../components/admin/card/AddProductModal")
);

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
    filteredProducts: [],
    isModalVisible: false,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/produit/getproduits`
      );
      const products = response.data;
      //console.log("Type of products:", typeof products);

      const firstKey = Object.keys(products)[0];
      const firstKeyValue = products[firstKey];
      const firstKeyValueLength = firstKeyValue.length;

      console.log(firstKeyValue);
      //console.log( firstKeyValueLength);

      this.setState({
        currentProducts: firstKeyValue,
        totalItems: firstKeyValueLength,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  onPageChanged = (page) => {
    let products = this.getProducts();
    console.log(products);
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

  handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/produit/delete/${productId}`);
      // After successful deletion, update the product list in state

      const updatedProducts = this.state.currentProducts.filter(
        (product) => product._id !== productId
      );

      this.setState({
        currentProducts: updatedProducts,
        totalItems: updatedProducts.length,
      });

      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  handleUpdateProduct = async (updatedProduct) => {
    try {
      const productId = updatedProduct._id;

      // Send updated product data to the server to perform an update
      await axios.put(
        `${process.env.REACT_APP_API_URL}/produit/update/${productId}`,
        updatedProduct
      );
      const updatedProducts = this.state.currentProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );

      this.setState({
        currentProducts: updatedProducts,
      });

      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };

  handleAddProduct = async (newProduct) => {
    try {
      // Send the new product data to the server for creation
      await axios.post(`${process.env.REACT_APP_API_URL}/produit/addproduit`, newProduct);

      // Fetch updated product list after addition
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/produit/getproduits`
      );
      const products = response.data;
      const firstKey = Object.keys(products)[0];
      const firstKeyValue = products[firstKey];

      this.setState({
        currentProducts: firstKeyValue,
        totalItems: firstKeyValue.length,
      });

      console.log("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  render() {
    const products = this.getProducts();
    //this.products.history.push('/product/detail/:id');
    console.log(products);

    return (
      <React.Fragment>
        <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/12.jpg)",
          }}
        ></div>
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.totalItems} results for{" "}
                    <span className="text-warning">"SmartPhone"</span>
                  </span>
                  <span className="align-middle fw-bold">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      title="Add Product"
                      onClick={this.toggleModal}
                    >
                      Add Product
                      <IoIosAddCircle />
                    </button>
                  </span>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "list" &&
                  products.map((product, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <CardProduc
                          data={product}
                          onDeleteProduct={this.handleDeleteProduct}
                          onUpdateProduct={this.handleUpdateProduct}
                        />
                      </div>
                    );
                  })}
              </div>
              <div>
                <AddProductModal
                  visible={this.state.isModalVisible}
                  onClose={this.toggleModal}
                  onAddProduct={this.handleAddProduct}
                />
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
