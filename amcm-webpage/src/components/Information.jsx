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

          <div className="preident-message">
            <div className="information-subContent" id="information-president">
              <h2>Message from the President</h2>
            </div>
            <div
              className="information-subContent"
              id="information-president-content"
            >
              <p className="president-message">
                It is with great delight that I welcome you all to our
                hospital's website. At the heart of our mission lies the
                profound belief in the healing power of Jesus Christ's ministry,
                a guiding light that illuminates every corner of our
                institution. Our hospital is more than just a medical facility;
                it is a sanctuary of Hope, Health and Happiness. Inspired by the
                teachings of Jesus, we are committed to sharing His healing
                touch to each and every individual who walks through our doors.
                Our dedicated medical professionals and staff not only provide
                exceptional healthcare but also offer a supportive and nurturing
                environment that acknowledges the importance of spiritual
                well-being alongside physical healing. We understand that true
                healing encompasses the body, mind, and soul, and it is our
                privilege to serve you holistically. Through this portal, we aim
                to provide you with seamless experience, offering access to
                important information about our services, medical expertise,
                facilities and more. Whether you are seeking for medical
                assistance, exploring career opportunities, or simply learning
                about our contributions to the community, this online flatform
                is designed with your needs in mind. Happy browsing and we hope
                to hear your feedback too.
              </p>
            </div>

            <div className="president-signature">
              <img
                className="signature"
                src="/president-signature.png"
                alt="President Signature" 
              />
              <p className="president-">
                <p>Elias Y. Apacible Jr.</p>
              </p>
              <p className="president-position">
                President, Adventist Medical Center Manila  
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
