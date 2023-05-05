import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Alert } from "react-bootstrap";
import "../css/medecinCalendar.css";
const MedecinCalendar = ({ isLoading, futureRDVS, error }) => {
  const events = futureRDVS.map((rdv) => ({
    title: `${rdv.heure} RDV avec ${rdv.patientID.firstName} ${rdv.patientID.lastName}`,
    date: rdv.date,
  }));

  if (isLoading) {
    return <Alert variant="info">Loading your calendar...</Alert>;
  }
  if (error) {
    return <Alert variant="info">{error}</Alert>;
  }

  return (
    <>
      <h3>Calendrier</h3>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </>
  );
};

export default MedecinCalendar;
