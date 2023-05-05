import React from "react";
import { Alert, Table } from "react-bootstrap";
import MedecinFactureRow from "./MedecinFactureRow";

const MedecinFacturesTable = ({ isLoading, error, factures, setFactures }) => {
  return (
    <div className="mt-4">
      <h3>Les factures que vous avez envoyées</h3>
      {isLoading && (
        <Alert variant="info">
          Chargement des factures que vous avez envoyées...
        </Alert>
      )}
      {error && <Alert variant="info">{error}</Alert>}
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Prix</th>
            <th>Date de facturation</th>
            <th>Date limite de paiement</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {factures.map((facture) => (
            <MedecinFactureRow
              facture={facture}
              key={facture._id}
              setFactures={setFactures}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MedecinFacturesTable;
