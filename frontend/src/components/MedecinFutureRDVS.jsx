import React from "react";
import { Alert, Card } from "react-bootstrap";
import formatDate from "../helpers/formatDate";
import { useUserContext } from "../contexts/useUserContext";
import { getMedecinFutureRDVS } from "../api/rendezvous";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "../helpers/getErrorMessage";

const MedecinFutureRDVS = () => {
  const { userToken } = useUserContext();
  console.log("medecin token", userToken);
  const {
    data: futureRDVS,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getMedecinFutureRDVS(userToken),
    queryKey: ["rendezvous", { future: true }],
  });
  return (
    <div>
      <h3>Mes futurs rendez-vous</h3>
      {isLoading && (
        <Alert variant="info">Chargement des rendez-vous futurs...</Alert>
      )}
      {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}
      <div>
        <div>
          {futureRDVS &&
            (futureRDVS.length > 0 ? (
              futureRDVS.map((rdv) => (
                <Card className="mt-3" key={rdv._id}>
                  <Card.Header>
                    {formatDate(rdv.date)} à <strong>{rdv.hour}</strong>
                  </Card.Header>
                  <Card.Body>
                    <p>
                      {rdv.patient.firstName} {rdv.patient.lastName}
                    </p>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <Alert variant="info">
                Les rendez-vous pris apparaîtront ici
              </Alert>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MedecinFutureRDVS;
