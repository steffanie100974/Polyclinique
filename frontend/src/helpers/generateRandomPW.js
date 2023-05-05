const generateRandomPW = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let password = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    password += letters[randomIndex];
  }

  return password;
};

export default generateRandomPW;
