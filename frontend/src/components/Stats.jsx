import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "../api/stats";
import { useUserContext } from "../contexts/useUserContext";
import { Card, Col, Container, Row } from "react-bootstrap";

const Stats = () => {
  const { userToken } = useUserContext();
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getStats(userToken),
    queryKey: ["stats"],
    onSuccess: (data) => console.log("stats", data),
    onError: (error) => console.log("error stats", error),
  });

  return (
    <Container>
      <h3 className="mb-4">Statistiques</h3>
      {isLoading && <div>Chargement des statistiques...</div>}
      {isError && <div>Erreur lors du chargement des statistiques</div>}
      {stats && (
        <Row xs={1} md={3} className="g-4">
          <Col>
            <Card bg="primary" text="white">
              <Card.Body>
                <Card.Title>Nombre de nouveaux patients</Card.Title>
                <Card.Text>
                  <strong>{stats.newPatientsCount}</strong> nouveaux patients ce
                  mois-ci
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="success" text="white">
              <Card.Body>
                <Card.Title>Nombre de rendez-vous réservés</Card.Title>
                <Card.Text>
                  <strong>{stats.newRDVSCount}</strong> rendez-vous réservés ce
                  mois-ci
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="warning" text="white">
              <Card.Body>
                <Card.Title>Revenu du mois</Card.Title>
                <Card.Text>
                  <strong>{stats.monthRevenue}</strong> dirhams de revenu ce
                  mois-ci
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="info" text="white">
              <Card.Body>
                <Card.Title>Nombre total de patients</Card.Title>
                <Card.Text>
                  <strong>{stats.patientsCount}</strong> patients au total
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="secondary" text="white">
              <Card.Body>
                <Card.Title>Nombre total de rendez-vous</Card.Title>
                <Card.Text>
                  <strong>{stats.rdvsCount}</strong> rendez-vous au total
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="danger" text="white">
              <Card.Body>
                <Card.Title>Revenu total</Card.Title>
                <Card.Text>
                  <strong>{stats.totalRevenue}</strong> dirhams de revenu au
                  total
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="primary" text="white">
              <Card.Body>
                <Card.Title>Nombre de médecins</Card.Title>
                <Card.Text>
                  <strong>{stats.doctorsCount}</strong> médecins au total
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Stats;
