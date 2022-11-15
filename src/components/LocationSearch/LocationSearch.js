import React, { useState } from 'react';
import { Col, Row, InputGroup, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { fetchGeoLocationDataByQuery, fetchGeoLocationDataByZip, fetchReverseGeoLocationData } from '../../store/thunks';

const LocationSearch = () => {

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');

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
      console.log(searchText)
      const { latitude, longitude } = data?.coords
      dispatch(fetchReverseGeoLocationData({ lat: latitude, lon: longitude }));
      if (err) toast.error(`Error: ${err}`, toast.POSITION.TOP_CENTER);
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