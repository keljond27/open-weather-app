import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchCurrentWeatherData, fetchForecastWeatherData } from '../../store/thunks';

import styles from './App.module.css';
import Content from '../Content/Content';

function App() {
  const dispatch = useDispatch();

  const location = useSelector(state => state.geolocation);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      const { lat, lon } = location;

      //RUN IT ONCE...
      dispatch(fetchCurrentWeatherData({ lat, lon }));
      dispatch(fetchForecastWeatherData({ lat, lon }));

      //IF THERE'S A LOCATION, RUN IT EVERY HOUR ON THE HOUR... (OR WHATEVER INTERVAL DESIRED)
      let msToNextHour = 3600000 - Date.now() % 3600000;
      setTimeout(() => {
        setInterval(() => {
          dispatch(fetchCurrentWeatherData({ lat, lon }));
          dispatch(fetchForecastWeatherData({ lat, lon }));
        }, (1000 * 60 * 60))
      }, msToNextHour)
    }
  }, [location])

  return (
    <Container className={styles.container} fluid='sm'>
      <Row className='justify-content-md-center' style={{ height: '100%' }}>
        <Col sm={1} xl={2} className='d-none d-sm-block' />
        <Col className={styles.content}>
          <Content />
        </Col>
        <Col sm={1} xl={2} className='d-none d-sm-block' />
      </Row>
    </Container>
  );
}

export default App;
