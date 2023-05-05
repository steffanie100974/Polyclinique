import React, { useState } from "react";
import formatDate from "../utilities/formatDate";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const SingleMedecinPastRDV = ({ rdv, setFactures }) => {
  const { user } = useSelector((state) => state.auth);
  const [isPostingFacture, setIsPostingFacture] = useState(false);
  const [error, setError] = useState("");

  // modal States
  const [isModalShown, setIsModalShown] = useState(false);
  const [price, setPrice] = useState(0);
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
  );

  const postFacture = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setIsPostingFacture(true);
      const response = await axios.post(
        "http://localhost:3001/factures",
        { price, deadline, rdvID: rdv._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("rdv id", rdv._id);
      toast.success("Facture envoyée avec succès");
      setFactures((prevFactures) => [
        ...prevFactures,
        {
          _id: response.data._id,
          price,
          deadline,
          createdAt: response.data.createdAt,
          rdv: {
            _id: rdv._id,
            patientID: {
              firstName: rdv.patientID.firstName,
              lastName: rdv.patientID.lastName,
            },
          },
        },
      ]);
      setIsPostingFacture(false);
      setIsModalShown(false);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsPostingFacture(false);
    }
  };
  return (
    <>
      <tr className="mt-3">
        <td>{formatDate(rdv.date)}</td>
        <td>{rdv.typeService}</td>
        <td>
          {rdv.patientID.firstName} {rdv.patientID.lastName}
        </td>
        <td>
          <Button variant="secondary" onClick={() => setIsModalShown(true)}>
            Facturer
          </Button>
        </td>
      </tr>

      {/* FACTURATION MODAL */}
      <Modal show={isModalShown} onHide={() => setIsModalShown(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Facturer un patient</Modal.Title>
        </Modal.Header>
        <Form className="mt-0" onSubmit={postFacture}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
              <Form.Label>Patient:</Form.Label>
              <Form.Control
                disabled
                value={`${rdv.patientID.firstName} ${rdv.patientID.lastName}`}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>
                Prix <small>(DH)</small> :
              </Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Date limite pour payer la facture{" "}
                <small>(10 jours par défaut)</small> :
              </Form.Label>
              <DatePicker
                required
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalShown(false)}>
              Annuler
            </Button>
            <Button disabled={isPostingFacture} variant="primary" type="submit">
              {isPostingFacture ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Facturer"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default SingleMedecinPastRDV;
