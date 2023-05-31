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
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import doctorImage from "../../assets/doctor-image.jpg";
import { getAdminDoctorRDVS } from "../../api/rendezvous";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Helmet } from "react-helmet";

const DoctorPage = () => {
  const { userToken } = useUserContext();
  const { id: doctorID } = useParams();
  const {
    data: doctor,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getDoctor(doctorID, userToken),
    queryKey: ["doctors", doctorID],
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const {
    data: rdvs,
    isErrorRDVS,
    isLoadingRDVS,
    errorRDVS,
  } = useQuery({
    queryKey: ["doctors", doctorID, "rdvs"],
    queryFn: () => getAdminDoctorRDVS(doctorID, userToken),
    onError: (error) => console.log("error get rdvs", error),
  });

  const events =
    rdvs &&
    rdvs.map((rdv) => ({
      title: `${rdv.hour} RDV avec ${rdv.patient.firstName} ${rdv.patient.lastName}`,
      date: rdv.date,
    }));

  return (
    <>
      <Helmet>
        <title>Medecin</title>
      </Helmet>
      <Container
        className="py-3 d-lg-flex align-items-center justify-content-center flex-wrap"
        style={{ minHeight: "calc(100vh - 53px)", columnGap: 30, rowGap: 15 }}
      >
        <Card
          style={{ flexBasis: 350, flexGrow: 0, flexShrink: 1 }}
          className="w-100"
        >
          <Card.Header>
            <Card.Title>Medecin Details</Card.Title>
          </Card.Header>

          <Card.Body>
            {isLoading && (
              <Alert variant="info">Obtenir les données du médecin...</Alert>
            )}
            {isError && <Alert variant="info">{getErrorMessage(error)}</Alert>}
            {doctor && (
              <div>
                <img
                  className="d-block mx-auto"
                  src={doctorImage}
                  width={200}
                  height={200}
                  style={{ borderRadius: "50%" }}
                />
                <h3>
                  {doctor.firstName} {doctor.lastName}
                </h3>

                <div className="my-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faStethoscope} />
                  <p className="mb-0 ms-3">{doctor.department.name}</p>
                </div>
                <div className="my-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a href={`mailto:${doctor.email}`} className="mb-0 ms-3">
                    {doctor.email}
                  </a>
                </div>

                <div className="my-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faPhone} />
                  <a href={`tel:${doctor.phone}`} className="mb-0 ms-3">
                    {doctor.phone}
                  </a>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
        <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: 600 }}>
          <h4>
            Calendrier du {doctor?.firstName} {doctor?.lastName}
          </h4>
          {isLoadingRDVS && (
            <Alert variant="info">Loading your calendar...</Alert>
          )}
          {isErrorRDVS && (
            <Alert variant="error">{getErrorMessage(errorRDVS)}</Alert>
          )}
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
          />
        </div>
      </Container>
    </>
  );
};

export default DoctorPage;
