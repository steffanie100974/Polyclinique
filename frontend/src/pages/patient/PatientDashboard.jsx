import React from "react";
import { useSelector } from "react-redux";
import "../../css/PatientDashboard.css";
import RendezvousCard from "../../components/RendezvousCard";
import PatientFactures from "../../components/PatientFactures";
import PatientOrdonnances from "../../components/PatientOrdonnances";
const PatientDashboard = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="patient-dashboard">
      <RendezvousCard />
      <PatientFactures />
      <PatientOrdonnances />
    </div>
  );
};

export default PatientDashboard;
