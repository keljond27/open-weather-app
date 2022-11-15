import React, { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap';

import TopBar from '../TopBar/TopBar';
import ContentController from '../ContentController/ContentController';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import HourlyWeather from '../HourlyWeather/HourlyWeather';

import styles from './Content.module.css';

const Content = () => {
  const [type, setType] = useState('current');

  return (
    <Container className={`${styles.container}`}>
      <Row className={`${styles.overlay}`}>
        <Col style={{ padding: 'unset' }}>
          <TopBar />
          <ContentController setSelectedContentType={setType} />
          <div style={{ display: type === 'hourly' ? 'none' : 'inline' }} >
            <CurrentWeather />
          </div>
          <div style={{ display: type === 'current' ? 'none' : 'inline' }}>
            <HourlyWeather />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Content;
