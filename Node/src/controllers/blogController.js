const blogService = require("../services/blogService");


    let handleGetBlogs = async(req,res)=>{
        let limit = req.query.limit;
        if(!limit) limit = 6;
        try {
            let response = await blogService.getBlogs(limit);
            return res.status(200).json(response);
        }
        catch(e){
            console.log(e);
            return res.status(200).json({
                errCode:1,
                errMessage:'Lỗi'
            })
    }
}

        let handleGetAllBlogs = async (req,res) => {
            let id = req.query.id;
            let blogs = await blogService.getAllBlogs(id);
            return res.status(200).json({
                errCode:0,
                errMessage:'Otoke',
                blogs
            })
        }

    let handleCreateNewBlog = async(req,res) =>{
        try {
            let infor = await blogService.createNewBlog(req.body);
            return res.status(200).json(infor);
        }
        catch(e){
            console.log(e);
            return res.status(200).json({
                errCode:1,
                errMessage:'Lỗi'
            })
        }
    }
    

    let handleDeleteBlog = async (req,res)=> {
        if(!req.body.id){
            return res.status(200).json({
                errCode:1,
                errMessage:"Missing"
            })
        }
        let message = await blogService.deleteBlog(req.body.id);
        return res.status(200).json(message);
    }
    
    let handleEditBlog = async (req,res) =>{
        let data = req.body;
        let message = await blogService.updateBlogData(data);
        return res.status(200).json(message)
    }
    let getDetailBlog = async (req,res)=>{
        try {
            let infor = await blogService.getDetailBlog(req.query.slug);
            return res.status(200).json(
                infor 
            )
        }
        catch(e){
            console.log(e)
            return res.status(200).json({
                errCode:-1,
                errMessage :"Error from the server"
            })
        }
    }
module.exports={
    handleGetBlogs :handleGetBlogs,
    handleCreateNewBlog:handleCreateNewBlog,
    handleEditBlog:handleEditBlog,
    handleDeleteBlog:handleDeleteBlog,
    getDetailBlog:getDetailBlog,
    handleGetAllBlogs:handleGetAllBlogs,
    handleEditBlog:handleEditBlog,
    handleDeleteBlog:handleDeleteBlog
}