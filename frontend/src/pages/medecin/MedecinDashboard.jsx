import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MedecinFutureRDVS from "../../components/MedecinFutureRDVS";
import MedecinCalendar from "../../components/MedecinCalendar";
import { Col, Container, Row } from "react-bootstrap";
import MedecinPatients from "../../components/MedecinPatients";

const MedecinDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [futureRDVS, setFutureRDVS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    getMedecinFutureRDVS();
  }, []);
  const getMedecinFutureRDVS = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:3001/medecin/futureAppointments/",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFutureRDVS(response.data);
    } catch (error) {
      console.log("errooor", error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col className="mt-2 mt-lg-0" xs="12" lg="6">
          <MedecinFutureRDVS
            futureRDVS={futureRDVS}
            isLoading={isLoading}
            error={error}
          />
        </Col>
        <Col className="my-4 mt-lg-0" xs="12" lg="6">
          <MedecinCalendar
            futureRDVS={futureRDVS}
            isLoading={isLoading}
            error={error}
          />
        </Col>
      </Row>
      <MedecinPatients />
    </Container>
  );
};

export default MedecinDashboard;
