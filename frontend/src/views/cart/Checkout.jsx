import {  useSelector } from "react-redux";
import axios from "axios";
import React, { useState } from 'react';

const CheckoutView = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems)
  const totalPriceFromSession = JSON.parse(localStorage.getItem("totalPrice"));
  const id_user = window.localStorage.getItem("userid");
  console.log(id_user)
  const [shippingAddress, setShippingAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [zip, setZip] = useState("");

  const handlePlaceOrder = async () => {
    try {
      // Récupérer l'adresse de livraison depuis les champs de formulaire
      const address = `${shippingAddress} ${address2} ${zip}`; // Mettez vos champs de formulaire appropriés ici

      // Créer un tableau de produits avec les données nécessaires pour la commande
      const orderProducts = cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity, // Vous pouvez ajuster cela en fonction de votre logique, par exemple, récupérer la quantité du panier
      }));

      // Obtenir l'ID de l'utilisateur depuis la session ou le stockage local
      const userId = window.localStorage.getItem("userid");

      // Créer l'objet de commande avec les détails nécessaires
      const orderData = {
        userId,
        shippingAddress: address,
        products: orderProducts,
      };

      // Envoyer la requête POST à votre API pour créer la commande
      const response = await axios.post('http://localhost:3001/order/addorder', orderData);
      
      // Afficher la réponse de la création de commande
      console.log(response.data);
      window.location.href = '/account/orders';
      // Vous pouvez ajouter ici du code pour rediriger l'utilisateur ou afficher un message de confirmation, etc.
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      // Gérer l'erreur - afficher un message à l'utilisateur ou effectuer une action appropriée
    }
  };

  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Checkout</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-8">

            <div className="card mb-3">
              <div className="card-header">
                <i className="bi bi-truck"></i> Shipping Infomation
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address 2 (Optional)"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3 border-info">
              <div className="card-footer border-info d-grid">
                <button type="button" 
                className="btn btn-info"
                onClick={handlePlaceOrder}
                >
                  to order with total :<strong>{totalPriceFromSession} DT</strong>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <i className="bi bi-cart3"></i> Cart{" "}
                <span className="badge bg-secondary float-end">3</span>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">−0 DT</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>{totalPriceFromSession} DT</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
