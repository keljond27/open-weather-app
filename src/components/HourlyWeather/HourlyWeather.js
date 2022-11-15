import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';

import { WEATHER_CODE_TO_IMAGE, STATE_ABBREVIATIONS } from '../../constants';
import styles from './HourlyWeather.module.css';

const HourlyWeather = () => {
  const location = useSelector(state => state.geolocation);
  const current_sys = useSelector(state => state.weather.current.sys);
  const forecast = useSelector(state => state.weather.forecast);
  const hourly = forecast?.hourly?.slice(0, 12);

  const getTime = (index) => {
    let time = forecast?.hourly[index]?.dt;
    let d = new Date(time * 1000);
    let hour = d.getHours() + 1;
    return { time: hour <= 12 ? hour : hour - 12, meridiem: hour >= 12 ? 'PM' : 'AM' };
  }

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          <Row>
            <Col className={styles.location}>{location.name}{location.name && ', '}{STATE_ABBREVIATIONS[location.state]}</Col>
          </Row>
          {hourly?.map((data, index) => {
            const { time, meridiem } = getTime(index);
            const imgObj = WEATHER_CODE_TO_IMAGE[data?.weather[0]?.id];
            let timeOfDay = data?.dt > current_sys?.sunrise && data?.dt < current_sys?.sunset ? 'day' : 'night';
            return (
              <Row key={`hourly_${index}`}>
                <Col className={styles.hourly_item} style={{ backgroundImage: `url(/assets/${imgObj[timeOfDay]}.svg)` }}>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <div className={styles.time}>{time}:00 {meridiem}</div>
                        </Col>
                        <Col>
                          <div className={styles.temp}>{parseInt(data.temp)}{'\u00b0'}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col><div className={styles.description}>{data.weather[0].description}</div></Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          })}
        </Col>
      </Row>
    </Container>
  )
}

export default HourlyWeather;
