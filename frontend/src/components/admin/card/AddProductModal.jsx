import React, { Component } from "react";
import axios from "axios";
import { Modal, Form, Input, Button, Checkbox, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

class AddProductModal extends Component {
  state = {
    name: "",
    img: "",
    price: "",
    isNewPro: false,
    isHot: false,
    description: "",
    category: "",
    categories: [], // State variable to hold categories
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories/getallcategories`);
      const categories = response.data;
      this.setState({ categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  onFinish = () => {
    const { name, img, price, isNewPro, isHot, description, category } =
      this.state;
    const categoryAdd =category.name;
    const productData = {
      name,
      img,
      price,
      isNewPro,
      isHot,
      description,
      category,
    };
    console.log(productData);
    this.props.onAddProduct(productData);
    this.props.onClose();
  };

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleCheckboxChange = (name) => (checked) => {
    this.setState({ [name]: checked });
  };

  handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      this.setState({ img: imageData });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  render() {
    const { visible, onClose } = this.props;
    const { name, price, isNewPro, isHot, description,category, categories } =
      this.state;

    return (
      <Modal
        title="Add Product"
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

          <Form.Item label="Upload Image">
            <input
              type="file"
              accept="image/*"
              onChange={this.handleImageUpload}
              style={{ display: "none" }}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <Button
              icon={<UploadOutlined />}
              onClick={() => this.fileInput.click()}
            >
              Click to Upload
            </Button>
          </Form.Item>

          <Form.Item label="Price">
            <Input
              name="price"
              value={price}
              type="number"
              onChange={this.handleInputChange}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item label="Is New Product">
            <Checkbox
              name="isNewPro"
              checked={isNewPro}
              onChange={(e) =>
                this.handleCheckboxChange("isNewPro")(e.target.checked)
              }
            >
              Is New Product
            </Checkbox>
          </Form.Item>

          <Form.Item label="Is Hot">
            <Checkbox
              name="isHot"
              checked={isHot}
              onChange={(e) =>
                this.handleCheckboxChange("isHot")(e.target.checked)
              }
            >
              Is Hot
            </Checkbox>
          </Form.Item>

          <Form.Item label="Description">
            <TextArea
              name="description"
              value={description}
              onChange={this.handleInputChange}
              placeholder="Enter description"
            />
          </Form.Item>

          <Form.Item label="Category">
            <Select
              name="category"
              value={category}
              onChange={(value) => this.setState({ category: value })}
              placeholder="Select category"
            >
              {categories.map((cat) => (
                <Select.Option key={cat._id} value={cat.name}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default AddProductModal;
