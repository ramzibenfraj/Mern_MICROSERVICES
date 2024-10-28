import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
//import { BiHeart, BiHeartFill , BiLogIn } from 'react-icons/bi';
import { HiOutlineLogin } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";

const CardProductList = (props) => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));

  const product = props.data;

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

  const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncated = words.slice(0, 25).join(' ');
    if (words.length > 25) {
      return `${truncated} ...`; 
    }
    return truncated;
  };
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.img} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link
                to={{ pathname: `/product/detail/${product._id}` }}
                className="text-decoration-none"
              >
                {product.name}
              </Link>
            </h6>
            {product.isNewPro && (
              <span className="badge bg-success me-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger me-2">Hot</span>}

            <div>
              {product.star > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                  if (key <= product.star)
                    return (
                      <i
                        className="bi bi-star-fill text-warning me-1"
                        key={key}
                      />
                    );
                  else
                    return (
                      <i
                        className="bi bi-star-fill text-secondary me-1"
                        key={key}
                      />
                    );
                })}
            </div>
            {product.description &&
              product.description.includes("|") === false && (
                <p className="small mt-2">{truncateDescription(product.description)}</p>
              )}
            {product.description && product.description.includes("|") && (
              <ul className="mt-2">
                {product.description.split("|").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">{product.price} DT</span>
              {product.originPrice > 0 && (
                <del className="small text-muted ms-2">
                  ${product.originPrice}
                </del>
              )}
              {(product.discountPercentage > 0 ||
                product.discountPrice > 0) && (
                <span className={`rounded p-1 bg-warning ms-2 small`}>
                  -
                  {product.discountPercentage > 0
                    ? product.discountPercentage + "%"
                    : "$" + product.discountPrice}
                </span>
              )}
            </div>

            <div className="btn-group d-flex" role="group">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
                onClick={() => handleAddToCart(product)}
              >
                <i className="bi bi-cart-plus" />
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
                  <HiOutlineLogin /> // Display login icon if not logged in
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
