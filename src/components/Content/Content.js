import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import CurrentWeather from '../CurrentWeather/CurrentWeather';
import HourlyWeather from '../HourlyWeather/HourlyWeather';

import styles from './Content.module.css';

const Content = (props) => {
  const { type } = props;

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
        {
          type === "current" ? 
          <CurrentWeather /> :
          <HourlyWeather />
        }
        </Col>
      </Row>
    </Container>
  )
}

export default Content;
