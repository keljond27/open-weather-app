import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import styles from './CurrentWeather.module.css';

const CurrentWeather = (props) => {
  const { type } = props;

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          Current
        </Col>
      </Row>
    </Container>
  )
}

export default CurrentWeather;
