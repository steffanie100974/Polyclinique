import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import formatDate from "../utilities/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
const MedecinOrdonnancesList = ({ ordonnances, setOrdonnances }) => {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getMedecinOrdonnances();
  }, []);

  const getMedecinOrdonnances = async () => {
    try {
      setError(false);
      setIsLoading(true);

      const response = await axios.get(
        "http://localhost:3001/medecin/ordonnances",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOrdonnances(response.data);
      setIsLoading(false);
    } catch (error) {
      setError("Something went wrong");
      console.log("errooor", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrdonnance = async (_id) => {
    try {
      setError("");
      setIsLoading(true);
      await axios.delete(`http://localhost:3001/medecin/ordonnances/${_id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrdonnances((prevOrdonnances) =>
        prevOrdonnances.filter((ordonnance) => ordonnance._id !== _id)
      );
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Alert variant="info">Chargement de votre ordonnances...</Alert>;
  }
  return ordonnances.length > 0 ? (
    <>
      {ordonnances.map((ordonnance) => (
        <Card className="mb-4" key={ordonnance._id}>
          <Card.Header>
            <Card.Title>
              Patient: {ordonnance.patientID.firstName}{" "}
              {ordonnance.patientID.lastName}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <p>{ordonnance.description}</p>
            <ul className="my-3" style={{ listStyleType: "disc" }}>
              {ordonnance.medicaments.map((medicament) => (
                <li key={medicament.id}>
                  <strong>{medicament.name}</strong> , {medicament.methodOfUse}
                </li>
              ))}
            </ul>
          </Card.Body>
          <Card.Footer className="d-flex align-items-center justify-content-between">
            <small>{formatDate(ordonnance.date)}</small>
            <FontAwesomeIcon
              onClick={() => deleteOrdonnance(ordonnance._id)}
              icon={faTimesCircle}
              color="red"
              style={{ cursor: "pointer" }}
            />
          </Card.Footer>
        </Card>
      ))}
    </>
  ) : (
    <Alert variant="info">
      Lorsque vous prescrivez des médicaments à vos patients, ils s'affichent
      ici
    </Alert>
  );
};

export default MedecinOrdonnancesList;
