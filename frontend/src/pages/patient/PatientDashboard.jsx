import React from "react";
import RendezvousCard from "../../components/RendezvousCard";
import PatientFactures from "../../components/PatientFactures";
import PatientOrdonnancesList from "../../components/PatientOrdonnancesList";
import { useUserContext } from "../../contexts/useUserContext";
import { Helmet } from "react-helmet";
const PatientDashboard = () => {
  const { userToken } = useUserContext();
  console.log("patient token", userToken);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard Patient</title>
      </Helmet>

      <div className="p-4">
        <RendezvousCard />
        <PatientFactures />
        <PatientOrdonnancesList />
      </div>
    </>
  );
};

export default PatientDashboard;
