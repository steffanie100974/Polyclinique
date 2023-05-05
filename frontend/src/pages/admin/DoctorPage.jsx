import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getDoctor } from "../../api/admin";
import { useUserContext } from "../../contexts/useUserContext";
import { Alert, Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faStethoscope,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

const DoctorPage = () => {
  const { user } = useUserContext();
  const { id: doctorID } = useParams();
  const {
    data: doctor,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getDoctor(doctorID, user.token),
    queryKey: ["doctors", doctorID],
  });
  console.log("pramas", doctorID);

  return (
    <Container
      className="py-3 d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 53px)" }}
    >
      <Card style={{ maxWidth: "600px" }} className="w-100">
        <Card.Header>
          <Card.Title>Medecin Page</Card.Title>
        </Card.Header>
        {isLoading ? (
          <Card.Body>
            <Alert variant="info">Obtenir les données du médecin...</Alert>
          </Card.Body>
        ) : (
          <Card.Body>
            <Row>
              <Col xs="12" md="6">
                <FontAwesomeIcon
                  icon={faUserDoctor}
                  fontSize={60}
                  color="blue"
                />
                <h3>
                  {doctor?.firstName} {doctor?.lastName}
                </h3>
              </Col>
              <Col xs="12" md="6">
                <div className="my-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faStethoscope} />
                  <p className="mb-0 ms-3">{doctor?.department.name}</p>
                </div>
                <div className="my-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a href={`mailto:${doctor?.email}`} className="mb-0 ms-3">
                    {doctor?.email}
                  </a>
                </div>

                <div className="my-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faPhone} />
                  <a href={`tel:${doctor?.phone}`} className="mb-0 ms-3">
                    {doctor?.phone}
                  </a>
                </div>
              </Col>
            </Row>
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default DoctorPage;
