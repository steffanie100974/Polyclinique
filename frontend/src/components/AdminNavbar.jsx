import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
const AdminNavbar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar className="mt-0" bg="light" expand="lg">
        <Container>
          <Navbar.Brand
            className="d-flex align-items-center justify-content-center"
            as={Link}
            to="/home"
          >
            <img src={logo} alt="logo" />
            <h4 className="ms-3 mb-0">Admin</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                className={(isActive) =>
                  "nav-link" + (isActive ? "" : " text-primary")
                }
                to="/admin/medecins"
              >
                Medecins
              </NavLink>

              <NavDropdown
                title={<FontAwesomeIcon icon={faUserCircle} />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/admin/profile">
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

export default AdminNavbar;
