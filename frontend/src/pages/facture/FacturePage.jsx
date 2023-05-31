import React, { useRef } from "react";
import { useUserContext } from "../../contexts/useUserContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFacture } from "../../api/facture";
import { Alert, Button, Container } from "react-bootstrap";
import logo from "../../assets/logo.svg";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import formatDate from "../../helpers/formatDate";
import { Helmet } from "react-helmet";
const FacturePage = () => {
  const { userToken } = useUserContext();
  const { factureID } = useParams();
  const {
    data: facture,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getFacture(factureID, userToken),
    queryKey: ["factures", factureID],
    onSuccess: (data) => console.log("facture", data),
    onError: (error) => console.log("error get Facture", error),
  });
  const factureRef = useRef(null);

  const handlePrint = () => {
    const content = factureRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Facture</title>
        </head>
        <body>
          <div style="background: white" class="p-3 border border-secondary rounded">
            ${content}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <Helmet>
        <title>Facture details</title>
      </Helmet>
      <div style={{ background: "#F2F3FB" }}>
        <Container
          className="py-3 d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          {isLoading && <Alert variant="info">Chargement du facture...</Alert>}
          {isError && <Alert variant="error">{getErrorMessage(error)}</Alert>}
          {facture && (
            <div className="w-100" style={{ maxWidth: 700 }}>
              <div
                ref={factureRef}
                id="facture"
                style={{ background: "white" }}
                className="p-3 border border-secondary rounded"
              >
                <div className="d-lg-flex justify-content-between align-items-center">
                  <div
                    className="d-flex align-items-center mb-4"
                    style={{ gap: 20 }}
                  >
                    <img src={logo} alt="logo" />
                    <div>
                      <h3>Polyclinique du meknes</h3>
                      <p className="mb-0">Facture</p>
                    </div>
                  </div>
                  <h4 className="mb-0">{formatDate(facture.createdAt)}</h4>
                </div>
                <div
                  className="d-lg-flex w-100 justify-content-between align-items-top p-3"
                  style={{ gap: 20 }}
                >
                  <h4>Details du rendez vous: </h4>
                  <div>
                    <p>ID: {facture.rdv._id}</p>
                    <p>
                      Date de reservation: {formatDate(facture.rdv.createdAt)}
                    </p>
                    <p>Date de rendez vous: {formatDate(facture.rdv.date)}</p>
                    <p>Heure de rendez vous: {facture.rdv.hour}</p>
                  </div>
                </div>
                <div
                  className="d-lg-flex w-100 justify-content-between align-items-top my-3 p-3 rounded"
                  style={{ gap: 20, background: "#ECECEC" }}
                >
                  <h4>Details du facture: </h4>
                  <div>
                    <p>ID: {facture._id}</p>
                    <p>Date de facturation: {formatDate(facture.createdAt)}</p>
                    <p>
                      Date limite de paiement: {formatDate(facture.deadline)}
                    </p>
                    <p>
                      Total:{" "}
                      <b style={{ color: "green" }}>{facture.price} DH</b>
                    </p>
                  </div>
                </div>
                <div className="my-3 d-lg-flex justify-content-between">
                  <div>
                    <h5>Informations du patient:</h5>
                    <p className="text-muted">
                      <small>Patient ID: {facture.rdv.patient._id}</small>
                    </p>
                    <p className="text-muted">
                      <small>
                        Patient nom: {facture.rdv.patient.firstName}{" "}
                        {facture.rdv.patient.lastName}
                      </small>
                    </p>
                    <p className="text-muted">
                      <small>
                        Patient telephone: {facture.rdv.patient.phone}
                      </small>
                    </p>
                    <p className="text-muted">
                      <small>Patient email: {facture.rdv.patient.email}</small>
                    </p>
                  </div>
                  <div>
                    <h5>Informations du medecin:</h5>
                    <p className="text-muted">
                      <small>Medecin ID: {facture.rdv.medecin._id}</small>
                    </p>
                    <p className="text-muted">
                      <small>
                        Medecin nom: {facture.rdv.medecin.firstName}{" "}
                        {facture.rdv.medecin.lastName}
                      </small>
                    </p>
                    <p className="text-muted">
                      <small>
                        Medecin telephone: {facture.rdv.medecin.phone}
                      </small>
                    </p>
                    <p className="text-muted">
                      <small>Medecin email: {facture.rdv.medecin.email}</small>
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="mt-3 d-block ms-auto"
                variant="success"
                onClick={handlePrint}
              >
                Imprimer
              </Button>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default FacturePage;
