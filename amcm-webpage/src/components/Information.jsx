import { useState, useEffect } from "react";
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

  const [featuredNews, setFeaturedNews] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  //for uploads folder
  const VITE_API_UPLOAD_URL = import.meta.env.VITE_API_UPLOAD_URL;

  const fetchAllFeaturedNews = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/page/get-featured-news`, {
        method: "GET",
        credentials: "include",
      });
      console.log("Fetching featured news from:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Featured news data:", data);
        setFeaturedNews(data.rows);
      }
    } catch (error) {
      console.error("Error fetching featured news:", error);
    }
  };

  useEffect(() => {
    fetchAllFeaturedNews();
  }, []);

  return (
    <>
      <div className="information-container">
        <div className="information-content">
          <div id="information-wrapper-3">
            <div id="information-wrapper-3-container">
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
                  <Col id="our-services">
                    <div id="services-overlay-text">
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
                    </div>
                  </Col>
                  <Col id="find-doctors">
                    <div id="find-doctors-overlay-text">
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
                    </div>
                  </Col>
                  <Col id="news-updates">
                    <div id="news-updates-overlay-text">
                      <p className="service">
                        News and Update <br />
                        <a href="/news-updates">
                          <span>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              className="mt-3 services-button"
                            >
                              Read Now!
                            </Button>
                          </span>
                        </a>
                      </p>
                    </div>
                  </Col>

                  <Col id="online-patient-survey">
                    <div id="online-patient-survey-overlay-text">
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
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <div id="second-wrapper">
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
                <p className="mission">
                  "Sharing Jesus Christ Healing Ministry"
                </p>
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
              <div
                className="information-subContent"
                id="information-news-content"
              >
                {featuredNews.length > 0 ? (
                  <>
                    <div id="featured-news-text">
                      <h5>Featured News</h5>
                      <a href="/news-updates"><i className="fas fa-chevron-right">See More...</i></a>
                    </div>
                    <div className="news-card-container">
                      {featuredNews.map((news, index) => (
                        <div key={index} className="news-card-wrapper">
                          <Card className="news-card">
                            <div className="image-holder">
                              <Card.Img
                                variant="top"
                                src={`${VITE_API_URL}/uploads/thumbnail/${news.thumbnail}`}
                                alt={news.title}
                                className="news-card-image"
                                loading="lazy"
                              />
                            </div>
                            <Card.Body>
                              <Card.Title className="news-card-title">
                                {news.title.length>25 ? news.title.substring(0, 25) + "..." : news.title}
                              </Card.Title>
                              <Card.Text className="news-card-summary">
                                {news.news_description.length > 30
                                  ? news.news_description.substring(0, 30) +
                                    "..."
                                  : news.news_description}
                              </Card.Text>
                              <div className="button-div">
                                <Button
                                  variant="warning"
                                  href={`/news-updates`}
                                  className="read-more-button"
                                >
                                  Read More{" "}
                                  <BsChevronDown className="chevron-icon" />
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div id="information-news">
                      <div
                        className="information-subContent-title"
                        
                      >
                        <h2>Hospital News</h2>
                      </div>

                      <p className="news">
                        Stay updated with the latest news and events at
                        Adventist Medical Center Manila.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="president-message">
              <div className="president-signature">
                <div id="president-profile-wrapper">
                  <img
                    loading="lazy"
                    className="signature"
                    src="/Apacible.webp"
                    alt="President Signature"
                  />
                </div>
                <div className="president-info">
                  <p className="president-name">Elias Y. Apacible Jr.</p>
                  <p className="president-position">
                    President, Adventist Medical Center and College Manila
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
                    ministry, a guiding light that illuminates every corner of
                    our institution. Our hospital is more than just a medical
                    facility; it is a sanctuary of Hope, Health and Happiness.
                    Inspired by the teachings of Jesus, we are committed to
                    sharing His healing touch to each and every individual who
                    walks through our doors. Our dedicated medical professionals
                    and staff not only provide exceptional healthcare but also
                    offer a supportive and nurturing environment that
                    acknowledges the importance of spiritual well-being
                    alongside physical healing. We understand that true healing
                    encompasses the body, mind, and soul, and it is our
                    privilege to serve you holistically. Through this portal, we
                    aim to provide you with seamless experience, offering access
                    to important information about our services, medical
                    expertise, facilities and more. Whether you are seeking for
                    medical assistance, exploring career opportunities, or
                    simply learning about our contributions to the community,
                    this online flatform is designed with your needs in mind.
                    Happy browsing and we hope to hear your feedback too.
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Information;
