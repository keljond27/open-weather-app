import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import LocationSearch from '../LocationSearch/LocationSearch';

const TopBar = () => {
  return (
    <Navbar expand='md' bg='primary' variant='dark'>
        <Container>
          <Navbar.Brand>
            <img
              src='/logo.svg'
              width='30'
              height='30'
              className='d-inline-block align-top'
              alt='React Bootstrap logo'
            />{' '}
            Open Weather App
          </Navbar.Brand>
          <Nav>
            <LocationSearch />
          </Nav>
        </Container>
      </Navbar>
  )
}

export default TopBar;