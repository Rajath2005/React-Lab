import React from "react";

const Navbar = ({ currentPage, setPage }) => {
  return (
    <nav>
      <button 
        className={currentPage === "home" ? "active" : ""}
        onClick={() => setPage("home")}
      >
        Home
      </button>
      {" | "}
      <button 
        className={currentPage === "about" ? "active" : ""}
        onClick={() => setPage("about")}
      >
        About
      </button>
      {" | "}
      <button 
        className={currentPage === "contact" ? "active" : ""}
        onClick={() => setPage("contact")}
      >
        Contact
      </button>
    </nav>
  );
};

export default Navbar;