import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import formatDate from "../utilities/formatDate";
import calculateAge from "../utilities/calculateAge";

const MedecinPatients = () => {
  const { user } = useSelector((state) => state.auth);
  const [medecinPatients, setMedecinPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    getMedecinPatients();
  }, []);

  const getMedecinPatients = async () => {
    try {
      setIsLoading(true);
      console.log("function executed");
      const response = await axios.get(
        `http://localhost:3001/medecin/patients`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("medecin patients ", response.data);

      setMedecinPatients(response.data);
    } catch (error) {
      setError("An error has occured");
      console.log("errooor", error);
    } finally {
      setIsLoading(false);
      console.log("end");
    }
  };

  if (isLoading) {
    return (
      <>
        <h3>Mes patients</h3>
        <Alert variant="info">Loading your patients...</Alert>
      </>
    );
  }

  return (
    <div>
      <h3>Mes patients</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {medecinPatients.length > 0 ? (
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>Visite</th>
              <th>Nom et prenom</th>
              <th>Age</th>
              <th>CIN</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {medecinPatients.map(({ patient, rdv }) => (
              <tr key={patient._id}>
                <td>
                  {/* {formatDate(rdvs[0].date)} a {rdvs[0].heure} */}
                  {formatDate(rdv.date)} a {rdv.heure}
                </td>
                <td>
                  {patient.firstName} {patient.lastName}
                </td>
                <td>{calculateAge(patient.dateOfBirth)}</td>
                <td>{patient.CIN}</td>
                <td>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">
          Les patients avec lesquels vous avez déjà travaillé apparaîtront ici
        </Alert>
      )}
    </div>
  );
};

export default MedecinPatients;
