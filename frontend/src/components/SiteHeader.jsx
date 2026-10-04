import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="wordmark">
        Relifio
      </Link>
      <nav className="site-nav" aria-label="Main">
        <NavLink to="/Learnmore">About</NavLink>
        <NavLink to="/Mainpage">Talk now</NavLink>
      </nav>
    </header>
  );
}
