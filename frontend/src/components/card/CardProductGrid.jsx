import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import { HiOutlineLogin } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";

const CardProductGrid = (props) => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  const product = props.data;
  console.log(product);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const itemToAdd = product;
    const quantity = 1; // The quantity you want to add
    dispatch(addToCart({ item: itemToAdd, quantity }));
  };
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const checkIfInWishlist = () => {
    const exists = wishlistItems.some((item) => item._id === product._id);
    setIsInWishlist(exists);
  };

  useEffect(() => {
    checkIfInWishlist();
  }, [wishlistItems, product]);
  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      window.location.href = "/account/signin";
    } else {
      if (!isInWishlist) {
        dispatch(addToWishlist(product));
        setIsInWishlist(true);
      } else {
        dispatch(removeFromWishlist(product._id));
        setIsInWishlist(false);
      }
    }
  };

  return (
    <div className="card">
      <img src={product.img} className="card-img-top" alt="..." />
      {product.isNewPro && (
        <span className="badge bg-success position-absolute mt-2 ms-2">
          New
        </span>
      )}
      {product.isHot && (
        <span className="badge bg-danger position-absolute r-0 mt-2 me-2">
          Hot
        </span>
      )}
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link
            to={{
              pathname: `${product.link}/${product._id}`,
              state: { allproductData: product }, // Pass the product data as state
            }}
            className="text-decoration-none"
          >
            {product.name}
          </Link>
        </h6>
        <div className="my-2">
          <span className="fw-bold h5">{product.price} DT</span>

        </div>
        <div className="btn-group  d-flex" role="group">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            title="Add to cart"
            onClick={() => handleAddToCart(product)}
          >
            <i className="bi bi-cart-plus" /> Add to Cart
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Add to wishlist"
            onClick={() => handleAddToWishlist(product)}
          >
            {isLoggedIn ? (
              isInWishlist ? (
                <FaHeart className="text-danger" />
              ) : (
                <FaHeart />
              )
            ) : (
              <HiOutlineLogin />  
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
