import React from "react";
import Table from "react-bootstrap/Table";
import { Alert, Button } from "react-bootstrap";
import formatDate from "../../helpers/formatDate";
import { useUserContext } from "../../contexts/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { getPatientFactures } from "../../api/facture";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const PatientFacturesPage = () => {
  const { userToken } = useUserContext();

  const {
    data: factures,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getPatientFactures(userToken),
    queryKey: ["patient-factures"],
    // onSuccess: (data) => console.log("factures", data),
  });

  const paidFactures = factures
    ? factures.filter((facture) => facture.isPaid)
    : undefined;
  const unpaidFactures = factures
    ? factures.filter((facture) => !facture.isPaid)
    : undefined;

  console.log("unpaid factures", unpaidFactures);
  console.log("paid factures", paidFactures);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mes factures</title>
      </Helmet>
      <div className="p-4">
        {isLoading && (
          <Alert variant="info">Chargement de vos factures...</Alert>
        )}
        {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}
        {unpaidFactures && (
          <>
            <h3>Mes factures impayées</h3>
            {unpaidFactures.length > 0 ? (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Date de RDV</th>
                    <th>Medecin</th>
                    <th>Est payé</th>
                    <th>Frais</th>
                    <th>Date limite de paiement</th>
                    <th>Imprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {unpaidFactures.map((facture) => (
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
                      <td>
                        <Button
                          as={Link}
                          to={`/factures/${facture._id}`}
                          variant="outline-success"
                        >
                          Imprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="info">Vous n'avez aucune facture impayée</Alert>
            )}
          </>
        )}
        {paidFactures && (
          <>
            <h3 className="mt-5">Mes factures payées</h3>
            {paidFactures.length > 0 ? (
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Date de RDV</th>
                    <th>Medecin</th>
                    <th>Est payé</th>
                    <th>Frais</th>
                    <th>Date limite de paiement</th>
                    <th>Imprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {paidFactures.map((facture) => (
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
                      <td>
                        <Button
                          as={Link}
                          to={`/factures/${facture._id}`}
                          variant="outline-success"
                        >
                          Imprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="info">Vous n'avez aucune facture payée</Alert>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PatientFacturesPage;
