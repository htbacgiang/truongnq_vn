import axios from '../axios';


const getBlogs = (inputId) =>{
    return axios.get(`api/get-blog?id=${inputId}`)

}
const getAllBlogs = (inputId) =>{
  return axios.get(`api/get-all-blog?id=${inputId}`)

}
const createNewBlogService = (data) =>{
    return axios.post('/api/create-new-blog', data)

}
const deleteBlogService = (blogId) =>{
    return axios.delete('/api/delete-blog',{
      data: {
        id:blogId
      }  
    })
}
const getDetailBlog = (inputSlug) =>{
  return axios.get(`/api/get-detail-blog?slug=${inputSlug}`)

}
const editBlogService = (inputData) =>{
  return axios.put('/api/edit-blog',inputData)
}
export { getBlogs,getAllBlogs,createNewBlogService,deleteBlogService,editBlogService,getDetailBlog}