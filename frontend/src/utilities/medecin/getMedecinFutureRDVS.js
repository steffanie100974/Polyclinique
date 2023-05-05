const getMedecinFutureRDVS = async (token) => {
  console.log("function called");
  console.log("token", token);
  const response = await axios.get(
    "http://localhost:3001/medecin/futureAppointments/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("respoooad", response);
  return response;
};

export default getMedecinFutureRDVS;
