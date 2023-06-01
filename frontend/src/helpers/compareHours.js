const compareHours = (hour1, hour2) => {
  const [hour1Value, minute1] = hour1.split(":");
  const [hour2Value, minute2] = hour2.split(":");

  if (parseInt(hour1Value) > parseInt(hour2Value)) {
    return true;
  } else if (parseInt(hour1Value) === parseInt(hour2Value)) {
    if (parseInt(minute1) > parseInt(minute2)) {
      return true;
    }
  }

  return false;
};

export default compareHours;
