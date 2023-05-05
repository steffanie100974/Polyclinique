import api from "./api";

// errors ghaythandlaw b react-query

export const adminLogin = async (email, password) => {
  const response = await api.post("/admin/login", {
    email,
    password,
  });
  return response.data;
};

export const getMedecins = async (adminToken) => {
  const response = await api.get("/medecin", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const addDoctor = async (doctorData, adminToken) => {
  const response = await api.post("/medecin", doctorData, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const deleteDoctor = async (doctorID, adminToken) => {
  const response = await api.delete(`/medecin/${doctorID}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const resetDoctorPW = async (doctorID, newPassword, adminToken) => {
  const response = await api.patch(
    `/medecin/${doctorID}/reset-password`,
    {
      password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  return response.data;
};

export const getDoctor = async (doctorID, adminToken) => {
  const response = await api.get(`/medecin/${doctorID}/`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};
