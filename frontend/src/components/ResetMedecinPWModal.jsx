import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../contexts/useUserContext";
import { deleteDoctor, resetDoctorPW } from "../api/admin";
import { Alert, Form } from "react-bootstrap";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import generateRandomPW from "../helpers/generateRandomPW";
import { toast } from "react-toastify";
const ResetMedecinPWModal = ({ id, show, setShow }) => {
  const { user } = useUserContext();
  const handleClose = () => setShow(false);

  const { mutate, isError, error, isLoading } = useMutation({
    mutationFn: () => resetDoctorPW(id, password, user.token),
    onSuccess: (data) => {
      handleClose();
      toast.success(data.message);
      setPassword("");
    },
  });
  const [password, setPassword] = useState(generateRandomPW());
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer un médecin</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <Modal.Body>
            {isError && (
              <Alert variant="danger">{getErrorMessage(error)}</Alert>
            )}

            <Form.Group>
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button disabled={isLoading} variant="info" type="submit">
              {isLoading ? (
                <FontAwesomeIcon spin icon={faSpinner} />
              ) : (
                "Réinitialiser le mot de passe"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ResetMedecinPWModal;
