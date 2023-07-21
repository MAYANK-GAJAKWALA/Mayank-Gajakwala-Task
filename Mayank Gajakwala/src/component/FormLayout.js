import { useState } from 'react';
import { Container, Button, Col, Form, Card, Row, ListGroup, InputGroup } from 'react-bootstrap';

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [allStudentData, setAllStudentData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const filterStudentData = () => {
    setStudentData(allStudentData.filter(function (singleStudent) {
      return singleStudent.firstName.toLowerCase().includes(searchText)
        || singleStudent.lastName.toLowerCase().includes(searchText)
        || singleStudent.emailAddress.toLowerCase().includes(searchText)
        || singleStudent.serialNumber.toLowerCase().includes(searchText);
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return false;
    }
    setValidated(true);
    allStudentData.push({
      firstName: form.elements[0].value,
      lastName: form.elements[1].value,
      emailAddress: form.elements[2].value,
      serialNumber: form.elements[3].value
    });
    setAllStudentData(allStudentData);
    filterStudentData();
    form.reset();
  };

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
    filterStudentData();
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>
                <Card.Title>Insert Student Data</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid First Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom02">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Last Name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom03">
                    <Form.Label>E-Mail ID</Form.Label>
                    <Form.Control type="email" placeholder="E-Mail ID" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid E-Mail ID.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="validationCustom04">
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control type="number" placeholder="Serial Number" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Serial Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br />
                  <Button type="submit">Submit form</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Header>
                <Card.Title>List of Students</Card.Title>
                <div className="ms-12">
                  <div className="fw-bold">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Search Text"
                        aria-describedby="inputSearch"
                        onChange={handleSearchText}
                        required
                      />
                      <InputGroup.Text id="inputSearch"><img alt='search' src='search.png' /></InputGroup.Text>
                    </InputGroup>
                  </div>
                </div>
              </Card.Header>
              <Card.Body style={{
                "overflow-x": "hidden",
                "overflow-y": "scroll",
              }}>
                <ListGroup>
                  {
                    studentData.length > 0 ?
                      studentData.map((student, index) => (
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start"
                          key={'student_' + index}
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{student.firstName + ' ' + student.lastName}</div>
                            <div>{'E-Mail : ' + student.emailAddress}</div>
                            <div>{'Serial NO. : ' + student.serialNumber}</div>
                          </div>
                        </ListGroup.Item>
                      )) : <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="fw-bold" style={{ "width": "100%", "textAlign": "center" }}>No Data Found</div>
                      </ListGroup.Item>
                  }
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormExample;