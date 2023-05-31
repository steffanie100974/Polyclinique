import api from "./api";

export const adminLogin = async (email, password) => {
  const response = await api.post("/admin/login", {
    email,
    password,
  });
  return response.data;
};

export const getMedecins = async (adminToken) => {
  const response = await api.get("/medecin/all", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const addDoctor = async (doctorData, adminToken) => {
  const response = await api.post("/medecin/all", doctorData, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const deleteDoctor = async (doctorID, adminToken) => {
  const response = await api.delete(`/medecin/all/${doctorID}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const resetDoctorPW = async (doctorID, newPassword, adminToken) => {
  const response = await api.patch(
    `/medecin/all/${doctorID}/reset-password`,
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
  const response = await api.get(`/medecin/all/${doctorID}/`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const getAdminProfile = async (adminToken) => {
  const response = await api.get("/admin/profile", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

export const updateAdminProfile = async (updateData, adminToken) => {
  const response = await api.put("/admin/profile", updateData, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};
