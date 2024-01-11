import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import './project.css'
import { getAllProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function Project() {

  const  [allProject,setAllProject] = useState([]);
  const [searchKey,setSearchKey] = useState("");
  const [isToken,setIsToken] = useState(false)

  

  const getAllProject = async()=>{

    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectAPI(searchKey,reqHeader)

      if(result.status=== 200){
        setAllProject(result.data)
      }
      else{
        console.log(result.response.data)
      }
    }
  }

  useEffect(()=>{
    getAllProject()
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)
    }
  },[])
  return (
    <>
    
      <Header/>

      <div className='w-100 mt-5 d-flex flex-column align-items-center'>
          {/* <h1 className='text-center'>All Project</h1> */}
          <h5 className="fs-4 title">
            <span className="title-word title-word-1">All </span>
            <span className="title-word title-word-2">Pro</span>
            <span className="title-word title-word-3">jec</span>
            <span className="title-word title-word-4">ts</span>
          </h5>
          <input type="search" placeholder='Search here...' className='mt-3 rounded py-2 px-4' style={{border:'0'}}
          onChange={(e)=>setSearchKey(e.target.value)}/>
      </div>

      <div className='d-flex justify-content-center mt-5 px-3 flex-wrap'>
        {
          allProject?.length>0?allProject.map((item)=>(
            <div className='ms-3 mb-3'><ProjectCard homeProjects={item}/></div>
          ))
          :
            
              <>
              {
                isToken?
                
                <div className='d-flex justify-content-center'>
                  <img width={"50%"} src="https://assets.materialup.com/uploads/03e97925-9fed-4187-ab9a-99375faa6e59/preview.gif" alt="" />
                </div>
                
                :
                <div className='d-flex flex-column align-items-center position-relative'>
                  <img width={'35%'} src="https://1871216767-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FF6uqWeUD7kwCZqSpBtVz%2Fuploads%2Fgit-blob-aa5b2c309d97620d21a33c301b72a27bc8b9e1b4%2Fezgif.com-gif-maker.gif?alt=media&token=040c1cc2-906e-48bf-85be-9dffdcf534cd" alt="" />
                  <h4 className='fs-6' style={{"position":"absolute","bottom":"0"}}>Please Login</h4>
                </div>
                
              }
              </>
             
          
        }
      </div>
    
    </>
  )
}

export default Project