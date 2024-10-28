import { lazy } from "react";
import { useSelector } from "react-redux";
const CardProductList2 = lazy(() =>
  import("../../components/card/CardProductList2")
);


const WishlistView = () => {
  const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
  return (
    <div className="container mb-3">
      <h4 className="my-3">Wishlists</h4>
      <div className="row g-3">
        {wishlistItems.map((product, idx) => {
          return (
            <div key={idx} className="col-md-6">
              <CardProductList2 data={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistView;
