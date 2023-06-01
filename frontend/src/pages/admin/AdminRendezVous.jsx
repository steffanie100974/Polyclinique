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
import getCurrentHour from "../../helpers/getCurrentHour";
import compareHours from "../../helpers/compareHours";
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

  const pastRDVS = rdvs
    ? rdvs.filter((rdv) => new Date(rdv.date) < new Date())
    : undefined;
  const futureRDVS = rdvs
    ? rdvs.filter((rdv) => new Date(rdv.date) > new Date())
    : undefined;

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
        {!isLoadingRDVS && isFetching && (
          <Alert variant="info">
            Mise a jour... <FontAwesomeIcon icon={faSpinner} spin />
          </Alert>
        )}
        {isLoadingRDVS && (
          <Alert variant="info">Chargement des rendez vous...</Alert>
        )}
        {isErrorRDVS && (
          <Alert variant="error">{getErrorMessage(errorRDVS)}</Alert>
        )}
        {futureRDVS && (
          <>
            <h3>Rendez-vous futurs</h3>
            {futureRDVS.length > 0 ? (
              <Table bordered striped responsive className="w-100">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Medecin</th>
                    <th>Date de rendez vous</th>
                    <th>Heure</th>
                    <th>Date de reservation</th>
                    <th>Annuler</th>
                  </tr>
                </thead>
                <tbody>
                  {futureRDVS.map((rdv) => (
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
                      <td>{rdv.hour}</td>
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
                Les prochains rendez-vous apparaîtront ici
              </Alert>
            )}
          </>
        )}
        {pastRDVS && (
          <>
            <h3 className="mt-4">Rendez-vous passés</h3>
            {pastRDVS.length > 0 ? (
              <Table bordered striped responsive className="w-100">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Medecin</th>
                    <th>Date de rendez vous</th>
                    <th>Heure</th>
                    <th>Date de reservation</th>
                  </tr>
                </thead>
                <tbody>
                  {pastRDVS.map((rdv) => (
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
                      <td>{rdv.hour}</td>
                      <td>{formatDate(rdv.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="info">
                Les rendez-vous passés apparaîtront ici
              </Alert>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default AdminRendezVous;
