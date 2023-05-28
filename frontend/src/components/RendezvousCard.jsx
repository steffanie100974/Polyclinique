import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { hours } from "../helpers/workHours";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postRDV } from "../api/rendezvous";
import { useUserContext } from "../contexts/useUserContext";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { getDepartments } from "../api/department";
import { getDepartmentDoctors } from "../api/medecin";
const RendezvousCard = () => {
  const { userToken } = useUserContext();
  const [selectedDepartmentID, setSelectedDepartmentID] = useState(null);

  // query all departments
  const { data: departments, isLoading: isLoadingDepartments } = useQuery({
    queryFn: () => getDepartments(),
    queryKey: ["departments"],
    onSuccess: (departments) => setSelectedDepartmentID(departments[0]._id),
  });

  // get selected department doctors
  const {
    data: selectedDepartmentDoctors,
    isLoading: isLoadingDepartmentDoctors,
    isFetching: isFetchingDepartmentDoctors,
    refetch: refetchDepartmentDoctors,
  } = useQuery({
    queryFn: () => getDepartmentDoctors(selectedDepartmentID),
    queryKey: ["doctors", { departmentID: selectedDepartmentID }],
    enabled: selectedDepartmentID ? true : false,
  });

  useEffect(() => {
    if (!selectedDepartmentID) return;
    refetchDepartmentDoctors();
  }, [selectedDepartmentID]);

  // make appointment
  const queryClient = useQueryClient();
  const { mutate, isLoading: rendezVousLoading } = useMutation({
    mutationFn: (rendezvousData) => postRDV(rendezvousData, userToken),
    onSuccess: (data) => {
      toast.success(data.message);
      setSelectedDate(null);
      setSelectedTime("");
      setSelectedDoctorID(null);
      queryClient.invalidateQueries(["rendezvous"]);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const isLoading =
    rendezVousLoading ||
    isLoadingDepartments ||
    isLoadingDepartmentDoctors ||
    isFetchingDepartmentDoctors;

  // selected doctor functionality
  const [selectedDoctorID, setSelectedDoctorID] = useState(
    selectedDepartmentDoctors ? selectedDepartmentDoctors[0]._id : null
  );

  // date functionality
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const scheduleAppointment = async (e) => {
    e.preventDefault();
    const rendezvousData = {
      medecinID: selectedDoctorID,
      date: selectedDate,
      hour: selectedTime,
    };
    console.log("rendez vous data", rendezvousData);
    mutate(rendezvousData);
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
                  {departments &&
                    departments.map((department) => (
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
                  {selectedDepartmentDoctors &&
                    selectedDepartmentDoctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.firstName} {doctor.lastName}
                      </option>
                    ))}
                </Form.Select>
              </Col>
              <Col>
                <DatePicker
                  minDate={new Date()}
                  required
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
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
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Button disabled={isLoading} variant="primary" type="submit">
                  {isLoading ? (
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
