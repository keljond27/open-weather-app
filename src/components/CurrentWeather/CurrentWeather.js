import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import { STATE_ABBREVIATIONS, WEATHER_CODE_TO_IMAGE } from '../../constants';
import styles from './CurrentWeather.module.css';

const CurrentWeather = () => {
  const weather = useSelector(state => state.weather.current);
  const location = useSelector(state => state.geolocation);

  const [backgroundImage, setBackgroundImage] = useState('partly_cloudy_day');
  const [locationName, setLocationName] = useState('Check Your Weather');
  const [locationState, setLocationState] = useState('');
  const [currentTemp, setCurrentTemp] = useState('');
  const [highTemp, setHighTemp] = useState('');
  const [lowTemp, setLowTemp] = useState('');
  const [feelTemp, setFeelTemp] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    //SET BACKGROUND GRAPHIC
    if (weather && weather.id) {
      let timeOfDay = 'day';
      let imgObj = WEATHER_CODE_TO_IMAGE[weather?.weather[0].id]
      timeOfDay = weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset ? 'day' : 'night';
      setBackgroundImage(imgObj[timeOfDay]);
      setCurrentTemp(parseInt(weather?.main?.temp));
      setHighTemp(parseInt(weather?.main?.temp_max));
      setLowTemp(parseInt(weather?.main?.temp_min));
      setFeelTemp(parseInt(weather?.main?.feels_like));
      setDescription(weather?.weather[0]?.description);
    }
  }, [weather])

  useEffect(() => {
    if (location && location.name) {
      setLocationName(location.name);
      setLocationState(STATE_ABBREVIATIONS[location.state]);
    }
  }, [location])

  useEffect(() => {
    //SET FAVICON
    let icon = document.getElementById('favicon');
    icon.href = `/assets/${backgroundImage}.svg`
  }, [backgroundImage])

  return (
    <Container className={styles.container} style={{ backgroundImage: `url(/assets/${backgroundImage}.svg)` }}>
      <Row>
        <Col>
          <h1 className={styles.location_header}>{locationName}{locationState && ','} {locationState}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className={styles.details}>{description}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.current_temp}>{currentTemp}{currentTemp && '\u00b0'}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.high_low} style={{ display: highTemp ? 'inline' : 'none' }}>
            <FaArrowUp />
            {highTemp}{highTemp && '\u00b0'}{' '}
            <FaArrowDown />
            {lowTemp}{lowTemp && '\u00b0'}{' '}
            <span>&nbsp;&nbsp;Feels Like: </span>
            {feelTemp}{feelTemp && '\u00b0'} 
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default CurrentWeather;
