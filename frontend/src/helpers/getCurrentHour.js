const getCurrentHour = () => {
  const currentDate = new Date();
  const hour = currentDate.getHours().toString().padStart(2, "0");
  const currentTime = `${hour}:00`;

  return currentTime;
};

export default getCurrentHour;
