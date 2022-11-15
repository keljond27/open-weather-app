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
      //if there's a location and the app is running, it will refresh the weather data every hour
      setInterval(() => {
        dispatch(fetchCurrentWeatherData({ lat, lon }));
        dispatch(fetchForecastWeatherData({ lat, lon }));
      }, (1000*60*60))
    }
  }, [location])

  /* 

  const dispatch = useDispatch();
  const geolocation = useSelector(state => state.geolocation);
  
  useEffect(() => {
    dispatch(fetchGeoLocationDataByZip('46280'));
  }, []);

  useEffect(() => {
    console.log(geolocation)
    dispatch(fetchCurrentWeatherData({lat: geolocation?.lat, lon: geolocation?.lon}))
  }, [geolocation]) */


  /*   useEffect(() => {
      //how to change favicon
      let icon = document.getElementById('favicon');
      icon.href = "/assets/1.ico"
    }, []) */

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
