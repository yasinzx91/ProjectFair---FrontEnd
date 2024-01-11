import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { loginAPI, registerAPI } from '../services/allAPI';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';


function Auth({register}){

  const [userData , setUserData] = useState({
      username:"",
      email:"",
      password:""
  })

  const {setIsAuthToken} = useContext(isAuthTokenContext)


  const navigate = useNavigate()

  const registerForm = register?true:false;

  const handleRegister = async (e)=>{
      e.preventDefault()
      const {username,email,password} = userData;
      if(!username || !email || !password){
        toast.info("Please fill the form")
      }
      else{
       const result = await registerAPI(userData);
       console.log(result);
       if(result.status===200){
          toast.success(`${result.data.username} registerd successfully`)
          setUserData({
            username:"",
            email:"",
            password:""
          })
          
          navigate('/login')
        }
        else{
          toast.error(`${result.response.data}`)
        }
      }
  }

  const handleLogin = async (e)=>{
    e.preventDefault();

    const {email,password} = userData;

    if(!email || !password){
      toast.info('Please fill the form completly')
    }
    else{
      const result = await loginAPI(userData);
      console.log(result);

      if(result.status==200){
        //store data
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token",result.data.token);
        setIsAuthToken(true)

        toast.success('Login successfull')
        setUserData({
          username:"",
          email:"",
          password:""
        })

        setTimeout(()=>{
          navigate('/');
        },2000)
      }
      else{
        toast.error(result.response.data)
      }
    }
  }

  
  return (
    <>
    

      <div className='w-100 vh-100'>
          <Row className='h-75 w-100 mt-5 m-0'>

              <Col md={6} sm={12}>
                  <div className='w-100 h-100 divbg'></div>
              </Col>
              
              <Col md={6} sm={12}>
              <div className='w-100 h-100 d-flex flex-column justify-content-center'>
                  <h1 className='text-center'>Project Fair</h1>
                  <h6 className='text-center mt-4 text-success border borde'>
                    {
                      registerForm?"Sign up to your account":"Sign in to your account"
                    }
                  </h6>
                    {registerForm?
                      <form className='d-flex flex-column align-items-center mt-4'>
                          <input value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}
                          type="text" placeholder='Enter your Username' className='mb-3 px-3 py-2 rounded'/>
                          <input value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}
                           type="email" placeholder='Enter your email id' className='mb-3 px-3 py-2 rounded'/>
                          <input value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}
                          type="password" placeholder='Enter your password' className='px-3 py-2 rounded'/>
                      </form>
                      :
                      <form className='d-flex flex-column align-items-center mt-4'>
                          <input value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}
                           type="email" placeholder='Enter your email id' className='mb-3 px-3 py-2 rounded'/>
                          <input value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}
                          type="password" placeholder='Enter your password' className='px-3 py-2 rounded'/>
                      </form>
                      
                    }
                  {
                    registerForm?
                    <div className='d-flex flex-column align-items-center mt-3'>
                    <Button onClick={handleRegister} className='mb-3'>Register</Button>
                    <p>Alreay a user? Click here to <Link to={'/login'}>Login</Link></p>
                  </div>
                    :
                    <div className='d-flex flex-column align-items-center mt-3'>
                      <Button onClick={handleLogin} className='mb-3'>Login</Button>
                      <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                  }
              </div>
              </Col>

          </Row>
            
            <div className='d-flex justify-content-center w-100 mt-5'>
              <Link to={'/'}><Button variant="outline-danger">Back to home</Button></Link>
            </div>
           
      </div>

        <ToastContainer theme='colored' autoClose={2000} position='top-center'/>
    </>
  )
}

export default Auth