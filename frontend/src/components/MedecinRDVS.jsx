import React from "react";
import { Alert, Table } from "react-bootstrap";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { getMedecinRDVS } from "../api/rendezvous";
import { useUserContext } from "../contexts/useUserContext";
import SingleMedecinRDVRow from "./SingleMedecinRDVRow";

const MedecinRDVS = () => {
  const { userToken } = useUserContext();
  const {
    data: rdvs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getMedecinRDVS(userToken),
    queryKey: ["rendezvous"],
  });

  return (
    <>
      <h3>Mes rendez-vous</h3>
      {isError && <Alert variant="info">{getErrorMessage(error)}</Alert>}
      {isLoading && (
        <Alert variant="info">Chargement de vos rendez-vous...</Alert>
      )}
      {rdvs &&
        (rdvs.length > 0 ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient</th>
                <th>Telephone</th>
                <th>Facturer</th>
              </tr>
            </thead>
            <tbody>
              {rdvs.map((rdv) => (
                <SingleMedecinRDVRow key={rdv._id} rdv={rdv} />
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">Vous n'avez aucun rendez-vous à facturer</Alert>
        ))}
    </>
  );
};

export default MedecinRDVS;
