import React from "react";
import { useParams } from "react-router-dom";
const Department = () => {
  const { departmentName } = useParams();
  console.log(departmentName);
  return <h2>{departmentName}</h2>;
};

export default Department;
