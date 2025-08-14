import React from "react";
import "../styles/Information.css";
import { Row, Col, Card, Button } from "react-bootstrap";
import { BsChevronDown } from "react-icons/bs";
import EmblaCarousel from "../components/EmblaCarousel";
import "../styles/embla.css";
import "../styles/base.css";

const Information = () => {
  const OPTIONS = { loop: true };
  const SLIDES = [
    "/2023DOHAward.png",
    "/Daisyaward.png",
    "/healthyPilipinasaward.png",
    "/ISO.png",
  ];
  return (
    <>
      <div className="information-container">
        <div className="information-content">
          <div id="information-wrapper-3">
            <div
              className="information-subContent-title"
              id="information-services"
            >
              <h2>What you can find here</h2>
            </div>
            <div
              className="information-subContent"
              id="information-services-content"
            >
              <Row id="services-row">
                <Col>
                  <p className="service">
                    Our Services <br />
                    <a href="/services">
                      <span>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="mt-3 services-button"
                        >
                          Learn More!
                        </Button>
                      </span>
                    </a>
                  </p>
                </Col>
                <Col>
                  <p className="service">
                    Find Doctors <br />
                    <a href="/find-doctors">
                      <span>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="mt-3 services-button"
                        >
                          Find Now!
                        </Button>
                      </span>
                    </a>
                  </p>
                </Col>

                <Col>
                  <p className="service">
                    News and Updates <br />
                    <span>
                      <a href="/news-updates">
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="mt-3 services-button"
                        >
                          Read Now!
                        </Button>
                      </a>
                    </span>
                  </p>
                </Col>

                <Col>
                  <p className="service">
                    Online Patient Survey <br />
                    <a href="/online-patient-survey">
                      <span>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="mt-3 services-button"
                        >
                          See More!
                        </Button>
                      </span>
                    </a>
                  </p>
                </Col>
              </Row>
            </div>
          </div>

          <div id="information-wrapper-1">
            <div
              className="information-subContent-title"
              id="information-mission"
            >
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
            <div id="information-values">
              <h2> Values </h2>
            </div>

            <div id="information-values-content">
              <Row id="values-row">
                <Col>
                  <div className="value">
                    <img
                      loading="lazy"
                      className="values-img"
                      src="/compassion.png"
                      alt="Compassion"
                    />
                    <p>Compassion</p>
                  </div>
                </Col>
                <Col>
                  <div className="value">
                    <img
                      loading="lazy"
                      className="values-img"
                      src="/Integrity.png"
                      alt="Integrity"
                    />
                    <p>Integrity</p>
                  </div>
                </Col>
                <Col>
                  <div className="value">
                    <img
                      loading="lazy"
                      className="values-img"
                      src="/Excellence.png"
                      alt="Excellence"
                    />
                    <p>Excellence</p>
                  </div>
                </Col>
                <Col>
                  <div className="value">
                    <img
                      loading="lazy"
                      className="values-img"
                      src="/Stewardship.png"
                      alt="Stewardship"
                    />
                    <p>Stewardship</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div id="information-wrapper-4">
            <div
              className="information-subContent theme-light"
              id="information-achievements-content"
            >
              <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div
              className="information-subContent-title"
              id="information-achievements"
            >
              <h2>Achievements and Accreditations</h2>
            </div>
          </div>

          <div id="information-wrapper-5">
            <div className="information-subContent-title" id="information-news">
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

          <div className="president-message">
            <div className="president-signature">
              <div id="president-profile-wrapper">
                <img
                  loading="lazy"
                  className="signature"
                  src="/Apacible.png"
                  alt="President Signature"
                />
              </div>
              <div className="president-info">
                <p className="president-name">Elias Y. Apacible Jr.</p>
                <p className="president-position">
                  President, Adventist Medical Center Manila
                </p>
              </div>
            </div>

            <div className="president-message-content">
              <div className="information-subContent" id="message-heading">
                <h2>Message from the President</h2>
              </div>
              <div
                className="information-subContent"
                id="information-president-content"
              >
                <blockquote id="message">
                  It is with great delight that I welcome you all to our
                  hospital's website. At the heart of our mission lies the
                  profound belief in the healing power of Jesus Christ's
                  ministry, a guiding light that illuminates every corner of our
                  institution. Our hospital is more than just a medical
                  facility; it is a sanctuary of Hope, Health and Happiness.
                  Inspired by the teachings of Jesus, we are committed to
                  sharing His healing touch to each and every individual who
                  walks through our doors. Our dedicated medical professionals
                  and staff not only provide exceptional healthcare but also
                  offer a supportive and nurturing environment that acknowledges
                  the importance of spiritual well-being alongside physical
                  healing. We understand that true healing encompasses the body,
                  mind, and soul, and it is our privilege to serve you
                  holistically. Through this portal, we aim to provide you with
                  seamless experience, offering access to important information
                  about our services, medical expertise, facilities and more.
                  Whether you are seeking for medical assistance, exploring
                  career opportunities, or simply learning about our
                  contributions to the community, this online flatform is
                  designed with your needs in mind. Happy browsing and we hope
                  to hear your feedback too.
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
