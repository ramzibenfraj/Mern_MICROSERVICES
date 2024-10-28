const express = require('express');
const router = express.Router(); // Créez un routeur Express.

const config = require("config");
const ProduitModel = require('../../models/Produit'); // Modèle de Produit.

router.post("/addproduit", async (req, res) => {
    const {
        name,
        img,
        price,
        isNewPro,
        isHot,
        description,
        category
    } = req.body;

    // Check if the product with the same SKU or name already exists
   // const existingProductBySku = await ProduitModel.findOne({ sku });
    const existingProductByName = await ProduitModel.findOne({ name });

    if (existingProductByName) {
        return res.status(400).json({ msg: 'Product with same name already exists' });
    }

    const newProduct = new ProduitModel({
        name,
        img,
        price,
        isNewPro,
        isHot,
        description,
        category
    });

    try {
        // Save the new product to the database
        await newProduct.save();

        // Retrieve the newly added product
        const addedProduct = await ProduitModel.findOne({ name });

        res.json({
            produit: {
                id: addedProduct.id,
                name: addedProduct.name,
                img: addedProduct.img,
                price: addedProduct.price,
                isNewPro: addedProduct.isNewPro,
                isHot: addedProduct.isHot,
                description: addedProduct.description,
                category: addedProduct.category,
            },
        });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred while adding the product' });
    }
});

// Route pour récupérer tous les produits
router.get("/getproduits", async (req, res) => {
    try {
        const produits = await ProduitModel.find();

        res.json({ produits });
    } catch (error) {
        res.status(500).json({ msg: 'Une erreur s\'est produite lors de la récupération des produits' });
    }
});
router.get("/produits/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await ProduitModel.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ product });
    } catch (error) {
        console.error('Error fetching product by ID:', error); // Log the error for debugging purposes
        res.status(500).json({ msg: 'An error occurred while fetching the product' });
    }
});
router.delete("/delete/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await ProduitModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product by ID:', error);
        res.status(500).json({ msg: 'An error occurred while deleting the product' });
    }
});
router.put("/update/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const {
            name,
            img,
            price,
            isNewPro,
            isHot,
            description,
            category
        } = req.body;

        const updatedProduct = await ProduitModel.findByIdAndUpdate(
            productId,
            {
                name,
                img,
                price,
                isNewPro,
                isHot,
                description,
                category
            },
            { new: true } // Set { new: true } to return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ product: updatedProduct });
    } catch (error) {
        console.error('Error updating product by ID:', error);
        res.status(500).json({ msg: 'An error occurred while updating the product' });
    }
});


module.exports = router;
