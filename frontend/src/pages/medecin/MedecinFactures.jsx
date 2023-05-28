import React from "react";
import MedecinRDVS from "../../components/MedecinRDVS";
import { Container } from "react-bootstrap";
import MedecinFacturesTable from "../../components/MedecinFacturesTable";

const MedecinFactures = () => {
  return (
    <Container className="py-4">
      <MedecinRDVS />
      <MedecinFacturesTable />
    </Container>
  );
};

export default MedecinFactures;
