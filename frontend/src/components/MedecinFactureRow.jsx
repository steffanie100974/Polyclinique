import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import formatDate from "../utilities/formatDate";
import { Button } from "react-bootstrap";

const MedecinFactureRow = ({ facture, setFactures }) => {
  const { user } = useSelector((state) => state.auth);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFacture = async (id) => {
    try {
      setIsDeleting(true);
      await axios.delete(
        `http://localhost:3001/factures/${id}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Facture suprimé avec succès");
      setFactures((prevFactures) =>
        prevFactures.filter((facture) => facture._id !== id)
      );
    } catch (error) {
      console.log("eroooor", error);
      toast.error(error.response.data.message);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <tr key={facture._id}>
      <td>
        {facture.rdv.patientID.firstName} {facture.rdv.patientID.lastName}
      </td>
      <td>{facture.price}</td>
      <td>{facture.createdAt && formatDate(facture.createdAt)}</td>
      <td>{formatDate(facture.deadline)}</td>
      <td>
        <Button
          disabled={isDeleting}
          variant="danger"
          onClick={() => deleteFacture(facture._id)}
        >
          {isDeleting ? <FontAwesomeIcon icon={faSpinner} spin /> : "Supprimer"}
        </Button>
      </td>
    </tr>
  );
};

export default MedecinFactureRow;
