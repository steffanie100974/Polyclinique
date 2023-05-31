import api from "./api";
export const postRDV = async (rendezvousData, patientToken) => {
  const response = await api.post("/rendezvous/", rendezvousData, {
    headers: {
      Authorization: `Bearer ${patientToken}`,
    },
  });

  return response.data;
};

export const deleteRDV = async (rdvID) => {
  const response = await api.delete(`/rendezvous/${rdvID}`);
  return response.data;
};

export const getMedecinFutureRDVS = async (medecinToken) => {
  console.log("token to send", medecinToken);
  const response = await api.get("/rendezvous/medecin/future", {
    headers: {
      Authorization: `Bearer ${medecinToken}`,
    },
  });

  return response.data;
};

export const getMedecinRDVS = async (medecinToken) => {
  console.log("token to send", medecinToken);
  const response = await api.get("/rendezvous/medecin", {
    headers: {
      Authorization: `Bearer ${medecinToken}`,
    },
  });

  return response.data;
};

export const getAdminDoctorRDVS = async (idDoctor, adminToken) => {
  const response = await api.get(`/rendezvous/medecin/${idDoctor}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};
export const getPatientRDVS = async (patientToken) => {
  const response = await api.get("/patient/rdvs", {
    headers: {
      Authorization: `Bearer ${patientToken}`,
    },
  });

  return response.data;
};
export const getAdminPatientRDVS = async (idPatient, adminToken) => {
  const response = await api.get(`/patient/${idPatient}/rdvs`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const getAllRDVS = async (adminToken) => {
  const response = await api.get("/rendezvous/all", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};
