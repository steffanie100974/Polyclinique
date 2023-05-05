// Packages
import React, { useState } from "react";

//Images
import Logo from "../assets/logo.svg";

//Styling
import "../scss/layouts/Navbar.scss";

import { Link, NavLink, Outlet } from "react-router-dom";

function PublicNav() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <nav className="navbar container">
        <Link to="/" className="logo">
          <img src={Logo} alt="LOGO" />
        </Link>
        <div className="push-left">
          <button
            id="menu-toggler"
            className="hamburger"
            onClick={() => setOpenNav(!openNav)}
          >
            <span className="hamburger-line hamburger-line-top"></span>
            <span className="hamburger-line hamburger-line-middle"></span>
            <span className="hamburger-line hamburger-line-bottom"></span>
          </button>

          {/* <!--  Menu compatible with wp_nav_menu  --> */}
          <ul
            id="primary-menu"
            className={openNav ? "menu-active menu nav-menu" : "menu nav-menu"}
          >
            <li className="menu-item current-menu-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav__link active" : "nav__link"
                }
                to="/"
                onClick={() => openNav(false)}
              >
                Accueil
              </NavLink>
            </li>
            <li className="menu-item dropdown">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav__link active" : "nav__link"
                }
                onClick={() => openNav(false)}
                to="/departements"
              >
                Departements
              </NavLink>
            </li>
            <li className="menu-item dropdown">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav__link active" : "nav__link"
                }
                to="/contact"
                onClick={() => openNav(false)}
              >
                Contactez Nous
              </NavLink>
            </li>
            <li className="menu-item ">
              <Link
                className="nav__link"
                to="/medecin/login"
                onClick={() => openNav(false)}
              >
                <button className="btn-secondary">
                  <span>Espace Medecin</span>
                </button>
              </Link>
            </li>
            <li className="menu-item ">
              <Link
                className="nav__link"
                to="/patient/signup"
                onClick={() => openNav(false)}
              >
                <button className="btn-primary">Prenez rendez vous</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default PublicNav;
