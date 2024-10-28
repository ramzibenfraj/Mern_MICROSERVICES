import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { BsFillPersonFill, BsFillEnvelopeFill, BsChatFill } from "react-icons/bs";

const ContactUsForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/mail/send-email", formData);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setShowSuccessModal(true);
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            <BsFillPersonFill /> Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <BsFillEnvelopeFill /> Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            <BsChatFill /> Message
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Message sent with success.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactUsForm;
