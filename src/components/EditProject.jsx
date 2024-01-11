import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { updateProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({project}) {

  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

    const [show,setShow] = useState()

    const handleClose = () => {setShow(false)
    handleClose1()}
    const handleShow = () => setShow(true);
    const [preview,setPreview] = useState("")

    const [projectDetails,setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
      })

      const handleClose1 =()=>{
        setProjectDetails({
            id: project._id,
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""
        })
      }

      const handleUpdate= async(e)=>{
          e.preventDefault();

          const {id,title,language,github,overview,projectImage} = projectDetails;

          const reqBody = new FormData()

          if(!title ||!language ||!github || !overview){
            alert("Please fill the form completly")
          }
          else{
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("overview",overview)
            preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
          }
          
          const token = sessionStorage.getItem("token");

          if(preview){
            const reqHeader = {
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }

            const result = await updateProjectAPI(id,reqBody,reqHeader)
            console.log(result);

            if(result.status===200){
              alert('successfull')
              setEditProjectResponse(result.data)
            }
            else{
              alert("Somthing went wrong")
            }

            handleClose()
          }
          else{
            const reqHeader = {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }

            const result = await updateProjectAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status===200){
              alert('successfull')
              setEditProjectResponse(result.data)
            }
            else{
              alert("Somthing went wrong")
            }

            handleClose()
          }
      }

    useEffect(()=>{
      if(projectDetails.projectImage){
        setPreview(URL.createObjectURL(projectDetails.projectImage))
      }
    },[projectDetails.projectImage])
    

  return (
    <>
        <Button onClick={handleShow}><i class="fa-solid fa-pen-to-square fa-beat"></i></Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
            <div className="col-lg-6">
                    <label htmlFor="upload">
                        <input onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} 
                        id='upload' type="file" style={{display:'none'}} />
                        <img width={"100%"} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="" />
                    </label>
                </div>
                <div className='col-lg-6'>
                    <div className="mb-3 w-100">
                        <input value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}
                        type="text" className='form-control' placeholder='Project Title' />
                    </div>
                    <div className="mb-3 w-100">
                        <input value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}
                         type="text" className='form-control' placeholder='Language' />
                    </div>
                    <div className="mb-3 w-100">
                        <input value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}
                         type="text" className='form-control' placeholder='Github Link' />
                    </div>
                    <div className="mb-3 w-100">
                        <input value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}
                         type="text" className='form-control' placeholder='Web site Link' />
                    </div>
                    <div className="mb-3 w-100">
                        <textarea value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}
                         name="" id="" cols="25" rows="3" placeholder='Project OverView'></textarea>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Clear
          </Button>
          <Button variant="primary" onClick={(e)=>handleUpdate(e)}> 
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject