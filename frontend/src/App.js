import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
//const Header = lazy(() => import("./components/Header"));
//const TopMenu = lazy(() => import("./components/TopMenu"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const OrdersUpdate = lazy(() => import("./views/admin/OrdersUpdate"));
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const MyProfileView = lazy(() => import("./views/account/MyProfile"));
const ProductListView = lazy(() => import("./views/product/List"));
const ProductAdmin = lazy(() => import("./views/product/ProductAdmin"));
const CatEdit = lazy(() => import("./views/admin/Category"));
const UsersEdit = lazy(() => import("./views/admin/Users"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const InvoiceView = lazy(() => import("./views/cart/Invoice"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <TopMenu />
        <Suspense
          fallback={
            <div className="text-white text-center mt-3">Loading...</div>
          }
        >
          <Routes>
            <Route exact path="/" element={<ProductListView/>} />
            <Route exact path="/account/signin" element={<SignInView/>} />
            <Route exact path="/account/signup" element={<SignUpView/>} />
            <Route
              exact
              path="/account/forgotpassword"
              element={<ForgotPasswordView/>}
            />
            <Route exact path="/account/profile" element={<MyProfileView/>} />
            <Route exact path="/account/orders" element={<OrdersView/>} />
            <Route exact path="/account/wishlist" element={<WishlistView/>} />
            <Route exact path="/products" element={< ProductAdmin/>}/>
            <Route exact path="/users" element={< UsersEdit/>}/>
            <Route exact path="/categoryedit" element={<CatEdit/>}/>
            <Route exact path="/orderedit" element={<OrdersUpdate/>}/>
            <Route exact path="/category" element={<ProductListView/>} />
            <Route exact path="/product/detail/:id" element={<ProductDetailView/>} />
            <Route exact path="/cart" element={<CartView/>} />
            <Route exact path="/checkout" element={<CheckoutView/>} />
            <Route exact path="/invoice" element={<InvoiceView />} />
            <Route exact path="/contact-us" element={<ContactUsView/>} />
            <Route exact path="/500" element={<InternalServerErrorView/>} />
            <Route path="*" element={<NotFoundView/>} />
          </Routes>
        </Suspense>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
