import React, { useContext } from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'
import { isAuthTokenContext } from '../context/ContextShare'

function Header({dashboard}) {

  const {setIsAuthToken} = useContext(isAuthTokenContext)

  const navigate = useNavigate()


    const handleLogout = ()=>{
      sessionStorage.removeItem('existingUser');
      sessionStorage.removeItem('token')
      setIsAuthToken(false)
      navigate('/')
    }
  

  return (
  <>
      <div className='bg-black py-2 d-flex justify-content-between align-items-center'>
          <h1 className='text-light animate-charcter fs-1 ms-5'>Project Fair</h1>
          {dashboard&&
            <button onClick={handleLogout} className='btn btn-danger py-2 px-3 me-5'>Log-out</button>
          }
      </div>
  </>
  )
}

export default Header