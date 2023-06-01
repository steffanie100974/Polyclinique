import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import formatDate from "../helpers/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPhone,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRDV } from "../api/rendezvous";
import { toast } from "react-toastify";
import { getErrorMessage } from "../helpers/getErrorMessage";

const RDVCard = ({ rdv }) => {
  const [showPhone, setShowPhone] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (rdvID) => deleteRDV(rdvID),
    onSuccess: () => {
      toast.success("Rendez vous annulé avec success");
      queryClient.invalidateQueries(["rendezvous"]);
    },
    onError: (error) => {
      console.log("error delete rdv", error);
      toast.error(getErrorMessage(error));
    },
  });
  return (
    <Col className="mt-2" xs="12" md="6" lg="4">
      <Card>
        <Card.Header>
          {formatDate(rdv.date)} à <strong>{rdv.hour}</strong>
        </Card.Header>
        <Card.Body>
          <p>
            Patient:{" "}
            <b>
              {rdv.patient.firstName} {rdv.patient.lastName}
            </b>
          </p>

          {showPhone && (
            <p>
              <FontAwesomeIcon icon={faPhone} /> {rdv.patient.phone}
            </p>
          )}
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <Button
            onClick={() => mutate(rdv._id)}
            className="me-3"
            variant="outline-danger"
            disabled={isLoading}
          >
            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Annuler"}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setShowPhone((prevValue) => !prevValue)}
          >
            Appeler{" "}
            <FontAwesomeIcon icon={showPhone ? faChevronDown : faChevronUp} />
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default RDVCard;
