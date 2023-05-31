import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Container } from "react-bootstrap";
import { useUserContext } from "../../contexts/useUserContext";
import { Alert, Table, Button } from "react-bootstrap";
import { getAllRDVS } from "../../api/rendezvous";
import { Link } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
const AdminRendezVous = () => {
  const { userToken } = useUserContext();
  const queryClient = useQueryClient();
  const {
    data: rdvs,
    isLoading: isLoadingRDVS,
    isError: isErrorRDVS,
    error: errorRDVS,
    isFetching,
  } = useQuery({
    queryFn: () => getAllRDVS(userToken),
    queryKey: ["rdvs"],
    onError: (error) => console.log("error get rdvs", error),
  });

  // delete rdv
  const { mutate: mutateRDV, isLoading: isDeletingRDV } = useMutation({
    mutationFn: (rdvID) => deleteRDV(rdvID),
    onSuccess: () => {
      toast.success("Rendez vous annulé avec success");
      queryClient.invalidateQueries(["rdvs"]);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
  return (
    <>
      <Helmet>
        <title>Liste des rendez-vous</title>
      </Helmet>
      <Container className="py-3">
        <h3>Les rendez vous</h3>
        {!isLoadingRDVS && isFetching && (
          <Alert variant="info">
            Mise a jour... <FontAwesomeIcon icon={faSpinner} spin />
          </Alert>
        )}
        {isLoadingRDVS && (
          <Alert variant="info">Chargement des rendez vous du patient...</Alert>
        )}
        {isErrorRDVS && (
          <Alert variant="error">{getErrorMessage(errorRDVS)}</Alert>
        )}
        {rdvs &&
          (rdvs.length > 0 ? (
            <Table bordered striped responsive className="w-100">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Medecin</th>
                  <th>Date de rendez vous</th>
                  <th>Date de reservation</th>
                  <th>Annuler</th>
                </tr>
              </thead>
              <tbody>
                {rdvs.map((rdv) => (
                  <tr key={rdv._id}>
                    <td>
                      <Link to={`/admin/patients/${rdv.patient._id}`}>
                        {rdv.patient.firstName} {rdv.patient.lastName}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/admin/medecins/${rdv.medecin._id}`}>
                        {rdv.medecin.firstName} {rdv.medecin.lastName}
                      </Link>
                    </td>
                    <td>{formatDate(rdv.date)}</td>
                    <td>{formatDate(rdv.createdAt)}</td>
                    <td>
                      <Button
                        disabled={isDeletingRDV}
                        onClick={() => mutateRDV(rdv._id)}
                        variant="warning"
                      >
                        {isDeletingRDV ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          "Annuler"
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">
              Le patient n'a pas encore pris de rendez-vous
            </Alert>
          ))}
      </Container>
    </>
  );
};

export default AdminRendezVous;
