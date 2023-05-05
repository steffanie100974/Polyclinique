import React from "react";
import { Alert, Button, Card, Container, Table } from "react-bootstrap";
import formatDate from "../utilities/formatDate";
import SingleMedecinPastRDV from "./SingleMedecinPastRDV";

const MedecinPastRDVS = ({ isLoading, error, pastRDVS, setFactures }) => {
  if (isLoading) {
    return (
      <Alert variant="info">Chargement de vos rendez-vous passés...</Alert>
    );
  }

  return (
    <>
      {error && <Alert variant="info">{error}</Alert>}
      <h3>Mes rendez-vous passés</h3>

      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type de service</th>
            <th>Patient</th>
            <th>Facturer</th>
          </tr>
        </thead>
        <tbody>
          {pastRDVS.map((rdv) => (
            <SingleMedecinPastRDV
              setFactures={setFactures}
              key={rdv._id}
              rdv={rdv}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MedecinPastRDVS;
