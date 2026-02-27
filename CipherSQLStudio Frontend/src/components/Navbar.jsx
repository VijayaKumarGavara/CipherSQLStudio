import React from "react";
import "../css/navbar.css";
import logo from "../../public/sql.png"; // adjust path if needed
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="CipherSQL Studio Logo" className="navbar-logo" />
        <Link to="/questions/" className="navbar-title">
          CipherSQL Studio
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;