import { commonAPI } from "./commonAPI"
import { BASE_URL } from "./baseurl"



export const registerAPI = async(users)=>{
    return await commonAPI('POST',`${BASE_URL}/user/register`,users,"")
}

export const loginAPI = async(users)=>{
    return await commonAPI('POST',`${BASE_URL}/user/login`,users,"")
}

//login in to add project

export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/project/add`,reqBody,reqHeader)
}

export const getHomeProject = async()=>{
    return await commonAPI('GET',`${BASE_URL}/project/home-project`,"")
}

export const getAllProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/project/all-project?search=${searchKey}`,"",reqHeader)
}

export const getUsersProjectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/project/user-projects`,"",reqHeader)
}


//id is passed as path parameter
export const updateProjectAPI = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

//delete
export const deleteProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}