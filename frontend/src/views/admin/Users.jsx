import React, { lazy, Component } from "react";
import axios from "axios";
import AddUserModal from "../../components/admin/card/AddUserForm";
import { IoIosAddCircle } from "react-icons/io";
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const UserList = lazy(() => import("../../components/admin/card/userEdit"));


class UserListView extends Component {
  state = {
    users: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
    isModalVisible: false, // Initialize isModalVisible state
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getallusers`
      );
      const users = response.data;
      const totalItems = users.length;

      console.log(users);
      this.setState({ users, totalItems });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  onPageChanged = (page) => {
    // You might want to implement paging logic here if needed
    console.log(page);
    this.setState({ currentPage: page.currentPage });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };
  handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/delete/${userId}`);
      // Update the user list after deletion
      const updatedUsers = this.state.users.filter(
        (user) => user._id !== userId
      );
      this.setState((prevState) => ({
        users: updatedUsers,
        totalItems: prevState.totalItems - 1, // Update the total count
      }));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  handleUpdateUser = async (updatedUser) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/update/${updatedUser.id}`,
        updatedUser
      );
      // Update the user list after the update
      const updatedUsers = this.state.users.map((user) =>
        user._id === updatedUser.id ? updatedUser : user
      );
      this.setState({ users: updatedUsers });
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };
  handleAddUser = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register', userData`);
      const newUser = response.data.user; 
      //console.log(newUser)
      const updatedUsers = [...this.state.users, newUser]; 
  
      this.setState({
        users: updatedUsers,
        totalItems: updatedUsers.length,
        isModalVisible: false, 
      });
  
      console.log('User added successfully:', newUser);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  render() {
    const { users, totalItems, isModalVisible } = this.state;

    console.log(users);
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
                    <span className="text-warning">"Users"</span>
                  </span>
                  <span className="align-middle fw-bold">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      title="Add Product"
                      onClick={this.toggleModal} // Toggle modal visibility on button click
                    >
                      Add user
                      <IoIosAddCircle />
                    </button>
                  </span>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "list" &&
                  users.map((users, idx) => {
                    return (
                      <div key={idx} className="col-md-12">
                        <UserList
                          users={users}
                          onDeleteUser={this.handleDeleteUser}
                          onUpdateUser={this.handleUpdateUser}
                        />
                      </div>
                    );
                  })}
              </div>

              <hr />
              <div>
                {isModalVisible && (
                  <AddUserModal
                    visible={isModalVisible}
                    onClose={this.toggleModal}
                    onAddUser={this.handleAddUser}
                  />
                )}
              </div>
              <Paging
                totalRecords={totalItems} // Make sure this is correctly set
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

export default UserListView;
