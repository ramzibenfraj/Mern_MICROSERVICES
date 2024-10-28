import { lazy,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/cartSlice";
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

const CartView = () => {
  const cartItems1 = useSelector((state) => state.cart.cartItems);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cartItems1.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    return totalPrice;
  };

  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };
  // const productRedux = useSelector();
  // console.log(productRedux);
  const isLoggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  const onSubmitApplyCouponCode = async (values) => {
    alert(JSON.stringify(values));
  };

  //calcule des quantiteee
  const calculateTotalQuantity = () => {
    const totalQuantity = cartItems1.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return totalQuantity;
  };
  const totalPrice = calculateTotalPrice() - calculateTotalQuantity() * 100;

  useEffect(() => {
    // Store total price in localStorage
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [totalPrice]);

  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      {/* {product.map((productv) => (
                        <div><h5 className="card-title">{product.name}</h5></div>
                        
                    ))} */}

                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems1.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              <img src={item.img} width="80" alt="..." />
                            </div>
                            <div className="col">
                              <Link
                                to={`/product/detail/${item._id}`}
                                className="text-decoration-none"
                              >
                                <div>
                                  <h5 className="card-title">{item.name}</h5>
                                </div>
                              </Link>
                              <p className="small text-muted">
                                Ram: 8GB, Color: blue, Brand: ...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="input-group input-group-sm mw-140">
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() => handleDecreaseQuantity(item._id)}
                            >
                              <i className="bi bi-dash-lg"></i>
                            </button>
                            <input
                              type="text"
                              className="form-control"
                              value={item.quantity}
                            />
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() => handleIncreaseQuantity(item._id)}
                            >
                              <i className="bi bi-plus-lg"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <var className="price">{item.quantity *item.price} DT</var>
                          <small className="d-block text-muted">
                            -{item.quantity * 100} DT
                          </small>
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                {isLoggedIn === false && (
                  <Link
                    to="/account/signin"
                    className="btn btn-primary float-end"
                  >
                    Login to Make Purchase{" "}
                    <i className="bi bi-chevron-right"></i>
                  </Link>
                )}

                {isLoggedIn && (
                  <Link to="/checkout" className="btn btn-primary float-end">
                    Make Purchase <i className="bi bi-chevron-right"></i>
                  </Link>
                )}
                <Link to="/" className="btn btn-secondary">
                  <i className="bi bi-chevron-left"></i> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <i className="bi bi-truck"></i> Free Delivery within 1-2 weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <CouponApplyForm onSubmit={onSubmitApplyCouponCode} />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Total price:</dt>
                  <dd className="col-6 text-end">{calculateTotalPrice()} DT</dd>

                  <dt className="col-6 text-success">Discount:</dt>
                  <dd className="col-6 text-success text-end">
                    -{calculateTotalQuantity() * 100}
                  </dd>
                  <dt className="col-6 text-success">
                    Coupon:{" "}
                    <span className="small text-muted">EXAMPLECODE</span>{" "}
                  </dt>
                  <dd className="col-6 text-success text-end">-0 DT</dd>
                </dl>
                <dl className="row">
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-end  h5">
                    <strong>
                      {calculateTotalPrice() - calculateTotalQuantity() * 100}{" "}
                      DT
                    </strong>
                  </dd>
                </dl>
                <hr />
                <p className="text-center">
                  <img
                    src="../../images/payment/payments.webp"
                    alt="..."
                    height={26}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Payment Policy: Accepted Payment Methods: Specify which payment
            methods you accept (credit/debit cards, PayPal, Apple Pay, etc.) and
            if there are any limitations or restrictions. Payment Processing:
            Explain the process of payment verification, authorization, and when
            the payment will be charged to the customer. Currency and Pricing:
            Clearly state the currency used for transactions and how pricing is
            determined (including taxes, shipping costs, etc.). Security
            Measures: Assure customers about the security measures implemented
            to safeguard their payment information during transactions. Payment
            Confirmation: Outline how customers will receive confirmation of
            their payment, such as through email or a receipt page.
          </p>
          <p>
            Refund Policy: Conditions
            for Refunds: Clearly define the circumstances under which refunds
            are applicable (e.g., damaged goods, defective products,
            dissatisfaction, etc.). Refund Process: Explain the steps customers
            need to follow to request a refund, including any forms or
            documentation required. Refund Timeline: Specify the timeframe
            within which refunds will be processed after approval, and when
            customers can expect to see the refunded amount in their accounts.
            Refund Method: Explain the method by which refunds will be issued
            (credit card reversal, store credit, original payment method, etc.).
            Non-Refundable Items/Services: Mention any items or services that
            are exempt from refunds (e.g., digital downloads,
            personalized/customized items, etc.). Return Shipping: Clarify who
            is responsible for return shipping costs, if applicable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartView;
