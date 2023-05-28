import api from "./api";

export const getPatientOrdonnances = async (patientToken) => {
  const response = await api.get("/patient/ordonnances", {
    headers: {
      Authorization: `Bearer ${patientToken}`,
    },
  });

  return response.data;
};

export const getDoctorOrdonnances = async (doctorToken) => {
  const response = await api.get("/ordonnances/medecin", {
    headers: {
      Authorization: `Bearer ${doctorToken}`,
    },
  });
  return response.data;
};

export const deleteOrdonnance = async (ordonnanceID, doctorToken) => {
  const response = await api.delete(`/ordonnances/${ordonnanceID}`, {
    headers: {
      Authorization: `Bearer ${doctorToken}`,
    },
  });

  return response.data;
};

export const postOrdonnance = async (ordonnanceData, doctorToken) => {
  const response = await api.post("/medecin/ordonnances", ordonnanceData, {
    headers: {
      Authorization: `Bearer ${doctorToken}`,
    },
  });
  return response.data;
};
