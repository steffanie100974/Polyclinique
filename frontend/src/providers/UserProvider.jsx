import { useState } from "react";
import { UserContext } from "../contexts/useUserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const saveUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const values = { user, saveUser };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;
