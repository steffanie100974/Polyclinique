import React from "react";
import { Alert, Table } from "react-bootstrap";
import MedecinFactureRow from "./MedecinFactureRow";
import { useUserContext } from "../contexts/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { getDoctorFactures } from "../api/facture";
import { getErrorMessage } from "../helpers/getErrorMessage";

const MedecinFacturesTable = () => {
  const { userToken } = useUserContext();
  const {
    data: factures,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getDoctorFactures(userToken),
    queryKey: ["factures"],
    onSuccess: (data) => console.log("doctor factures", data),
  });
  return (
    <div className="mt-4">
      <h3>Les factures que vous avez envoyées</h3>
      {isLoading && (
        <Alert variant="info">
          Chargement des factures que vous avez envoyées...
        </Alert>
      )}
      {isError && <Alert variant="info">{getErrorMessage(error)}</Alert>}
      {factures &&
        (factures.length > 0 ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Prix</th>
                <th>Date de facturation</th>
                <th>Est payée</th>
                <th>Date limite de paiement</th>
                <th>Imprimer</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((facture) => (
                <MedecinFactureRow facture={facture} key={facture._id} />
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">
            Commencez à facturer vos patients et ils apparaîtront ici
          </Alert>
        ))}
    </div>
  );
};

export default MedecinFacturesTable;
