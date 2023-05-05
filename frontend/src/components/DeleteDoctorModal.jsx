import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUserContext } from "../contexts/useUserContext";
import { deleteDoctor } from "../api/admin";
import { Alert } from "react-bootstrap";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const DeleteDoctorModal = ({ id, show, setShow }) => {
  const queryClient = useQueryClient();

  const { user } = useUserContext();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { mutate, isError, error, isLoading } = useMutation({
    mutationFn: () => deleteDoctor(id, user.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Medecin supprimé avec success");
      handleClose();
    },
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer un médecin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}
          Voulez-vous vraiment supprimer ce médecin ? il perdra l'accès au site
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button disabled={isLoading} variant="danger" onClick={mutate}>
            {isLoading ? (
              <FontAwesomeIcon spin icon={faSpinner} />
            ) : (
              "Supprimer"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteDoctorModal;
