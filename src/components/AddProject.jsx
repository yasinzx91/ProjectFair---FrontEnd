import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {

  //state to hold values from input box

  const {setAddProjectResponse} = useContext(addProjectResponseContext)


  const [token , setToken] = useState("")

  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
  },[])
  

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleClose1 = () => {
      
      setProjectDetails({
        title:'',
        language:'',
        github:'',
        website:'',
        overview:'',
        projectImage:''
      })
      setPreview("")
    }
    const handleShow = () => setShow(true);

    const [projectDetails,setProjectDetails] = useState({
      title:'',
      language:'',
      github:'',
      website:'',
      overview:'',
      projectImage:''
    })

    console.log(projectDetails);

    const handleProject = async (e)=>{
      const{
        title,
        language,
        github,
        website,
        overview,
        projectImage
      } = projectDetails;

      if(!title||!language||!github||!website||!overview||!projectImage){
        alert("Please fill the form completly")
      }
      else{

        //reqbody
        //create an object from form data class since we have uploaded content
        const reqBody = new FormData()
        //add data - append()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        reqBody.append("projectImage",projectImage)

        //header

        if(token){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
        
          const result = await addProjectAPI(reqBody,reqHeader)
          if(result.status===200){
            console.log(result.data)
            alert("project added successfully ");
            handleClose()
            setAddProjectResponse(result.data)
          }
          else{
            alert(result.response.data);
            handleClose1()
          }
        
        }
      }
    }

    const [preview,setPreview] = useState("")

    useEffect(()=>{
        if(projectDetails.projectImage){
          setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    },[projectDetails.projectImage])
    
    console.log(preview);
    
  console.log(projectDetails);
  return (

    <div>
        <Button variant="primary" onClick={handleShow}>
        Add Porject
      </Button>

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
                        <img width={"100%"} src={preview?preview:"https://bytesbin.com/wp-content/uploads/How_to_Upload_File_to_iCloud_com-930x620.png"} alt="" />
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
          <Button variant="primary" onClick={handleProject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default AddProject