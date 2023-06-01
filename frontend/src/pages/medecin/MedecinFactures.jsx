import React from "react";
import { Container } from "react-bootstrap";
import MedecinFacturesTable from "../../components/MedecinFacturesTable";
import { Helmet } from "react-helmet";
import MedecinPastRDVS from "../../components/MedecinPastRDVS";
import MedecinFutureRDVS from "../../components/MedecinFutureRDVS";

const MedecinFactures = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Factures</title>
      </Helmet>
      <Container className="py-4">
        <MedecinPastRDVS />
        <MedecinFacturesTable />
        <MedecinFutureRDVS />
      </Container>
    </>
  );
};

export default MedecinFactures;
