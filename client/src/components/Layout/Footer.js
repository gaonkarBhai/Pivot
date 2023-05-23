import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-1">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-body-secondary">
              Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-body-secondary">
              Support
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-body-secondary">
              Pricing
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/policy" className="nav-link px-2 text-body-secondary">
              Privacy Policy
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-body-secondary">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link px-2 text-body-secondary">
              Contact
            </Link>
          </li>
        </ul>
        <p className="text-center text-body-secondary">
          All Right Reserved © Pivot
        </p>
      </footer>
    </>
  );
};

export default Footer;
