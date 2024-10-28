// data.js

import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3001/produit/getproduits');
    const { data: { produits } } = response;

    if (produits && produits.length > 0) {
      // Formater les produits selon la structure attendue
      const formattedProducts = produits.map((product, index) => ({
        id: index + 1,
        sku: `FAS-${index + 1}`,
        link: `/product/${product._id}`, // Adapter le lien vers le détail du produit
        name: product.name,
        img: product.image,
        price: product.prix,
        originPrice: product.prix, // Mettre à jour selon vos besoins
        discountPrice: 0, // Mettre à jour selon vos besoins
        discountPercentage: 0, // Mettre à jour selon vos besoins
        isNew: false, // Mettre à jour selon vos besoins
        isHot: false, // Mettre à jour selon vos besoins
        star: 0, // Mettre à jour selon vos besoins
        isFreeShipping: true, // Mettre à jour selon vos besoins
        description: product.description,
      }));

      return formattedProducts;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
