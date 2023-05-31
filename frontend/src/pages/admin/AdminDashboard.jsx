import {
  faCalendar,
  faMoneyBills,
  faSuitcaseMedical,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
      </Helmet>
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
            <Card as={Link} to="/admin/patients">
              <Card.Header></Card.Header>
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faSuitcaseMedical}
                  fontSize={60}
                  color="green"
                />
              </Card.Body>
              <Card.Footer className="text-center">
                Voir tous les patients
              </Card.Footer>
            </Card>
          </Col>
          <Col xs="12" md="6" lg="4">
            <Card as={Link} to="/admin/rendezvous">
              <Card.Header></Card.Header>
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faCalendar}
                  fontSize={60}
                  color="green"
                />
              </Card.Body>
              <Card.Footer className="text-center">
                Voir tous les rendez-vous
              </Card.Footer>
            </Card>
          </Col>
          <Col className="mt-4" xs="12" md="6" lg="4">
            <Card as={Link} to="/admin/factures">
              <Card.Header></Card.Header>
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faMoneyBills}
                  fontSize={60}
                  color="green"
                />
              </Card.Body>
              <Card.Footer className="text-center">
                Archive des factures
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
