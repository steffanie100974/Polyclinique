import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
// import axios from "axios";
import "./PatientRegister.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PatientRegister() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    CIN: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const showPassword = () => (!visible ? setVisible(true) : setVisible(false));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log("useeer", user);
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.email == "" ||
      formData.firstName == "" ||
      formData.lastName == "" ||
      formData.CIN == "" ||
      formData.password == ""
    ) {
      toast.info("Entrer votre informations", {
        toastId: "info1",
      });
    } else if (formData.password !== formData.confirmPassword) {
      toast.error("les mots de pass ne sont pas identiques", {
        toastId: "error1",
      });

      navigate("/patient-signup");
      localStorage.clear();
    }

    dispatch(register(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="section-container">
      <section className="container forms">
        <div className="form singup">
          <div className="form-content">
            <header>sign up</header>

            <form onSubmit={handleSubmit} action="#">
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="nom"
                  className="input"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="field input-field">
                <input
                  type="text"
                  placeholder="prenom"
                  className="input"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="field input-field">
                <input
                  type="text"
                  placeholder="CIN"
                  className="input"
                  value={formData.CIN}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      CIN: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="field input-field">
                <input
                  type="email"
                  placeholder="email"
                  className="input email"
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
                <input
                  placeholder="Date de naissance"
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  className="input"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      dateOfBirth: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="field input-field">
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
                <div className="eye-icon" onClick={showPassword}>
                  <box-icon name={visible ? "show" : "hide"}></box-icon>
                </div>
              </div>

              <div className="field input-field">
                <input
                  type={!visible ? "password" : "text"}
                  placeholder="confirm password"
                  className="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
                <div className="eye-icon" onClick={showPassword}>
                  <box-icon name={visible ? "show" : "hide"}></box-icon>
                </div>
              </div>

              <div className="field button-field">
                <button>sign up</button>
              </div>
            </form>
            <div className="form-link">
              <span>
                Already have an account ?{" "}
                <Link to="/patient/login" className="link login-link">
                  sign In
                </Link>
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

export default PatientRegister;
