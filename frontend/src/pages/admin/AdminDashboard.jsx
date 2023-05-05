import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col xs="12" md="6" lg="4">
          <Card as={Link} to="/admin/medecins">
            <Card.Header></Card.Header>
            <Card.Body className="text-center">
              <FontAwesomeIcon
                icon={faUserDoctor}
                fontSize={60}
                color="green"
              />
            </Card.Body>
            <Card.Footer className="text-center">
              Voir tous les médecins
            </Card.Footer>
          </Card>
        </Col>
        <Col xs="12" md="6" lg="4">
          <Card as={Link} to="/admin/medecins">
            <Card.Header></Card.Header>
            <Card.Body className="text-center">
              <FontAwesomeIcon
                icon={faUserDoctor}
                fontSize={60}
                color="green"
              />
            </Card.Body>
            <Card.Footer className="text-center">
              Voir tous les médecins
            </Card.Footer>
          </Card>
        </Col>
        <Col xs="12" md="6" lg="4">
          <Card as={Link} to="/admin/medecins">
            <Card.Header></Card.Header>
            <Card.Body className="text-center">
              <FontAwesomeIcon
                icon={faUserDoctor}
                fontSize={60}
                color="green"
              />
            </Card.Body>
            <Card.Footer className="text-center">
              Voir tous les médecins
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
