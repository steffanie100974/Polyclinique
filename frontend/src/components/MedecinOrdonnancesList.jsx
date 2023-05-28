import React from "react";
import { Alert, Button, Card } from "react-bootstrap";
import formatDate from "../helpers/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../contexts/useUserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOrdonnance, getDoctorOrdonnances } from "../api/ordonnance";
import { getErrorMessage } from "../helpers/getErrorMessage";
const MedecinOrdonnancesList = () => {
  const { userToken } = useUserContext();
  const queryClient = useQueryClient();
  // query all doctor ordonnances
  const {
    data: ordonnances,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryFn: () => getDoctorOrdonnances(userToken),
    queryKey: ["ordonnances"],
  });

  // delete ordonnance
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (ordonnanceID) => deleteOrdonnance(ordonnanceID, userToken),
    onSuccess: () => queryClient.invalidateQueries(["ordonnances"]),
    onError: (error) => console.log("error delete", error),
  });

  return (
    <>
      {!isLoading && isFetching && <FontAwesomeIcon icon={faSpinner} spin />}
      {isLoading && (
        <Alert variant="info">Chargement de votre ordonnances...</Alert>
      )}
      {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}
      {ordonnances &&
        (ordonnances.length > 0 ? (
          <>
            {ordonnances.map((ordonnance) => (
              <Card className="mb-4" key={ordonnance._id}>
                <Card.Header>
                  <Card.Title>
                    Patient: {ordonnance.patient.firstName}{" "}
                    {ordonnance.patient.lastName}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <p>{ordonnance.description}</p>
                  <ul className="my-3" style={{ listStyleType: "disc" }}>
                    {ordonnance.medicaments.map((medicament) => (
                      <li key={medicament.id}>
                        <strong>{medicament.name}</strong> ,{" "}
                        {medicament.methodOfUse}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer className="d-flex align-items-center justify-content-between">
                  <small>{formatDate(ordonnance.date)}</small>
                  <Button
                    onClick={() => mutate(ordonnance._id)}
                    disabled={isDeleting}
                    variant="outline-warning"
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      color="red"
                      style={{ cursor: "pointer" }}
                    />
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </>
        ) : (
          <Alert variant="info">
            Lorsque vous prescrivez des médicaments à vos patients, ils
            s'affichent ici
          </Alert>
        ))}
    </>
  );
};

export default MedecinOrdonnancesList;
