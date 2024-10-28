import { useState, useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);



const SizeChart = lazy(() => import("../../components/others/SizeChart"));
const ProductDetailView = (props) => {
  const location = useLocation();
  const { product } = location.state || {};
  const cartItems1 = useSelector((state) => state.cart.cartItems);
  // Utilisez les données du produit récupérées
  console.log(product);
  const [productData, setProductData] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const productId = id;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/produit/produits/${productId}`
        );
        const products = response.data;
        const firstKey = Object.keys(products)[0];
        setProductData(products[firstKey]);
        console.log(products[firstKey]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, []);
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const itemToAdd = productData; 
    //const quantit = 1; // The quantity you want to add
    dispatch(addToCart({ item: itemToAdd, quantity }));
  };
  console.log(quantity);

  console.log("Type of products:",  productData);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src={productData && productData.img}
                className="img-fluid mb-3"
                alt=""
              />
              <img
                src={productData && productData.img}
                className="border border-secondary me-2"
                width="75"
                alt="..."
              />
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline me-2">
                {productData && productData.name}
              </h1>
              {productData && productData.isNewPro && (
              <span className="badge bg-success me-2">New</span>
            )}
              {productData && productData.isHot && <span className="badge bg-danger me-2">Hot</span>}
              <div className="mb-3">
                <i className="bi bi-star-fill text-warning me-1" />
                <i className="bi bi-star-fill text-warning me-1" />
                <i className="bi bi-star-fill text-warning me-1" />
                <i className="bi bi-star-fill text-warning me-1" />
                <i className="bi bi-star-fill text-secondary me-1" />|{" "}
                <span className="text-muted small">
                  42 ratings and 4 reviews
                </span>
              </div>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                <dd className="col-sm-9">In stock</dd>
                <dt className="col-sm-3">Sold by</dt>
                <dd className="col-sm-9">Authorised Store</dd>
                <dd className="col-sm-9">

                </dd>
                <dd className="col-sm-9"> {productData && productData.description}</dd>
              </dl>

              <div className="mb-3">
                
                <span className="fw-bold h5 me-2">
                  {productData && productData.price - 100} DT
                </span>
                <del className="small text-muted me-2">
                  {productData && productData.price} DT
                </del>
                <span className="rounded p-1 bg-warning  me-2 small">
                  -100 DT
                </span>
              </div>
              <div className="mb-3">
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={decreaseQuantity}
                    >
                      <i className="bi bi-dash-lg"></i>
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={increaseQuantity}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary me-2"
                  title="Add to cart"
                  onClick={() => handleAddToCart(productData )}
                >
                  <i className="bi bi-cart-plus me-1"></i>Add to cart
                </button>
                <Link to="/cart">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning me-2"
                    title="Buy now"
                  >
                    <i className="bi bi-cart3 me-1"></i>Buy now
                  </button>
                </Link>


              </div>
              <div>
                <p className="fw-bold mb-2 small">Product Highlights</p>
                <ul className="small">
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>Etiam ullamcorper nibh eget faucibus dictum.</li>
                  <li>Cras consequat felis ut vulputate porttitor.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-link active"
                    id="nav-details-tab"
                    data-bs-toggle="tab"
                    href="#nav-details"
                    role="tab"
                    aria-controls="nav-details"
                    aria-selected="true"
                  >
                    Details
                  </a>
                  <a
                    className="nav-link"
                    id="nav-randr-tab"
                    data-bs-toggle="tab"
                    href="#nav-randr"
                    role="tab"
                    aria-controls="nav-randr"
                    aria-selected="false"
                  >
                    Ratings & Reviews
                  </a>
                  <a
                    className="nav-link"
                    id="nav-faq-tab"
                    data-bs-toggle="tab"
                    href="#nav-faq"
                    role="tab"
                    aria-controls="nav-faq"
                    aria-selected="false"
                  >
                    Questions and Answers
                  </a>
                  <a
                    className="nav-link"
                    id="nav-ship-returns-tab"
                    data-bs-toggle="tab"
                    href="#nav-ship-returns"
                    role="tab"
                    aria-controls="nav-ship-returns"
                    aria-selected="false"
                  >
                    Shipping & Returns
                  </a>
                  <a
                    className="nav-link"
                    id="nav-size-chart-tab"
                    data-bs-toggle="tab"
                    href="#nav-size-chart"
                    role="tab"
                    aria-controls="nav-size-chart"
                    aria-selected="false"
                  >
                    Size Chart
                  </a>
                </div>
              </nav>
              <div className="tab-content p-3 small" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-details"
                  role="tabpanel"
                  aria-labelledby="nav-details-tab"
                >
                  <Details />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-randr"
                  role="tabpanel"
                  aria-labelledby="nav-randr-tab"
                >
                  {Array.from({ length: 5 }, (_, key) => (
                    <RatingsReviews key={key} />
                  ))}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-faq"
                  role="tabpanel"
                  aria-labelledby="nav-faq-tab"
                >
                  <dl>
                    {Array.from({ length: 5 }, (_, key) => (
                      <QuestionAnswer key={key} />
                    ))}
                  </dl>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-ship-returns"
                  role="tabpanel"
                  aria-labelledby="nav-ship-returns-tab"
                >
                  <ShippingReturns />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-size-chart"
                  role="tabpanel"
                  aria-labelledby="nav-size-chart-tab"
                >
                  <SizeChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <CardFeaturedProduct data={cartItems1} />
          <CardServices />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
