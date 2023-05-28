import React from "react";
import RendezvousCard from "../../components/RendezvousCard";
import PatientFactures from "../../components/PatientFactures";
import PatientOrdonnancesList from "../../components/PatientOrdonnancesList";
const PatientDashboard = () => {
  return (
    <div className="p-4">
      <RendezvousCard />
      <PatientFactures />
      <PatientOrdonnancesList />
    </div>
  );
};

export default PatientDashboard;
