import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QualifiedIcon from "../../../assets/landing-page/medalstar.svg";
import MoneyIcon from "../../../assets/landing-page/moneyrecive.svg";
import TimeIcon from "../../../assets/landing-page/timer1.svg";
import HeroImg from "../../../assets/landing-page/hero-img.png";
import Spinner from "../../../components/Spinner";
import "./Landing.scss";
import Department from "../../../types/Department";
const Landing = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllDepartments();
  }, []);
  const getAllDepartments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3001/departments/");
      console.log("data", response.data);
      const departments = response.data;
      setDepartments(departments);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("finally");
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="flex container">
          <div className="column1">
            <h1>
              Une famille de medecins pour votre <span>famille</span>
            </h1>
            <p className="value">
              Obtenez la meilleure aide médicale professionnelle de notre
              polyclinique moderne.
            </p>
            <ul>
              <li>
                <img src={QualifiedIcon} alt="icon" />
                <p>Médecins Qualifiés</p>
              </li>
              <li>
                <img src={TimeIcon} alt="icon" />
                <p>Ouvert 24/7</p>
              </li>
              <li>
                <img src={MoneyIcon} alt="icon" />
                <p>Peu Coûteux</p>
              </li>
            </ul>
            <div className="btns-container">
              <Link to="/patient/signup">
                <button className="btn-primary">Prenez rendez-vous</button>
              </Link>
              <a href="#departments">
                <button className="btn-secondary">
                  <span>Savoir plus</span>
                </button>
              </a>
            </div>
          </div>
          <div className="column2">
            <img src={HeroImg} alt="Hero" />
          </div>
        </div>
      </section>

      <section className="departments">
        <h2>Nos Departements</h2>
        <div className="flex">
          {departments.map((department) => (
            <Link
              to={`/departements/${department.name}`}
              className="department"
              key={department._id}
            >
              <h4>{department.name}</h4>
              <img src={department.image} alt={department.name} />
            </Link>
          ))}
        </div>
      </section>
      <div className="light-blue-bg"></div>
    </div>
  );
};

export default Landing;
