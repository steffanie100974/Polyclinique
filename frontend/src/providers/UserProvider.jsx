import { useState } from "react";
import { UserContext } from "../contexts/useUserContext";

const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken")
      ? JSON.parse(localStorage.getItem("userToken"))
      : null
  );
  const saveUserToken = (userTokenData) => {
    localStorage.setItem("userToken", JSON.stringify(userTokenData));
    setUserToken(userTokenData);
  };
  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
  };
  const values = { userToken, saveUserToken, logout };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;
