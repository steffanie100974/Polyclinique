import React, { FC } from "react";

//Styling
import "../css/SpinnerTheme.module.css";

const Spinner: FC = () => {
  return (
    <div className="spinner-container">
      <div className="lds-heart">
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
