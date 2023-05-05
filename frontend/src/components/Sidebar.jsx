import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, Outlet } from "react-router-dom";
import "../css/sidebar.css";
import {
  faMoneyBill,
  faUserCircle,
  faSignOut,
  faDashboard,
  faHospital,
  faSyringe,
  faCalendar,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Sidebar = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (!user) return <Navigate to="/" />;
  return (
    <>
      <div
        className={`sidebar ${isSidebarMinimized && "close"}`}
        onMouseEnter={() => setIsSidebarMinimized(false)}
        onMouseLeave={() => setIsSidebarMinimized(true)}
      >
        <div className="logo-details">
          <Link to="/patient/dashboard">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">
              <div className="i-container">
                <FontAwesomeIcon
                  className="i"
                  icon={faHospital}
                  style={{ color: "white" }}
                />
              </div>
              <span className="link_name">Dashboard</span>
            </a>
          </li>

          <li>
            <div className="icon-link">
              <a href="#">
                <div className="i-container">
                  <FontAwesomeIcon
                    className="i"
                    icon={faMoneyBill}
                    style={{ color: "white" }}
                  />
                </div>

                <span className="link_name">Mes Factures</span>
              </a>
            </div>
          </li>
          <li>
            <a href="#">
              <div className="i-container">
                <FontAwesomeIcon
                  className="i"
                  icon={faSyringe}
                  style={{ color: "white" }}
                />
              </div>

              <span className="link_name">Mes Ordonnonces</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="i-container">
                <FontAwesomeIcon
                  className="i"
                  icon={faCalendar}
                  style={{ color: "white" }}
                />
              </div>

              <span className="link_name">Prenez rendez vous</span>
            </a>
          </li>
          <li>
            <div className="icon-link">
              <a href="#">
                <div className="i-container">
                  <FontAwesomeIcon
                    className="i"
                    icon={faUserNurse}
                    style={{ color: "white" }}
                  />
                </div>

                <span className="link_name">Medecins</span>
              </a>
              {/* <div className="i-container">
                <FontAwesomeIcon className="i arrow" icon={faChevronDown} />
              </div> */}
            </div>
          </li>
        </ul>
        <div className="profile-details">
          <div className="profile-content">
            <FontAwesomeIcon className="profile-img" icon={faUserCircle} />
          </div>
          <div className="name-job">
            <div className="profile_name">
              {user.firstName} {user.lastName}
            </div>
          </div>
          <button
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
            }}
            onClick={() => dispatch(logout())}
            className="i-container"
          >
            <FontAwesomeIcon
              className="i"
              icon={faSignOut}
              style={{ color: "red" }}
            />
          </button>
        </div>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
