import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPatients } from "../api/patient";
import { useUserContext } from "../contexts/useUserContext";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { postOrdonnance } from "../api/ordonnance";
const OrdonnanceForm = () => {
  const { userToken } = useUserContext();
  const queryClient = useQueryClient();
  const [selectedPatientID, setSelectedPatientID] = useState("");
  const {
    data: patientsList,
    isLoading: loadingPatients,
    isError,
    error,
  } = useQuery({
    queryFn: () => getAllPatients(userToken),
    queryKey: ["patients"],
  });

  const {
    mutate,
    isLoading,
    isError: isErrorPost,
    error: errorPost,
  } = useMutation({
    mutationFn: (ordonnanceData) => postOrdonnance(ordonnanceData, userToken),
    onSuccess: () => {
      queryClient.invalidateQueries(["ordonnances"]);
      setMedicaments([]);
      setNomMedicament("");
      setMethodeUtilisation("");
      setDescription("");
    },
  });

  const [showModal, setShowModal] = useState(false);

  const [description, setDescription] = useState("");
  const [nomMedicament, setNomMedicament] = useState("");
  const [methodeUtilisation, setMethodeUtilisation] = useState("");
  const [medicaments, setMedicaments] = useState([]);
  const ajouterMedicament = () => {
    if (!nomMedicament || !methodeUtilisation) return;
    setMedicaments((prevMedicaments) => [
      ...prevMedicaments,
      { id: uuidv4(), name: nomMedicament, methodOfUse: methodeUtilisation },
    ]);
    setNomMedicament("");
    setMethodeUtilisation("");
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientID)
      return toast.error("S'il vous plait selectionnez un patient");
    if (medicaments.length == 0)
      return toast.error(
        "S'il vous plait prescrire des medicaments a votre patient"
      );

    const ordonnanceData = {
      patientID: selectedPatientID,
      description,
      medicaments,
    };

    mutate(ordonnanceData);
  };

  if (loadingPatients) {
    return (
      <Card>
        <FontAwesomeIcon icon={faSpinner} spin />
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Prescrire un médicament à un patient</Card.Title>
      </Card.Header>
      {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}
      {isErrorPost && (
        <Alert variant="danger">{getErrorMessage(errorPost)}</Alert>
      )}
      {loadingPatients && (
        <Alert variant="info">Chargement des patients...</Alert>
      )}
      {patientsList &&
        (patientsList.length > 0 ? (
          <>
            <Form className="mt-0" onSubmit={handleSubmit}>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Patient</Form.Label>

                  <Typeahead
                    id="selectionner patient"
                    labelKey={(option) =>
                      `${option.firstName} ${option.lastName}`
                    }
                    options={patientsList}
                    placeholder="Choisir patient"
                    onChange={(selected) => {
                      if (selected.length > 0)
                        setSelectedPatientID(selected[0]._id);
                      else setSelectedPatientID(null);
                    }}
                    selected={
                      selectedPatientID
                        ? [
                            patientsList.find(
                              (patient) => patient._id === selectedPatientID
                            ),
                          ]
                        : []
                    }
                  />
                </Form.Group>
                <Form.Group
                  className="mt-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Description{" "}
                    <small className="text-secondary">(optionel)</small>
                  </Form.Label>
                  <Form.Control
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <ul className="my-3" style={{ listStyleType: "disc" }}>
                  {medicaments.map((medicament) => (
                    <li
                      className="d-flex align-items-center justify-content-between"
                      key={medicament.id}
                    >
                      <div>
                        <strong>{medicament.name}</strong> ,{" "}
                        {medicament.methodOfUse}
                      </div>
                      <FontAwesomeIcon
                        style={{ cursor: "pointer" }}
                        icon={faTimes}
                        color="red"
                        onClick={() =>
                          setMedicaments((prevMedicaments) =>
                            prevMedicaments.filter(
                              (medicament) => medicament.id !== medicament.id
                            )
                          )
                        }
                      />
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setShowModal(true)}
                  className="my-2 me-auto d-block"
                  variant="secondary"
                >
                  Ajouter medicament
                </Button>
              </Card.Body>
              <Card.Footer>
                <Button
                  disabled={isLoading}
                  className="ms-auto d-block"
                  type="submit"
                >
                  {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Prescrire"
                  )}
                </Button>
              </Card.Footer>
            </Form>

            {/* medicaments modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Ajoutez des medicaments</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    value={nomMedicament}
                    onChange={(e) => setNomMedicament(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Methode d'utilisation</Form.Label>
                  <Form.Control
                    value={methodeUtilisation}
                    onChange={(e) => setMethodeUtilisation(e.target.value)}
                    type="text"
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </Button>
                <Button variant="primary" onClick={ajouterMedicament}>
                  Ajouter
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <Card.Body>
            <Alert variant="info">Aucun patient n'existe</Alert>
          </Card.Body>
        ))}
    </Card>
  );
};

export default OrdonnanceForm;
