import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Modal, Input, Button } from "antd";

const CategoryList = ({ categories, onDeleteCategory, onUpdateCategory }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  console.log(categories);

  const handleUpdateCategory = (category) => {
    setEditedCategory(category);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditedCategory("");
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEditedCategory(value);
  };

  const handleUpdateCategorySubmit = async () => {
    try {
      await onUpdateCategory({ _id: categories._id, name: editedCategory });
      setIsModalVisible(false);
      console.log("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  

  const handleDeleteCategory = async (categoryID) => {
    setCategoryIdToDelete(categoryID);
    setIsDeleteModalVisible(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      await onDeleteCategory(categoryIdToDelete);
      setIsDeleteModalVisible(false);
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setCategoryIdToDelete("");
  };

  if (!categories || !categories.name) {
    return null; // Or handle the condition appropriately
  }

  return (
    <>
      <div className="card" key={categories.name}>
        <div className="card-body">
          <h5 className="card-title">{categories.name}</h5>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => handleUpdateCategory(categories.name)}
            >
              <FaRegEdit /> Update
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleDeleteCategory(categories._id)}
            >
              <MdDelete /> Delete
            </button>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <Modal
          title="Update Category"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="cancel" onClick={handleModalClose}>
              Cancel
            </Button>,
            <Button
              key="updateCategory"
              type="primary"
              onClick={handleUpdateCategorySubmit}
            >
              Update Category
            </Button>,
          ]}
        >
          <div>
            <label>Name:</label>
            <Input value={editedCategory} onChange={handleInputChange} />
          </div>
        </Modal>
      )}
      {isDeleteModalVisible && (
        <Modal
          title="Confirm Delete"
          visible={isDeleteModalVisible}
          onCancel={handleCancelDelete}
          footer={[
            <Button key="cancel" onClick={handleCancelDelete}>
              Cancel
            </Button>,
            <Button
              key="deleteCategory"
              type="primary"
              danger
              onClick={confirmDeleteCategory}
            >
              Confirm Delete
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this category?</p>
        </Modal>
      )}
    </>
  );
};

export default CategoryList;
