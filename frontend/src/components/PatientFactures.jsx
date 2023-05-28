import React from "react";
import Table from "react-bootstrap/Table";
import { Alert } from "react-bootstrap";
import formatDate from "../helpers/formatDate";
import { useUserContext } from "../contexts/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { getPatientFactures } from "../api/facture";

const PatientFactures = () => {
  const { userToken } = useUserContext();

  const {
    data: factures,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getPatientFactures(userToken, false),
    queryKey: ["patient-factures", { isPaid: false }],
  });

  return (
    <section className="mt-4">
      <h3>Mes factures impayées</h3>
      {isLoading && (
        <Alert variant="info">Chargement de vos factures impayées...</Alert>
      )}
      {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}

      {factures &&
        (factures.length > 0 ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Date de RDV</th>
                <th>Medecin</th>
                <th>Est payé</th>
                <th>Frais</th>
                <th>Date limite de paiement</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((facture) => (
                <tr key={facture._id}>
                  <td>{formatDate(facture.rdv.date)}</td>
                  <td>
                    {facture.rdv.medecin.firstName}{" "}
                    {facture.rdv.medecin.lastName}
                  </td>
                  <td style={{ color: facture.isPaid ? "green" : "red" }}>
                    {facture.isPaid ? "Oui" : "Non"}
                  </td>
                  <td>{facture.price} DH</td>
                  <td>
                    {new Date(facture.deadline).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">Vous n'avez aucune facture impayée</Alert>
        ))}
    </section>
  );
};

export default PatientFactures;
