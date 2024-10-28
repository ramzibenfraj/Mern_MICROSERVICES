import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Modal, Input, Button } from "antd";

const UserList = ({ users, onDeleteUser, onUpdateUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "user",
  });

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const handleUpdateUser = (user) => {
    setEditedUser({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditedUser({
      id: "",
      name: "",
      email: "",
      role: "user",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleUpdateUserSubmit = async () => {
    try {
      await onUpdateUser(editedUser);
      setIsModalVisible(false);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const showDeleteModal = (userId) => {
    setUserIdToDelete(userId);
    setIsDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setUserIdToDelete("");
  };

  const confirmDeleteUser = async () => {
    try {
      await onDeleteUser(userIdToDelete);
      setIsDeleteModalVisible(false);
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="card" key={users._id}>
        <div className="card-body">
          <h5 className="card-title">{users.name}</h5>
          <p className="card-text">Email: {users.email}</p>
          <p className="card-text">Role: {users.role}</p>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => handleUpdateUser(users)}
            >
              <FaRegEdit /> Update
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => showDeleteModal(users._id)}
            >
              <MdDelete /> Delete
            </button>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <Modal
          title="Update User"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="cancel" onClick={handleModalClose}>
              Cancel
            </Button>,
            <Button
              key="updateUser"
              type="primary"
              onClick={handleUpdateUserSubmit}
            >
              Update User
            </Button>,
          ]}
        >
          <div>
            <label>Name:</label>
            <Input
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <Input
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Role:</label>
            <Input
              name="role"
              value={editedUser.role}
              onChange={handleInputChange}
              disabled
            />
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
              key="deleteUser"
              type="primary"
              danger
              onClick={confirmDeleteUser}
            >
              Confirm Delete
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      )}
    </>
  );
};

export default UserList;
