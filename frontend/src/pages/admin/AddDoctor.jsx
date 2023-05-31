import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { getDepartments } from "../../api/department";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faPhone,
  faSpinner,
  faStethoscope,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import generateRandomPW from "../../helpers/generateRandomPW";
import validatePhone from "../../helpers/validatePhone";
import validateEmail from "../../helpers/validateEmail";
import { toast } from "react-toastify";
import { addDoctor } from "../../api/admin";
import { useUserContext } from "../../contexts/useUserContext";
import { Helmet } from "react-helmet";

const AddDoctor = () => {
  const { userToken } = useUserContext();
  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    password: generateRandomPW(),
  });
  const {
    data: departmentsData,
    isSuccess: isFetchingDepartmentSuccess,
    isError: isFetchingDepartmentError,
    error: errorFetchingDepartments,
    isLoading: isLoadingDepartments,
  } = useQuery({
    queryFn: () => getDepartments(),
    queryKey: ["departments"],
  });

  const { mutate, isLoading, isSuccess, isError, data, error } = useMutation({
    mutationFn: () => addDoctor(doctor, userToken),
    onSuccess: () =>
      setDoctor({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        password: generateRandomPW(),
      }),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone(doctor.phone)) return toast.error("Numero pas valide");
    if (!validateEmail(doctor.email)) return toast.error("Email pas valide");
    if (doctor.password.length < 6)
      return toast.error(
        "Svp selectionner un mot de passe de minimum 6 characteres"
      );

    mutate();
    console.log("submitted");
  };
  return (
    <>
      <Helmet>
        <title>Ajouter un medecin</title>
      </Helmet>
      <Container
        style={{ minHeight: "calc(100vh - 63px)" }}
        className="py-3 d-flex align-items-center justify-content-center"
      >
        <Card style={{ maxWidth: "500px" }} className="w-100">
          <Card.Header>
            <Card.Title>Ajouter un medecin</Card.Title>
          </Card.Header>
          <Form onSubmit={handleSubmit} className="mt-0">
            <Card.Body>
              {isSuccess && <Alert variant="success">{data.message}</Alert>}
              {isError && (
                <Alert variant="danger">{getErrorMessage(error)}</Alert>
              )}
              <Form.Group className="my-2">
                <Form.Label>
                  Nom <small className="text-muted">(required)</small>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUserDoctor} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    value={doctor.lastName}
                    onChange={(e) =>
                      setDoctor((doctorData) => ({
                        ...doctorData,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-2">
                <Form.Label>
                  Prenom <small className="text-muted">(required)</small>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUserDoctor} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    value={doctor.firstName}
                    onChange={(e) =>
                      setDoctor((doctorData) => ({
                        ...doctorData,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-2">
                <Form.Label>
                  Telephone <small className="text-muted">(required)</small>
                </Form.Label>{" "}
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faPhone} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="tel"
                    value={doctor.phone}
                    onChange={(e) =>
                      setDoctor((doctorData) => ({
                        ...doctorData,
                        phone: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-2">
                <Form.Label>
                  Email <small className="text-muted">(required)</small>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    type="email"
                    value={doctor.email}
                    onChange={(e) =>
                      setDoctor((doctorData) => ({
                        ...doctorData,
                        email: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-2">
                <Form.Label>
                  Departement <small className="text-muted">(required)</small>
                </Form.Label>{" "}
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faStethoscope} />
                  </InputGroup.Text>
                  {isFetchingDepartmentError && (
                    <Alert variant="danger">
                      {getErrorMessage(errorFetchingDepartments)}
                    </Alert>
                  )}
                  {!isLoadingDepartments ? (
                    <Form.Select
                      required
                      value={doctor.department}
                      onChange={(e) =>
                        setDoctor((doctorData) => ({
                          ...doctorData,
                          department: e.target.value,
                        }))
                      }
                    >
                      <option value="Department" disabled>
                        Departement
                      </option>
                      {departmentsData &&
                        departmentsData.map((department) => (
                          <option key={department._id} value={department._id}>
                            {department.name}
                          </option>
                        ))}
                    </Form.Select>
                  ) : (
                    <Alert variant="info">Chargement des departements...</Alert>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group className="my-2">
                <Form.Label>
                  Mot de passe <small className="text-muted">(required)</small>
                </Form.Label>{" "}
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    required
                    value={doctor.password}
                    onChange={(e) =>
                      setDoctor((doctorData) => ({
                        ...doctorData,
                        password: e.target.value,
                      }))
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default AddDoctor;
