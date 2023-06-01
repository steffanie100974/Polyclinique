import api from "./api";

export const getStats = async (adminToken) => {
  const response = await api.get("/stats", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};
