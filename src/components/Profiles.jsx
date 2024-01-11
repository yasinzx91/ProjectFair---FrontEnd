import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

function Profiles() {

    const [open, setOpen] = useState(false);

  return (
    <div className='card shadow p-5'>
        <div className='d-flex justify-content-between align-items-center'>
            <h2>Profile</h2>
            <button onClick={() => setOpen(!open)}
             className='btn btn-outline-info rounded'><i className="fa-solid fa-chevron-down"></i></button>
        </div>

        
                <Collapse in={open}>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        
                        <label htmlFor="profile">
                            <input id='profile' type="file" style={{display:'none'}} />
                            <img src="https://img.freepik.com/premium-photo/abstract-person-portrait-with-neon-lights_691560-544.jpg" width={'200px'} height={'200px'} className='rounded-circle' alt="" />
                        </label>
            
                        <div className='mt-5'>
                            <input type="text" placeholder='Github' className='form-control' />
                        </div>
            
                        <div className='mt-3'>
                            <input type="text" placeholder='Linked in' className='form-control'/>
                        </div>
            
                        <div className='mt-3'>
                            <button className='btn btn-success rounded'>Update</button>
                        </div>
            
                        </div>
                </Collapse>


                 

           
    </div>
  )
}

export default Profiles