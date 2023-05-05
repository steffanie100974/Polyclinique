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
const OrdonnanceForm = ({ setOrdonnances }) => {
  const { user } = useSelector((state) => state.auth);
  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPatientID, setSelectedPatientID] = useState("");
  const [loadingPatients, setLoadingPatients] = useState(false);

  useEffect(() => {
    getAllPatients();
  }, []);

  const getAllPatients = async () => {
    try {
      setLoadingPatients(true);
      const response = await axios.get(`http://localhost:3001/patient`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPatientsList(response.data);
      //   setSelectedPatientID(response.data[0]?._id || "");
    } catch (error) {
      setError("something went wrong");
      console.log("errroor", error);
    } finally {
      setLoadingPatients(false);
    }
  };

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

  const deleteMedicament = (id) => {
    setMedicaments((prevMedicaments) =>
      prevMedicaments.filter((medicament) => medicament.id !== id)
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientID)
      return setError("S'il vous plait selectionnez un patient");
    if (medicaments.length == 0)
      return setError(
        "S'il vous plait prescrire des medicaments a votre patient"
      );
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post(
        "http://localhost:3001/medecin/ordonnances",
        {
          patientID: selectedPatientID,
          description,
          medicaments,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Ordonnance envoyé avec success");
      setOrdonnances((prevOrdonnances) => [...prevOrdonnances, response.data]);
      setMedicaments([]);
      setNomMedicament("");
      setMethodeUtilisation("");
      setDescription("");
      setError("");
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
      {patientsList.length > 0 ? (
        <>
          <Form className="mt-0" onSubmit={handleSubmit}>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
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
                      onClick={() => deleteMedicament(medicament.id)}
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
      )}
    </Card>
  );
};

export default OrdonnanceForm;
