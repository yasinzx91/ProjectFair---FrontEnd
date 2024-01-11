import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import titleImg from '../assets/wallpaperflare.com_wallpaper.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { getHomeProject } from '../services/allAPI'

function Home() {

  const [isLogin,setIsLogin] = useState(false)

  const [homeProjects,setHomeProjects] = useState([])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
        setIsLogin(true)
    }

    funchomeProjects()
  },[])

  const funchomeProjects = async()=>{
    const response = await getHomeProject()
    const {data} = response
    setHomeProjects(data)
  }
  console.log(homeProjects);

  return (
    <>
        <div className='vh-100 w-100'>

            <Row className='w-100 h-100 p-2 d-flex align-items-center'>
              <Col sm={12} md={6}>
                <div className='container-fluid rounded d-flex flex-column align-items-center justify-content-center h-50'>
                    <h1 style={{fontSize:'60px'}}>Project Fair</h1>
                    <p>one stop destination for all software development projects</p>
                    {isLogin?
                    
                    <Link to={'./dashboard'}>
                      <button className='btn btn-success'>MANAGE PROJECTS</button>
                    </Link>

                    :
                      <Link to={'./login'}>
                      <button className='btn btn-success'>GET STARTED</button>
                    </Link>}
                </div>
              </Col>

              <Col sm={12} md={6}>
                  <img src={titleImg} width={'100%'} alt="" />
              </Col>
            </Row>
           
        </div>

        <div className='mt-5 all-projects mb-5 bg-black py-5 px-5 shadow w-100'>

          <h1 className='text-center'>Explore out Projects</h1>

         
            <div className='d-flex w-100 mt-5'>
  
                {homeProjects?.length>0?homeProjects.map((item)=>(
                    <div className='d-flex justify-content-center' style={{width:'500px'}}>
                        <ProjectCard homeProjects={item}/>
                    </div>
                ))
                  
                :
                  <p>Nothing to display</p>

                }
  
            </div>

            <div className='text-center mt-5'>
                <Link to='./project'><button className='btn btn-primary'>See more projects</button></Link>
            </div>

        </div>
    </>
  )
}

export default Home