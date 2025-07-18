import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const Information = () => {
  return (
    <>
      <div className="information-container">
        <div className="information-content">
          <div id="information-wrapper-1">
            <div className="information-subContent" id="information-mission">
              <h2>Our Mission</h2>
            </div>

            <div
              className="information-subContent"
              id="information-mission-content"
            >
              <p className="mission">Sharing Jesus Christ Healing Ministry</p>
            </div>
          </div>

          <div id="information-wrapper-2">
            <div className="information-subContent" id="information-values">
              <h2> Values </h2>
            </div>

            <div
              className="information-subContent"
              id="information-values-content"
            >
              <Row>
                <Col>
                  <p className="value">Compassion</p>
                </Col>
                <Col>
                  <p className="value">Integrity</p>
                </Col>
                <Col>
                  <p className="value">Excellence</p>
                </Col>
                <Col>
                  <p className="value">Stewardship</p>
                </Col>
              </Row>
            </div>
          </div>

          <div id="information-wrapper-3">
            <div className="information-subContent" id="information-services">
              <h2>What you can find here</h2>
            </div>
            <div
              className="information-subContent"
              id="information-services-content"
            >
              <Row>
                <Col>
                  <p className="service">Our Services</p>
                </Col>
                <Col>
                  <p className="service">Find Doctors</p>
                </Col>
                <Col>
                  <p className="service">Schedule an Appointment</p>
                </Col>
                <Col>
                  <p className="service">Online Patient Survey</p>
                </Col>
              </Row>
            </div>
          </div>

          <div id="information-wrapper-4">
            <div
              className="information-subContent"
              id="information-achievements"
            >
              <h2>Achievements and Accreditations</h2>
            </div>
            <div
              className="information-subContent"
              id="information-achievements-content"
            >
              <Card>
                <Card.Body>
                  <Card.Title>ISO Award</Card.Title>
                  <Card.Text>
                    <img src="/ISO.png" alt="" />
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>DOH Awardee Healthy Piipinas</Card.Title>
                  <Card.Text>
                    <img src="/healthyPilipinasaward.png" alt="" />
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Daisy award</Card.Title>
                  <Card.Text>
                    <img src="/Daisyaward.png" alt="" />
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>2023 DOH Award</Card.Title>
                  <Card.Text>
                    <img src="/2023DOHAward.png" alt="" />
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="information-wrapper-5">
            <div className="information-subContent" id="information-news">
              <h2>Hospital News</h2>
            </div>
            <div
              className="information-subContent"
              id="information-news-content"
            >
              <p className="news">
                Stay updated with the latest news and events at Adventist
                Medical Center Manila.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
