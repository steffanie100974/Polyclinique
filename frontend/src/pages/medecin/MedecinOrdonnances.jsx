import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import OrdonnanceForm from "../../components/OrdonnanceForm";
import MedecinOrdonnancesList from "../../components/MedecinOrdonnancesList";

const MedecinOrdonnances = () => {
  const [ordonnances, setOrdonnances] = useState([]);
  return (
    <Container className="py-5">
      <Row>
        <Col xs="12" lg="4">
          <OrdonnanceForm setOrdonnances={setOrdonnances} />
        </Col>
        <Col xs="12" lg="8">
          <MedecinOrdonnancesList
            ordonnances={ordonnances}
            setOrdonnances={setOrdonnances}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MedecinOrdonnances;
