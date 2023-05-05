import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import logo from "../../assets/logo.svg";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../../api/admin";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { useUserContext } from "../../contexts/useUserContext";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const { saveUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error, data, isSuccess } = useMutation({
    mutationFn: () => adminLogin(email, password),
    onSuccess: (data) => {
      saveUser(data);
      navigate("/admin/dashboard");
    },
    onError: (error) => console.log("error login", getErrorMessage(error)),
  });

  const handleLogin = (event) => {
    event.preventDefault();
    mutate(email, password);
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 63px)" }}
    >
      <Card style={{ width: 400, maxWidth: "100%" }}>
        <Card.Header className="d-flex align-items-center justify-content-center">
          <img src={logo} alt="logo" />
          <Card.Title>Admin</Card.Title>
        </Card.Header>
        <Form onSubmit={handleLogin}>
          {isError && <Alert variant="danger">{getErrorMessage(error)}</Alert>}
          {isSuccess && (
            <Alert variant="success">
              Connecté avec succès, vous redirige maintenant...
            </Alert>
          )}
          <Card.Body>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button
              disabled={isLoading}
              className="d-block ms-auto"
              variant="success"
              type="submit"
            >
              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  style={{ color: "white" }}
                />
              ) : (
                "Login"
              )}
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminLogin;
