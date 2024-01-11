import React from 'react'
import Card from 'react-bootstrap/Card';
import sun from '../assets/red sun.jpg'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({homeProjects}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);
  console.log(homeProjects);}

  return (
<>
      <Card onClick={handleShow} style={{ width: '25rem'}}>
      <Card.Img variant="top" src={homeProjects?`${BASE_URL}/uploads/${homeProjects.projectImage}`:sun} />
      <Card.Body className='bg-black'>
        <Card.Title className='text-center text-warning mt-3'>{homeProjects.title}</Card.Title>
      </Card.Body>
      </Card>
  
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{homeProjects.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row style={{height:'200px'}}>
              <Col md={6} sm={12}>
                  <img src={homeProjects?`${BASE_URL}/uploads/${homeProjects.projectImage}`:sun} width={"100%"} height={'140px'} alt="" />
              </Col>
              <Col md={6} sm={12}>
                  <div className='w-100'>
                      <h5 className='text-warning'>{homeProjects.title}</h5>
                      <p>
                        {homeProjects.overview}
                      </p>
                      <p><span className='text-warning'>Technologies </span>: {homeProjects.language}</p>
                  </div>
              </Col>
            </Row>
            <div className='w-100 d-flex justify-content-center'>
            <Link className='text-black' to={'https://github.com/alokp07/eKart'}><h1 className='me-3'><i class="fa-brands fa-github"></i></h1></Link>
            <Link className='text-black' to={'https://e-kart-hoo361boq-alokp07s-projects.vercel.app/'}><h1><i class="fa-solid fa-tarp"></i></h1></Link>
            </div>
        </Modal.Body>
      </Modal>
</>
  )
}

export default ProjectCard