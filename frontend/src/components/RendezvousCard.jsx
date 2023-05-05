import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const RendezvousCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [departments, setDepartments] = useState([]);
  const [rendezvousLoading, setRendezvousLoading] = useState(false);
  const [selectedDepartmentID, setSelectedDepartmentID] = useState(
    departments[0]?.name || null
  );
  const [selectedDepartmentDoctors, setSelectedDepartmentDoctors] = useState(
    []
  );

  // selected doctor functionality
  const [selectedDoctorID, setSelectedDoctorID] = useState(
    selectedDepartmentDoctors[0]?._id || null
  );

  // date functionality
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const disabledDates = [
    new Date("2023-04-19"),
    new Date("2023-04-21"),
    new Date("2023-04-25"),
  ];
  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  const disabledTimes = ["08:00", "09:00", "13:00"];

  useEffect(() => {
    getAllDepartments();
  }, []);

  useEffect(() => {
    if (!selectedDepartmentID) return;

    getDepartmentDoctors(selectedDepartmentID);
  }, [selectedDepartmentID]);

  const getDepartmentDoctors = async (departmentID) => {
    setRendezvousLoading(true);
    const response = await axios.get(
      `http://localhost:3001/medecin/departmentDoctors/${departmentID}`
    );
    const data = await response.data;
    setSelectedDepartmentDoctors(data);
    setRendezvousLoading(false);
  };

  const getAllDepartments = async () => {
    try {
      setRendezvousLoading(true);
      const response = await axios.get("http://localhost:3001/departments/");
      const departments = response.data;
      setDepartments(departments);
    } catch (err) {
      console.error(err);
    } finally {
      setRendezvousLoading(false);
    }
  };

  useEffect(() => {
    console.log("selected doctor id", selectedDoctorID);
  }, [selectedDoctorID]);
  const scheduleAppointment = async (e) => {
    e.preventDefault();
    const rendezvousData = {
      patientID: user._id,
      medecinID: selectedDoctorID,
      date: selectedDate,
      heure: selectedTime,
      typeService: "Consultation",
    };
    try {
      setRendezvousLoading(true);
      const { data } = await axios.post(
        "http://localhost:3001/rendezvous/",
        rendezvousData
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setRendezvousLoading(false);
    }
  };
  return (
    <section className="rendez-vous">
      <h3>Prenez un rendez vous</h3>
      <Card>
        <Card.Body>
          <Form onSubmit={scheduleAppointment}>
            <Row>
              <Col>
                <Form.Select
                  required
                  onChange={(e) => setSelectedDepartmentID(e.target.value)}
                  aria-label="Departement"
                  value={selectedDepartmentID || "department"}
                >
                  <option disabled value="department">
                    Departement
                  </option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  required
                  onChange={(e) => setSelectedDoctorID(e.target.value)}
                  aria-label="Medecin"
                  value={selectedDoctorID || "medecin"}
                >
                  <option disabled value="medecin">
                    Medecin
                  </option>
                  {selectedDepartmentDoctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <DatePicker
                  required
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  excludeDates={disabledDates}
                  placeholderText="Date"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control
                    required
                    as="select"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="" disabled>
                      Choisir l'heure
                    </option>
                    {hours.map((time) => (
                      <option
                        key={time}
                        value={time}
                        disabled={disabledTimes.includes(time)}
                      >
                        {time}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Button
                  disabled={rendezvousLoading}
                  variant="primary"
                  type="submit"
                >
                  {rendezvousLoading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      style={{ color: "white" }}
                    />
                  ) : (
                    "Prenez rendez vous"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default RendezvousCard;
