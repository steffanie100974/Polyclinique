import React from "react";

// import "../scss/layouts/RdvForm.module.scss";

function RdvForm() {
  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <form action="https://formbold.com/s/FORM_ID" method="POST">
          <div className="full-name">
            <div className="formbold-mb-5">
              <label for="name" className="formbold-form-label">
                nom <span className="require-field">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="nom"
                className="formbold-form-input"
              />
            </div>
            <div className="formbold-mb-5">
              <label for="name" className="formbold-form-label">
                {" "}
                prénom <span className="require-field">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="prénom"
                className="formbold-form-input"
              />
            </div>
          </div>

          <div className="full-name">
            <div className="formbold-mb-5">
              <label for="phone" className="formbold-form-label">
                numéro telephone 1 <span className="require-field">*</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="+212 ..."
                className="formbold-form-input"
              />
            </div>
            <div className="formbold-mb-5">
              <label for="phone" className="formbold-form-label">
                {" "}
                numéro telephone 2{" "}
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="+212 ..."
                className="formbold-form-input"
              />
            </div>
          </div>
          <div className="formbold-mb-5">
            <label for="email" className="formbold-form-label">
              {" "}
              Address email <span className="require-field">*</span>{" "}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="formbold-form-input"
            />
          </div>
          <div className="flex flex-wrap formbold--mx-3">
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5 w-full">
                <label for="date" className="formbold-form-label">
                  {" "}
                  date <span className="require-field">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="formbold-form-input"
                />
              </div>
            </div>
            <div className="w-full sm:w-half formbold-px-3">
              <div className="formbold-mb-5">
                <label for="time" className="formbold-form-label">
                  {" "}
                  Temps <span className="require-field">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="formbold-form-input"
                />
              </div>
            </div>
          </div>

          <div className="formbold-mb-5 formbold-pt-3">
            <label className="formbold-form-label formbold-form-label-2">
              Détails de l'adresse
            </label>
            <div className="flex flex-wrap formbold--mx-3">
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="text"
                    name="post-code"
                    id="post-code"
                    placeholder=" Code postale"
                    className="formbold-form-input"
                  />
                </div>
              </div>
              <div className="w-full sm:w-half formbold-px-3">
                <div className="formbold-mb-5">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="ville "
                    className="formbold-form-input"
                  />
                </div>
              </div>

              <div className="postal-code">
                <div className="formbold-mb-5">
                  <input
                    type="text"
                    name="post-code"
                    id="post-code"
                    placeholder="Adresse"
                    className="formbold-form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button className="formbold-btn">prendre un rendez-vous</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RdvForm;
