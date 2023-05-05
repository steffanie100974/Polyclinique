import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import formatDate from "../utilities/formatDate";

const MedecinFutureRDVS = ({ isLoading, error, futureRDVS }) => {
  if (isLoading) {
    return <Alert variant="info">Chargement des rendez-vous futurs...</Alert>;
  }

  return (
    <div>
      {error && <Alert variant="info">{error}</Alert>}
      <h3>Mes futurs rendez-vous</h3>
      <div>
        <div>
          {futureRDVS.map((rdv) => (
            <Card className="mt-3" key={rdv._id}>
              <Card.Header>{rdv.typeService}</Card.Header>
              <Card.Body>
                <p>
                  {formatDate(rdv.date)} {rdv.heure}
                </p>
                <p>
                  {rdv.patientID.firstName} {rdv.patientID.lastName}
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedecinFutureRDVS;
