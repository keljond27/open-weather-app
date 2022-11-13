import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import styles from './HourlyWeather.module.css';

const HourlyWeather = (props) => {
  const { type } = props;

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          Hourly
        </Col>
      </Row>
    </Container>
  )
}

export default HourlyWeather;
