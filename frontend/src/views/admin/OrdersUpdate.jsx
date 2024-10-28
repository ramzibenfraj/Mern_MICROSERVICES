import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineStop, AiOutlineCloseCircle } from "react-icons/ai";

const OrdersUpdate = () => {
  const [orders, setOrders] = useState([]);
  const [productsDetails, setProductsDetails] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("NewStatus");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/order/getorders`
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/order/update/${orderId}/status`, {
        status: newStatus,
      });
      fetchOrders(); // Refetch orders after updating status
    } catch (error) {
      console.error("Error updating order status:", error);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/produit/produits/${productId}`
        );
        setProductsDetails((prev) => ({
          ...prev,
          [productId]: response.data.product,
        }));
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProductsDetails((prev) => ({ ...prev, [productId]: null }));
      }
    };

    const fetchData = async () => {
      await fetchOrders();

      orders.forEach((order) => {
        order.products.forEach((product) => {
          if (!productsDetails[product.productId]) {
            fetchProductDetails(product.productId);
          }
        });
      });
    };

    fetchData();
  }, [orders, productsDetails]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Define icons for different statuses
  const statusIcons = {
    completed: <AiOutlineCheckCircle />,
    pending: <AiOutlineClockCircle />,
    processing: <AiOutlineClockCircle />,
    cancelled: <AiOutlineCloseCircle />,
  };

  return (
    <Container className="mb-3">
      <h4 className="my-3">Orders</h4>
      {orders.map((order) => (
        <Card key={order._id} className="mb-4">
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-bold">Order ID:</span> #{order._id}
              </div>
              <div>
                <span className="fw-bold">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleString()}
                <div className="mt-2">
                  <span className="fw-bold">Shipping Address:</span>{" "}
                  {order.shippingAddress}
                </div>
              </div>
              <div>
                <span className="fw-bold">Status:</span>{" "}
                <Form.Select value={selectedStatus} onChange={handleStatusChange}>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => updateOrderStatus(order._id, selectedStatus)}
                >
                  Update
                </button>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Row xs={1} md={2} className="g-4">
              {order.products.map((product) => {
                const productDetails = productsDetails[product.productId];
                return (
                  <Col key={product._id}>
                    <Card className="h-100">
                      <Card.Body className="d-flex align-items-center">
                        {productDetails && (
                          <>
                            <img
                              src={productDetails.img}
                              alt={productDetails.name}
                              className="me-3"
                              style={{ maxWidth: "100px" }}
                            />
                            <div>
                              <h6 className="mb-1">
                                Product: {productDetails.name}
                              </h6>
                              <p className="mb-1">
                                Quantity: {product.quantity}
                              </p>
                              <div className="d-flex align-items-center">
                                <span className="text-secondary me-2">
                                  Status: {order.status}
                                </span>
                                {statusIcons[order.status]}
                              </div>
                            </div>
                          </>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default OrdersUpdate;
