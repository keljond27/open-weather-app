import React, { useEffect, useState } from 'react';
import { Col, Row, InputGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';

import { fetchGeoLocationDataByQuery, fetchGeoLocationDataByZip, fetchReverseGeoLocationData } from '../../store/thunks';
import { STATE_ABBREVIATIONS } from '../../constants';

const LocationSearch = () => {

  const dispatch = useDispatch();

  const location = useSelector(state => state.geolocation);

  const [searchText, setSearchText] = useState('');
  //const [useBrowserLocation, setUseBrowserLocation] = useState(false);

/*   useEffect(() => {
    if (location?.lat && location?.lon && !!useBrowserLocation) {
      setSearchText(`${location.name}, ${STATE_ABBREVIATIONS[location.state]}`)
    }
    setUseBrowserLocation(false);
  }, [useBrowserLocation]) */

  const handleButtonOnClick = () => {
    if (!isNaN(parseInt(searchText))) {
      dispatch(fetchGeoLocationDataByZip({ zip: searchText }));
    } else {
      dispatch(fetchGeoLocationDataByQuery({ location: searchText }));
    }
    setSearchText('');
  }

  const handleGetLocationOnClick = () => {
    navigator.geolocation.getCurrentPosition((data, err) => {
      const { latitude, longitude } = data?.coords
      dispatch(fetchReverseGeoLocationData({ lat: latitude, lon: longitude }));
      //setUseBrowserLocation(true)
    });
  }

  const handleInputOnChange = (e) => {
    let value = e.target.value;
    setSearchText(value);
  }

  const handleInputOnEnter = (e) => {
    let key = e.keyCode;
    let target = e.target;
    if (key === 13) {
      handleButtonOnClick();
      target.blur();
    }
  }

  return (
    <Row>
      <Col>
        <InputGroup>
          <Form.Control placeholder='12345 or City, ST' size='sm' value={ searchText } onChange={ handleInputOnChange } onKeyDown={handleInputOnEnter} />
          <InputGroup.Text as='button' onClick={ handleButtonOnClick }><FaSearch /></InputGroup.Text>
          <InputGroup.Text as='button' onClick={ handleGetLocationOnClick }><BiTargetLock /></InputGroup.Text>
        </InputGroup>
      </Col>
    </Row>
  )
}

export default LocationSearch;