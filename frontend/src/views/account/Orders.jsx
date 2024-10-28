import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineStop } from 'react-icons/ai';

const OrdersView = () => {
  const [orders, setOrders] = useState([]);
  const [productsDetails, setProductsDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = window.localStorage.getItem("userid");
        const userId1 = '6574ad25600c02d5459d45cf'; // Replace with your user ID
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/order/getallorders/${userId}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/produit/produits/${productId}`);
        setProductsDetails((prev) => ({ ...prev, [productId]: response.data.product }));
      } catch (error) {
        console.error('Error fetching product details:', error);
        setProductsDetails((prev) => ({ ...prev, [productId]: null }));
      }
    };

    orders.forEach((order) => {
      order.products.forEach((product) => {
        if (!productsDetails[product.productId]) {
          fetchProductDetails(product.productId);
        }
      });
    });
  }, [orders, productsDetails]);

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
                <span className="fw-bold">Date:</span> {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="mt-2">
              <span className="fw-bold">Shipping Address:</span> {order.shippingAddress}
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
                              style={{ maxWidth: '100px' }}
                            />
                            <div>
                              <h6 className="mb-1">Product: {productDetails.name}</h6>
                              <p className="mb-1">Quantity: {product.quantity}</p>
                              <div className="d-flex align-items-center">
                                <span className="text-secondary me-2">Status: {order.status}</span>
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

export default OrdersView;
