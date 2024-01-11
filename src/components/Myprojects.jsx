import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import AddProject from './AddProject'
import { deleteProjectAPI, getAllProjectAPI, getUsersProjectAPI } from '../services/allAPI';
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare';
import EditProject from './EditProject';

function Myprojects() {

  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const [userProjects,setUserProjects] = useState([]);
  const {addProjectResponse} = useContext(addProjectResponseContext)

  const getUserProjects = async()=>{

      const token = sessionStorage.getItem("token") 
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      } 
      const result = await getUsersProjectAPI(reqHeader)
      setUserProjects(result.data)
  }

  const handleDelete = async (id)=>{
    const token = sessionStorage.getItem("token")

    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }

    const result = await deleteProjectAPI(id,reqHeader)
    console.log(result);

    if(result.status===200){
      getUserProjects()
    }
    else{
      console.log(result.response.data)
    }
  }
  
  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])

  return (
    <div className='shadow ps-4'>
      <div className='d-flex justify-content-between'>
          <h2 className='text-success'>My Projects</h2>
          <AddProject/>
      </div>
      {
        userProjects?.length>0?userProjects.map((item)=>(
          <div className='d-flex  align-items-center justify-content-between mt-4 mb-4 bg-dark py-3 px-3 rounded'>
            <h5 className='text-warning'>{item.title}</h5>
            <div className='d-flex'>
              <EditProject project={item}/>
              <Button><i class="fa-brands fa-github fa-beat"></i></Button>
              <Button onClick={()=>handleDelete(item._id)}><i class="fa-solid fa-trash fa-beat"></i></Button>
            </div>
        </div>
        ))

        :
        <p>Nothing to display</p>
      }
      <div>
        <h1 className='text-danger'>No projects uploaded yet!!!</h1>
      </div>
    </div>
  )
}

export default Myprojects