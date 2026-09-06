import React, { useState, useEffect } from "react";
import "./Navbar.css";

const navItems = ["home", "about", "skills", "portfolio", "contact"];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`} id="header">
      <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollTo("home"); }}>
        DR<span className="logo-dot">.</span>
      </a>

      <nav className={`navbar${menuOpen ? " open" : ""}`} id="navbar">
        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-link${activeSection === item ? " active" : ""}`}
            onClick={() => scrollTo(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>

      <button
        className={`menu-toggle${menuOpen ? " open" : ""}`}
        id="menuToggle"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
