import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { getMedecins } from "../../api/admin";
import { useUserContext } from "../../contexts/useUserContext";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormSelect,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { getDepartments } from "../../api/department";
import { Link } from "react-router-dom";
import DeleteDoctorModal from "../../components/DeleteDoctorModal";
import ResetMedecinPWModal from "../../components/ResetMedecinPWModal";

const AdminDoctors = () => {
  const { userToken } = useUserContext();
  console.log("admin token", userToken);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () => getMedecins(userToken),
    queryKey: ["doctors"],
    onSuccess: (data) => setMedecins(data),
  });

  const [medecins, setMedecins] = useState(undefined);
  const { data: departmentsData } = useQuery({
    queryFn: () => getDepartments(),
    queryKey: ["departments"],
    enabled: data != undefined,
  });
  const [medecinNameToSearch, setMedecinNameToSearch] = useState("");

  const [departmentToFilterBy, setDepartmentToFilterBy] =
    useState("Department");

  useEffect(() => {
    if (!medecinNameToSearch && departmentToFilterBy == "Department") {
      refetch();
    } else {
      filterMedecins();
    }
  }, [medecinNameToSearch, departmentToFilterBy]);

  // delete doctor
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [doctorIDToDelete, setDoctorIDToDelete] = useState(null);
  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setDoctorIDToDelete(id);
  };

  // reset doctor password
  const [showResetModal, setShowResetModal] = useState(false);
  const [doctorIDToReset, setDoctorIDToReset] = useState(null);

  const handleReset = (id) => {
    setShowResetModal(true);
    setDoctorIDToReset(id);
  };

  const filterMedecins = () => {
    const filtered = data.filter((medecin) => {
      let shouldStay = true;
      if (medecinNameToSearch && departmentToFilterBy !== "Department") {
        shouldStay =
          (medecin.firstName
            .toLowerCase()
            .includes(medecinNameToSearch.toLowerCase()) ||
            medecin.lastName
              .toLowerCase()
              .includes(medecinNameToSearch.toLowerCase())) &&
          medecin.department._id == departmentToFilterBy;

        return shouldStay;
      }
      if (medecinNameToSearch) {
        shouldStay =
          medecin.firstName
            .toLowerCase()
            .includes(medecinNameToSearch.toLowerCase()) ||
          medecin.lastName
            .toLowerCase()
            .includes(medecinNameToSearch.toLowerCase());
      }
      if (departmentToFilterBy !== "Department") {
        shouldStay = medecin.department._id == departmentToFilterBy;
      }
      return shouldStay;
    });
    setMedecins(filtered);
  };
  return (
    <Container className="py-4">
      <h3 className="mb-3">Medecins:</h3>
      {isLoading && <Alert variant="info">Chargements des medecins...</Alert>}
      {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}
      {medecins && (
        <>
          <Row className="mb-4">
            <Col xs="12" md="6" lg="4">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faUserDoctor} />
                </InputGroup.Text>
                <Form.Control
                  value={medecinNameToSearch}
                  onChange={(e) => setMedecinNameToSearch(e.target.value)}
                  placeholder="Rechercher par nom ou prénom..."
                />
              </InputGroup>
            </Col>
            <Col xs="12" md="6" lg="4">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faStethoscope} />
                </InputGroup.Text>
                <Form.Select
                  value={departmentToFilterBy}
                  onChange={(e) => setDepartmentToFilterBy(e.target.value)}
                >
                  <option value="Department">Departement</option>
                  {departmentsData &&
                    departmentsData.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                </Form.Select>
              </InputGroup>
            </Col>
            <Col
              xs="12"
              md="6"
              lg="4"
              className="d-flex justify-content-end align-items-start"
            >
              <Button as={Link} to="/admin/ajouter-medecin" variant="success">
                Ajouter un medecin
              </Button>
            </Col>
          </Row>
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Prenom et nom</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Departement</th>
                <th>Réinitialiser mot de passe</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {medecins.map((medecin) => (
                <tr key={medecin._id}>
                  <td>
                    <Button
                      variant="link"
                      as={Link}
                      to={`/admin/medecins/${medecin._id}`}
                    >
                      {medecin.firstName} {medecin.lastName}
                    </Button>
                  </td>
                  <td>{medecin.email}</td>
                  <td>{medecin.phone}</td>
                  <td>{medecin.department.name}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => handleReset(medecin._id)}
                    >
                      Réinitialiser
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(medecin._id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <DeleteDoctorModal
            id={doctorIDToDelete}
            show={showDeleteModal}
            setShow={setShowDeleteModal}
          />
          <ResetMedecinPWModal
            id={doctorIDToReset}
            show={showResetModal}
            setShow={setShowResetModal}
          />
        </>
      )}
    </Container>
  );
};

export default AdminDoctors;
