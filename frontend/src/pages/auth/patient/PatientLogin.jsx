import React, { useEffect, useState } from "react";

import "../../../css/PatientLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Alert from "react-bootstrap/Alert";

function PatientLogin() {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showPassword = () => (visible ? setVisible(false) : setVisible(true));
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email) return toast.info("Remplir l'email svp");
    if (!formData.password) return toast.info("Remplir le mot de passe svp");

    dispatch(login({ userType: "patient", userData: formData }));
  };
  useEffect(() => {
    console.log("is success", isSuccess);
    if (isSuccess) setTimeout(() => navigate("/patient/dashboard"), 1500);
  }, [isSuccess]);

  return (
    <div className="patient-login-page">
      <section className="forms">
        <div className="form login">
          <div className="form-content">
            <header>Connexion Patient</header>

            <form onSubmit={handleSubmit}>
              {isError && <Alert variant="danger">{message}</Alert>}
              {isSuccess && (
                <Alert variant="success">
                  Connecté avec succès, vous redirige maintenant...
                </Alert>
              )}
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="field input-field">
                <div className="eye-icon" onClick={showPassword}>
                  {/* {visible ? <FaEyeSlash /> : <FaEye />} */}
                </div>
                <input
                  type={!visible ? "password" : "text"}
                  placeholder="password"
                  className="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="form-link">
                <a href="#" className="forgot-pass">
                  Forgot password ?
                </a>
              </div>

              <div className="field">
                <button className="btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      style={{ color: "white" }}
                    />
                  ) : (
                    "Se connecter"
                  )}
                </button>
              </div>
            </form>
            <div className="form-link">
              <span>
                doesn't have account ?{" "}
                <a href="/register" className="link signup-link">
                  {" "}
                  Sign Up
                </a>
              </span>
            </div>
          </div>
          <div className="line"></div>

          <div className="media-options">
            <a href="#" className="field google">
              <div className="google-icon">
                <box-icon type="logo" name="google" color="#2da77e"></box-icon>
              </div>
              <span>Login with google</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientLogin;
