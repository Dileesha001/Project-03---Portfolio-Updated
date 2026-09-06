import React from "react";
import "./Footer.css";

const navItems = ["home","about","skills","portfolio","contact"];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="#home" className="footer-logo" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
          DR<span className="logo-dot">.</span>
        </a>
        <p className="footer-text">Crafted with <i className="fas fa-heart" style={{ color: "#6505ec" }} /> by Dileesha Ravishan</p>
        <nav className="footer-nav">
          {navItems.map(item => (
            <a href={`#${item}`} key={item} onClick={(e) => { e.preventDefault(); scrollTo(item); }}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Dileesha Ravishan. All rights reserved.</p>
      </div>
    </footer>
  );
}
