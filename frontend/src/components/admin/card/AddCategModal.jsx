import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const AddCategoryModal = ({ visible, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      onAddCategory({ name: categoryName.trim() });
      setCategoryName('');
      onClose()
      
    }
  };

  return (
    <Modal
      title="Add Category"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="addCategory" type="primary" onClick={handleAddCategory}>
          Add Category
        </Button>,
      ]}
    >
      <div>
        <label>Name:</label>
        <Input value={categoryName} onChange={handleInputChange} />
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
