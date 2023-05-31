import React from "react";
import MedecinRDVS from "../../components/MedecinRDVS";
import { Container } from "react-bootstrap";
import MedecinFacturesTable from "../../components/MedecinFacturesTable";
import { Helmet } from "react-helmet";

const MedecinFactures = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Factures</title>
      </Helmet>
      <Container className="py-4">
        <MedecinRDVS />
        <MedecinFacturesTable />
      </Container>
    </>
  );
};

export default MedecinFactures;
