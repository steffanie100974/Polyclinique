import api from "./api";

export const medecinLogin = async (loginCredentials) => {
  const response = await api.post("/medecin/login", loginCredentials);
  return response.data;
};

export const getDepartmentDoctors = async (departmentID) => {
  console.log("query with this id", departmentID);
  const response = await api.get(`/medecin/department/${departmentID}`);
  return response.data;
};

export const getDoctorProfile = async (doctorToken) => {
  const response = await api.get("/medecin", {
    headers: {
      Authorization: `Bearer ${doctorToken}`,
    },
  });

  return response.data;
};

export const updateDoctorProfile = async (updateData, doctorToken) => {
  const response = await api.put("/medecin", updateData, {
    headers: {
      Authorization: `Bearer ${doctorToken}`,
    },
  });

  return response.data;
};
