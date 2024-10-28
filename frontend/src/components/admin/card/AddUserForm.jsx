import React, { Component } from "react";
import { Modal, Form, Input, Button, Select } from "antd";

const { Option } = Select;

class AddUserModal extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  onFinish = () => {
    const { name, email, password, role } = this.state;
    const userData = { name, email, password, role };
    console.log(userData);
    this.props.onAddUser(userData);
    this.props.onClose();
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { visible, onClose } = this.props;
    const { name, email, password, role } = this.state;

    return (
      <Modal
        title="Add User"
        visible={visible}
        onCancel={onClose}
        footer={null}
      >
        <Form layout="vertical" onFinish={this.onFinish}>
          <Form.Item label="Name">
            <Input
              name="name"
              value={name}
              onChange={this.handleInputChange}
              placeholder="Enter name"
            />
          </Form.Item>

          <Form.Item label="Email">
            <Input
              name="email"
              value={email}
              onChange={this.handleInputChange}
              type="email"
              placeholder="Enter email"
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              name="password"
              value={password}
              onChange={this.handleInputChange}
              placeholder="Enter password"
            />
          </Form.Item>

          <Form.Item label="Role">
            <Select
              name="role"
              value={role}
              onChange={(value) => this.setState({ role: value })}
              placeholder="Select a role"
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddUserModal;
