const db = require("../models/index");

    let getBlogs = (limitInput) =>{
        return new Promise (async(resolve, reject)=>{
            try {
                let data = await db.Blog.findAll({
                    limit: limitInput,
                    order: [['createdAt', 'DESC']],

                });
                if(data && data.length>0){
                    data.map(item=>{
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                        return item;
                    })
                }
                resolve({
                    errMessage:'Ok',
                    errCode:0,
                    data
                })
              
            } catch (e) {
                reject(e);
            }
        })
    }
    let createNewBlog =(data) =>{
        return new Promise(async(resolve, reject)=>{
            try{    
                  if(!data.name || !data.slug || !data.linkimage ||  !data.description || !data.thumbnail || !data.contentHTML 
                    ) resolve({
                        errCode:1,
                        errMessage:'thiếu rồi'

                    })
                else{
                    await db.Blog.create(
                        {
                            name: data.name,
                            slug:  data.slug,
                            linkimage: data.linkimage,
                            description:  data.description,
                            image:  data.thumbnail,
                            contentHTML: data.contentHTML,
                        })
                     }  resolve({
                        errCode:0,
                        errMessage:'Done'

                    })

                        
            }catch(e){
                reject(e)
            }
        })
    }
    let getAllBlogs =(blogId) =>{
        return new Promise(async (resolve,reject)=>{
            try{
                let blogs = '';
                if(blogId === 'ALL'){
                    blogs = await db.Blog.findAll({
                        
                        attributes:{
                            exclude:['image']
                        },
                    order: [['createdAt', 'DESC']],

                    })
                }
                if(blogId && blogId !== 'ALL'){
                    blogs = await db.Blog.findOne({
                        where : {id: blogId},
                        attributes:{
                            exclude:['image']
                        }
                    })
                }
                resolve(blogs)
            }catch(e){
                reject(e);
            }
        })
        }

    let deleteBlog = (BlogId) => {
        return new Promise (async(resolve, reject)=>{
            let foundBlog = await db.Blog.findOne({
                where: {id: BlogId}
            })
            if(!foundBlog){
                resolve({
                    errCode:2,
                    errMessage: 'Blog ko tồn tại'
                })
    
            }
            await db.Blog.destroy({
                where: {id: BlogId}
            })
    
            resolve({
                errCode:0,
                message: 'Blog đã bị xóa'
            })
        })
    }
    
    let updateBlogData = (data)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                if(!data.id){
                    resolve({
                        errCode:2,
                        errMessage:'Missing id'
                    })
                }
                let blog =  await db.Blog.findOne({
                    where: {id: data.id},
                    raw:false
                })
                if(blog){
                    blog.nameBlog = data.nameBlog;
                    blog.youtubeId = data.youtubeId;
                   
                    await Blog.save();
                    
                    resolve({
                        errCode:0,
                        message: 'Update thành công'
                    })
                } else{
                    resolve({
                        errCode:1,
                        message: 'Không tìm thấy Blog'
                    })
                }
            }
            catch(e){
                reject(e);
            }
        })
    }   

    let getDetailBlog = (inputSlug) =>{
        return new Promise(async(resolve, reject) => {
            try{
                if(!inputSlug){
                    resolve({
                    errCode:1,
                    errMessage:'Missing required parameter'
                    })
                }else{
                    let data = await db.Blog.findOne({
                        where:{
                            slug:inputSlug
                        },
                        raw:true,
                        nest:true
                    })
                    resolve({
                        errCode:0,
                        data:data
                    })
                }
            }
            catch(e){
                reject(e);
            }
        })
    }
module.exports = {
    getBlogs : getBlogs,
    createNewBlog:createNewBlog,
    deleteBlog:deleteBlog,
    updateBlogData:updateBlogData,
    getDetailBlog:getDetailBlog,
    getAllBlogs:getAllBlogs
}