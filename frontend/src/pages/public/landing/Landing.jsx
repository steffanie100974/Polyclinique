import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QualifiedIcon from "../../../assets/landing-page/medalstar.svg";
import MoneyIcon from "../../../assets/landing-page/moneyrecive.svg";
import TimeIcon from "../../../assets/landing-page/timer1.svg";
import HeroImg from "../../../assets/landing-page/hero-img.png";
import "./Landing.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
const Landing = () => {
  const [departments, setDepartments] = useState([]);
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Polyclinique - Home</title>
      </Helmet>
      <div className="landing-page">
        <Container>
          <Row>
            <Col
              xs="12"
              md="6"
              className="d-flex flex-column justify-content-center"
            >
              <h1>Une famille de medecins pour vous</h1>
              <p className="value">
                Obtenez la meilleure aide médicale professionnelle de notre
                polyclinique moderne.
              </p>
              <ul
                className="d-lg-flex align-items-center ps-0"
                style={{ gap: 15, listStyle: "none" }}
              >
                <li className="d-flex align-items-center" style={{ gap: 15 }}>
                  <img src={QualifiedIcon} alt="icon" />
                  <p className="mb-0">Médecins Qualifiés</p>
                </li>
                <li className="d-flex align-items-center" style={{ gap: 15 }}>
                  <img src={TimeIcon} alt="icon" />
                  <p className="mb-0">Ouvert 24/7</p>
                </li>
                <li className="d-flex align-items-center" style={{ gap: 15 }}>
                  <img src={MoneyIcon} alt="icon" />
                  <p className="mb-0">Peu Coûteux</p>
                </li>
              </ul>
              <div className="btns-container mt-4">
                <Link to="/patient/signup">
                  <button className="btn-primary">Prenez rendez-vous</button>
                </Link>
              </div>
            </Col>
            <Col xs="12" md="6" className="column2">
              <img style={{ maxWidth: "100%" }} src={HeroImg} alt="Hero" />
            </Col>
          </Row>
        </Container>

        <section className="departments">
          <h2>Nos Departements</h2>
          <div className="flex">
            {departments.map((department) => (
              <div className="department" key={department._id}>
                <h4>{department.name}</h4>
                <img src={department.image} alt={department.name} />
              </div>
            ))}
          </div>
        </section>
        <div className="light-blue-bg"></div>
      </div>
    </>
  );
};

export default Landing;
