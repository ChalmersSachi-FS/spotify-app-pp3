// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {/* You can add more navigation buttons here if needed */}
    </nav>
  );
};

export default Navbar;
