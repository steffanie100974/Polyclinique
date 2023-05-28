import api from "./api";

export const patientSignup = async (patientData) => {
  const response = await api.post("/patient/register", patientData);

  return response.data;
};
export const patientLogin = async (patientData) => {
  const response = await api.post("/patient/login", patientData);
  return response.data;
};

export const getPatientProfile = async (patientToken) => {
  if (!patientToken) return;
  const response = await api.get(`/patient`, {
    headers: {
      Authorization: `Bearer ${patientToken}`,
    },
  });

  return response.data;
};

export const getMedecinPatients = async (medecinToken) => {
  if (!medecinToken) return;
  console.log("medecin token to send", medecinToken);
  const response = await api.get(`/medecin/patients`, {
    headers: {
      Authorization: `Bearer ${medecinToken}`,
    },
  });

  return response.data;
};

export const getAllPatients = async (doctorPatient) => {
  const response = await api.get(`/patient/all`, {
    headers: {
      Authorization: `Bearer ${doctorPatient}`,
    },
  });
  return response.data;
};
