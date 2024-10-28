import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
//import { Modal } from "modal";
import { Input, Button, Modal } from "antd";

const CardProductList = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...props.data });
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setEditedProduct({
      ...editedProduct,
      [name]: newValue,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedProduct = { ...editedProduct };
      await props.onUpdateProduct(updatedProduct); // Call the passed down onUpdateProduct function

      setIsEditing(false);
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const { name, description, price, isNewPro, isHot } = editedProduct;

  const handleDelete = async () => {
    setIsDeleteModalVisible(true); // Show the delete confirmation modal
  };

  const confirmDeleteProduct = async () => {
    try {
      const productId = editedProduct._id;
      await props.onDeleteProduct(productId); // Call the passed down onDeleteProduct function
      setIsDeleteModalVisible(false); // Close the modal after successful deletion
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false); // Close the delete confirmation modal
  };

  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={editedProduct.img} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                  <>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isNew"
                        checked={isNewPro}
                        onChange={handleChange}
                        id="isNewCheckbox"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isNewCheckbox"
                      >
                        Is New
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isHot"
                        checked={isHot}
                        onChange={handleChange}
                        id="isHotCheckbox"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isHotCheckbox"
                      >
                        Is Hot
                      </label>
                    </div>
                  </>
                </>
              ) : (
                <>
                  <Link
                    to={editedProduct.link}
                    className="text-decoration-none"
                  >
                    {name}
                  </Link>

                  {!isEditing && isNewPro && (
                    <span className="badge bg-success position-absolute mt-2 ms-2">
                      New
                    </span>
                  )}
                  {!isEditing && isHot && (
                    <span className="badge bg-danger position-absolute top-0 end-0 mt-2 me-2">
                      Hot
                    </span>
                  )}
                </>
              )}
            </h6>
            {isEditing ? (
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                rows={3}
              />
            ) : (
              <p className="small mt-2">{description}</p>
            )}
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              {isEditing ? (
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleChange}
                />
              ) : (
                <span className="fw-bold h5">${price}</span>
              )}
            </div>

            <div className="btn-group d-flex" role="group">
              {isEditing ? (
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={handleSave}
                  title="Save changes"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    title="Update product"
                    onClick={handleEdit}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    title="Delete Product"
                    onClick={handleDelete}
                  >
                    <MdDelete />
                  </button>
                </>
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
                      key="deleteProduct"
                      type="primary"
                      danger
                      onClick={confirmDeleteProduct}
                    >
                      Confirm Delete
                    </Button>,
                  ]}
                >
                  <p>Are you sure you want to delete this product?</p>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
