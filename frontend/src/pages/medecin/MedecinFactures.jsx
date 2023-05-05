import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MedecinPastRDVS from "../../components/MedecinPastRDVS";
import { Container } from "react-bootstrap";
import MedecinFacturesTable from "../../components/MedecinFacturesTable";

const MedecinFactures = () => {
  const { user } = useSelector((state) => state.auth);

  // past rdvs states
  const [pastRDVS, setPastRDVS] = useState([]);
  const [loadingRDVS, setLoadingRDVS] = useState(false);
  const [errorRDVS, setErrorRDVS] = useState("");

  // factures states
  const [loadingFactures, setLoadingFactures] = useState(false);
  const [factures, setFactures] = useState([]);
  const [errorFactures, setErrorFactures] = useState("");

  useEffect(() => {
    getMedecinPastRDVS();
    getMedecinFactures();
  }, []);

  const getMedecinPastRDVS = async () => {
    try {
      setLoadingRDVS(true);
      const response = await axios.get(
        "http://localhost:3001/medecin/pastAppointments/",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("rdv passes", response.data);
      setPastRDVS(response.data);
    } catch (error) {
      console.log("errooor", error);
      setErrorRDVS(error.response.data.message);
    } finally {
      setLoadingRDVS(false);
    }
  };

  const getMedecinFactures = async () => {
    try {
      setLoadingFactures(true);
      const response = await axios.get(
        "http://localhost:3001/medecin/factures/",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("medecin factures", response.data);
      setFactures(response.data);
    } catch (error) {
      console.log("errooor medecin factures", error);
      setErrorFactures(error.response.data.message);
    } finally {
      setLoadingFactures(false);
    }
  };

  return (
    <Container className="py-4">
      <MedecinPastRDVS
        error={errorRDVS}
        isLoading={loadingRDVS}
        pastRDVS={pastRDVS}
        setFactures={setFactures}
      />
      <MedecinFacturesTable
        isLoading={loadingFactures}
        error={errorFactures}
        factures={factures}
        setFactures={setFactures}
      />
    </Container>
  );
};

export default MedecinFactures;
