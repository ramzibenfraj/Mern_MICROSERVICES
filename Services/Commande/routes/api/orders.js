const express = require('express');
const router = express.Router();
const Order = require('../../models/Order'); // Assurez-vous que le chemin vers le modèle est correct

router.post('/addorder', async (req, res) => {
    try {
      const { userId, shippingAddress, products } = req.body;
      console.log('userId:', userId);
      console.log('shippingAddress:', shippingAddress);
      console.log('products:', products);
  
      if (!userId || !shippingAddress || !products) {
        return res.status(400).json({ message: 'Des informations manquantes pour créer la commande' });
      }
  
      const newOrder = new Order({
        userId,
        shippingAddress,
        products,
      });
  
      const savedOrder = await newOrder.save();
  
      res.status(201).json({ message: 'Commande enregistrée avec succès', order: savedOrder });
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      res.status(500).json({ message: 'Erreur lors de la création de la commande', error });
    }
  });

  router.get('/getallorders/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Rechercher toutes les commandes pour l'ID d'utilisateur donné
      const userOrders = await Order.find({ userId });
  
      if (!userOrders || userOrders.length === 0) {
        return res.status(404).json({ message: 'Aucune commande trouvée pour cet utilisateur' });
      }
  
      res.status(200).json({ orders: userOrders });
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes pour l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des commandes pour l\'utilisateur', error });
    }
  });
  router.put('/update/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    try {
      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/getorders', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json({ orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
