import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
const MedecinNavbar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar className="mt-0" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/medecin/dashboard">
            <img src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                className={(isActive) =>
                  "nav-link" + (isActive ? "" : " text-primary")
                }
                to="/medecin/ordonnances"
              >
                Ordonnances
              </NavLink>
              <NavLink
                className={(isActive) =>
                  "nav-link" + (isActive ? "" : " text-primary")
                }
                to="/medecin/factures"
              >
                Factures
              </NavLink>
              <NavLink
                className={(isActive) =>
                  "nav-link" + (isActive ? "" : " text-primary")
                }
                to="/medecin/patients"
              >
                Patients
              </NavLink>

              <NavDropdown
                title={<FontAwesomeIcon icon={faUserCircle} />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/medecin/profile">
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  style={{ color: "red" }}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default MedecinNavbar;
