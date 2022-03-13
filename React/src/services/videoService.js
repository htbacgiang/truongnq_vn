import axios from '../axios';


const getVideos = (inputId) =>{
    return axios.get(`api/get-video?id=${inputId}`)

}
const createNewVideoService = (data) =>{
    return axios.post('/api/create-new-video', data)

}
const deleteVideoService = (videoId) =>{
    return axios.delete('/api/delete-video',{
      data: {
        id:videoId
      }  
    })
}

const editVideoService = (inputData) =>{
  return axios.put('/api/edit-video',inputData)
}
export { getVideos,createNewVideoService,deleteVideoService,editVideoService}