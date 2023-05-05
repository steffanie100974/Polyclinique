const formatDate = (dateStr) => {
  const date = new Date(dateStr); // get the current date
  const day = date.getDate().toString().padStart(2, "0"); // get the day and pad with leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // get the month (add 1 since it's zero-indexed) and pad with leading zero if needed
  const year = date.getFullYear().toString(); // get the full year
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export default formatDate;
