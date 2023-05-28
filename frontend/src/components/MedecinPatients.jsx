import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Table } from "react-bootstrap";
import formatDate from "../helpers/formatDate";
import calculateAge from "../helpers/calculateAge";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { useUserContext } from "../contexts/useUserContext";
import { getMedecinPatients } from "../api/patient";
const MedecinPatients = () => {
  const { userToken } = useUserContext();

  const {
    data: medecinPatients,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getMedecinPatients(userToken),
    queryKey: ["patients"],
  });

  return (
    <div>
      <h3>Mes patients</h3>
      {isLoading && <Alert variant="info">Loading your patients...</Alert>}

      {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}
      {medecinPatients &&
        (medecinPatients.length > 0 ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Visite</th>
                <th>Nom et prenom</th>
                <th>Email</th>
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
                  <td>{patient.email}</td>
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
        ))}
    </div>
  );
};

export default MedecinPatients;
