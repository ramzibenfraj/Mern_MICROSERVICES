import React, { lazy, Component } from "react";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
import CategoryList from "../../components/admin/card/CategoryList"; // Assuming CategoryList component exists
import AddCategoryModal from "../../components/admin/card/AddCategModal"; // Assuming AddCategoryModal component exists
import Paging from "../../components/Paging"; // Assuming Paging component exists
import Breadcrumb from "../../components/Breadcrumb"; // Assuming Breadcrumb component exists

class CategoryListView extends Component {
  state = {
    categories: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
    isModalVisible: false,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/getallcategories`);
      const categories = response.data;
      console.log(categories)
      const totalItems = categories.length;
      console.log(totalItems)

      this.setState({ categories, totalItems });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  onPageChanged = (page) => {
    this.setState({ currentPage: page.currentPage });
  };

  handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/categories/delete/${categoryId}`);
      const updatedCategories = this.state.categories.filter(category => category._id !== categoryId);
      this.setState(prevState => ({
        categories: updatedCategories,
        totalItems: prevState.totalItems - 1,
      }));
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  handleUpdateCategory = async (updatedCategory) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/categories/update/${updatedCategory._id}`, updatedCategory);
      const updatedCategories = this.state.categories.map(category =>
        category._id === updatedCategory._id ? updatedCategory : category
      );
      this.setState({ categories: updatedCategories });
      console.log("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };

handleAddCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/categories/create`, categoryData);
    const newCategory = response.data.category;

    console.log('Category added successfully:', newCategory);

    // Update state to include the new category
    this.setState((prevState) => ({
      categories: [...prevState.categories, categoryData],
      totalItems: prevState.totalItems + 1,
      isModalVisible: false, // Close the modal after adding the category
    }));
  } catch (error) {
    console.error('Error adding category:', error);
  }
};


  render() {
    const { categories, totalItems, isModalVisible } = this.state;
    console.log(categories)

    return (
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Render the categories */}
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {totalItems} results for <span className="text-warning">"Categories"</span>
                  </span>
                  <span className="align-middle fw-bold">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      title="Add Category"
                      onClick={this.toggleModal}
                    >
                      Add Category <IoIosAddCircle />
                    </button>
                  </span>
                </div>
              </div>
              <hr />

              {/* Category List */}
              <div className="row g-3">
                {categories.map((category, idx) => (
                  <div key={idx} className="col-md-12">
                    <CategoryList
                      categories={category}
                      onDeleteCategory={this.handleDeleteCategory}
                      onUpdateCategory={this.handleUpdateCategory}
                    />
                  </div>
                ))}
              </div>

              {/* Add Category Modal */}
              {isModalVisible && (
                <AddCategoryModal
                  visible={isModalVisible}
                  onClose={this.toggleModal}
                  onAddCategory={this.handleAddCategory}
                />
              )}

              {/* Paging component */}
              <Paging
                totalRecords={totalItems}
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

export default CategoryListView;
