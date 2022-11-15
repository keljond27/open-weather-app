import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchCurrentWeatherData, fetchForecastWeatherData } from '../../store/thunks';
import TopBar from '../TopBar/TopBar';
import ContentController from '../ContentController/ContentController';

import styles from './App.module.css';
import Content from '../Content/Content';

function App() {

  const dispatch = useDispatch();

  const location = useSelector(state => state.geolocation);

  const [selectedContentType, setSelectedContentType] = useState("current");

  useEffect(() => {
    if (location?.lat && location?.lon) {
      const { lat, lon } = location;
      
      //run it once...
      dispatch(fetchCurrentWeatherData({ lat, lon }));
      dispatch(fetchForecastWeatherData({ lat, lon }));

      //if there's a location and the app is running, it will refresh the weather data every hour on the hour
      let msToNextHour = 3600000 - new Date().getTime() % 3600000;
      setTimeout(() => {
        setInterval(() => {
          dispatch(fetchCurrentWeatherData({ lat, lon }));
          dispatch(fetchForecastWeatherData({ lat, lon }));
        }, (1000*60*60))
      }, msToNextHour)
    }
  }, [location])

  return (
    <Container className={styles.container} fluid="sm">
      <Row className="justify-content-md-center" style={{ height: "100%"}}>
        <Col sm={1} xl={2} className="d-none d-sm-block" />
        <Col className={styles.content}>
          <Content type={selectedContentType} />
        </Col>
        <Col sm={1} xl={2} className="d-none d-sm-block" />
      </Row>
    </Container>
  );
}

export default App;
