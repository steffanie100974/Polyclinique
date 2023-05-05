import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import formatDate from "../utilities/formatDate";

const PatientFactures = () => {
  const { user } = useSelector((state) => state.auth);
  const [isLoadingFactures, setIsLoadingFactures] = useState(false);
  const [error, setError] = useState("");
  const [patientFactures, setPatientFactures] = useState(null);
  useEffect(() => {
    getPatientFactures();
  }, []);
  useEffect(() => {
    console.log("patientFactures", patientFactures);
  }, [patientFactures]);
  const getPatientFactures = async (isPaid = false) => {
    try {
      setError("");
      setIsLoadingFactures(true);
      const response = await axios.get(
        `http://localhost:3001/patient/factures?paid=${isPaid}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = response.data;
      console.log("daata ", data);
      setPatientFactures(data);
    } catch (error) {
      if (error.response.status === 404) {
        setError("Vous avez 0 factures");
      } else {
        setError(
          "une erreur s'est produite lors de la récupération des factures"
        );
      }

      console.log("errrooor", error);
    } finally {
      setIsLoadingFactures(false);
    }
  };
  if (isLoadingFactures) {
    return (
      <section className="mt-4">
        <h3>Mes factures impayées</h3>
        <Alert variant="info">Chargement de vos factures impayées...</Alert>
      </section>
    );
  }
  if (!patientFactures) {
    return (
      <section className="mt-4">
        <h3>Mes factures impayées</h3>
        <Alert variant="info">{error}</Alert>
      </section>
    );
  }
  return (
    <section className="mt-4">
      <h3>Mes factures impayées</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Date de RDV</th>
            <th>Medecin Nom</th>
            <th>Type de service</th>
            <th>Frais</th>
            <th>Date Limite</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingFactures && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          {error && (
            <tr>
              <td>
                <Alert variant="danger">{error}</Alert>
              </td>
            </tr>
          )}
          {patientFactures.map((facture) => (
            <tr key={facture._id}>
              <td>{formatDate(facture.date)}</td>
              <td>
                {facture.medecinFirstName} {facture.medecinLastName}
              </td>
              <td>{facture.typeService}</td>
              <td>{facture.price} DH</td>
              <td>{new Date(facture.deadline).toLocaleDateString("fr-FR")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default PatientFactures;
