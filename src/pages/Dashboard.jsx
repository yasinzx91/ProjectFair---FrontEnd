import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../components/Myprojects'
import Profiles from '../components/Profiles'

function Dashboard() {

  const [username,setUsername] = useState('');

  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem('existingUser')).username)
  },[])


  return (
    <>
  
        <Header dashboard/>  

        <h2 className='ms-4 mb-5 mt-3'>{username}</h2>

        <Row className='mt-3 w-100'>
          <Col md={8}>
              <Myprojects/>
          </Col>
          <Col md={4}>
              <Profiles/>
          </Col>
        </Row>
    
    </>
  )
}

export default Dashboard