import { Link } from "react-router-dom";

const isAdmin = JSON.parse(window.localStorage.getItem("isAdmin"));

const TopMenu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ShopTec
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {!isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">
                    Top Sale
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">
                    Hot Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">
                    New Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">
                    Contact
                  </Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categoryedit">
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orderedit">
                    orders
                  </Link>
                </li>
                
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
