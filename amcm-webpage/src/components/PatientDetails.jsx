import React from "react";
import { Card, Form, Row, Col } from "react-bootstrap";

const PatientDetails = () => {
  return (
    <>
      <Card className="content-column analytics-card shadow-sm p-1 bg-white rounded text-center border-0">
        <h4>Please enter your full details</h4>
      </Card>

      <Form className="patient-details-form mt-5">
        <Row className="justify-content-center">
            <Col md={4}>
          <Form.Group controlId="formFirstName">
            <Form.Control type="text" placeholder="Enter your first name" required />
          </Form.Group>
            </Col>
          <Col md={4}>
          <Form.Group controlId="formLastName">
            <Form.Control type="text" placeholder="Enter your last name" required />
          </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md={4}>
          <Form.Group controlId="formEmail">
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
            </Col>
            <Col md={4}>
          <Form.Group controlId="formPhone">
            <Form.Control type="number" placeholder="Enter your phone number" />
          </Form.Group>
            </Col>
        </Row>
        <Row className="justify-content-center mt-3">
            <Col md={8}>
          <Form.Group controlId="formAddress">
            <Form.Control type="text" placeholder="Enter your address" />
          </Form.Group>
        </Col>
      </Row>
      </Form>
    </>
  );
};

export default PatientDetails;
