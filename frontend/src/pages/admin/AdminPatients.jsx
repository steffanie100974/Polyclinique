import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deletePatient, getAllPatients } from "../../api/patient";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import formatDate from "../../helpers/formatDate";
import { useUserContext } from "../../contexts/useUserContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const AdminPatients = () => {
  const { userToken } = useUserContext();
  const queryClient = useQueryClient();
  const {
    data: patients,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryFn: () => getAllPatients(userToken),
    onSuccess: (data) => console.log("data", data),
    queryKey: ["patients"],
  });

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (patientID) => deletePatient(patientID, userToken),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["patients"]);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  return (
    <>
      <Helmet>
        <title>Liste des patients</title>
      </Helmet>
      <Container className="py-3">
        <h2>Liste des patients</h2>
        {!isLoading && isFetching && (
          <Alert variant="info">
            Mise à jour de la liste des patients..{" "}
            <FontAwesomeIcon icon={faSpinner} spin />
          </Alert>
        )}
        {isLoading && <Alert variant="info">Chargement des patients...</Alert>}
        {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}

        {patients &&
          (patients.length > 0 ? (
            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Prenom</th>
                  <th>Nom</th>
                  <th>Numero de telehpone</th>
                  <th>Email</th>
                  <th>Date d'inscription</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>
                      <Link to={`/admin/patients/${patient._id}`}>
                        {patient._id}
                      </Link>
                    </td>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.email}</td>
                    <td>{formatDate(patient.createdAt)}</td>
                    <td>
                      <Button
                        onClick={() => mutate(patient._id)}
                        variant="danger"
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          "Supprimer"
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">Il y a 0 patients enregistrés</Alert>
          ))}
      </Container>
    </>
  );
};

export default AdminPatients;
