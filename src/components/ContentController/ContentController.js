import React, { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import styles from './ContentController.module.css';

const ContentController = (props) => {
  const { setSelectedContentType } = props;

  const [active, setActive] = useState("current");

  const handleOnClick = (e) => {
    let name = e.target.getAttribute('name');
    setActive(name);
    setSelectedContentType(name);
  }

  return (
    <Container className={styles.container}>
      <Row>
        <Col className={styles.btn_container}>
          <div className={`${styles.content_btn} ${active === "current" && styles.active}`} name="current" onClick={handleOnClick}>
            Current Weather
          </div>
        </Col>
        <Col className={`${styles.btn_container} ${styles.right}`}>
          <div className={`${styles.content_btn} ${active === "hourly" && styles.active}`} name="hourly" onClick={handleOnClick}>
            Hourly Forecast
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ContentController;
