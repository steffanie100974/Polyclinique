import React from "react";
import MedecinFutureRDVS from "../../components/MedecinFutureRDVS";
import MedecinCalendar from "../../components/MedecinCalendar";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import PolyclinicRevenue from "../../components/PolyclinicRevenue";
import DoctorRevenue from "../../components/DoctorRevenue";
// import MedecinPatients from "../../components/MedecinPatients";
const MedecinDashboard = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Medecin Dashboard</title>
      </Helmet>
      <Container className="py-4">
        <Row>
          <Col className="mt-2 mt-lg-0" xs="12" lg="6">
            <DoctorRevenue />
          </Col>
          <Col className="my-4 mt-lg-0" xs="12" lg="6">
            <MedecinCalendar />
          </Col>
        </Row>
        <MedecinFutureRDVS />
        {/* <MedecinPatients /> */}
      </Container>
    </>
  );
};

export default MedecinDashboard;
