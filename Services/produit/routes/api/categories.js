const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

// Get all categories
router.get('/getallcategories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single category by ID
router.get('/getcategories/:id', getCategory, (req, res) => {
  res.json(res.category);
});

// Create a new category
router.post('/create', async (req, res) => {
  const category = new Category({
    name: req.body.name
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a category by ID
router.put('/update/:id', getCategory, async (req, res) => {
  if (req.body.name != null) {
    res.category.name = req.body.name;
  }

  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a category by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const categoryId = req.params.id; // Get the category ID from request parameters

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    res.json({ msg: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category by ID:', error);
    res.status(500).json({ msg: 'An error occurred while deleting the category' });
  }
});

// Middleware function to get category by ID
async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.category = category;
  next();
}

module.exports = router;
