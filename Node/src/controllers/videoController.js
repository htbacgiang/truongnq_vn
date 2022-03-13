const videoService = require("../services/videoService");

    let handleGetVideos = async(req,res)=>{
        try {
            let infor = await videoService.getVideos();
            return res.status(200).json(infor);
        }
        catch(e){
            console.log(e);
            return res.status(200).json({
                erroCode:1,
                errMessage:'Lỗi'
            })
    }
}

    let handleCreateNewVideo = async(req,res) =>{
        try {
            let infor = await videoService.createNewVideo(req.body);
            return res.status(200).json(infor);
        }
        catch(e){
            console.log(e);
            return res.status(200).json({
                erroCode:1,
                errMessage:'Lỗi'
            })
        }
    }
    

    let handleDeleteVideo = async (req,res)=> {
        if(!req.body.id){
            return res.status(200).json({
                errCode:1,
                errMessage:"Missing"
            })
        }
        let message = await videoService.deleteVideo(req.body.id);
        return res.status(200).json(message);
    }
    
    let handleEditVideo = async (req,res) =>{
        let data = req.body;
        let message = await videoService.updateVideoData(data);
        return res.status(200).json(message)
    }
module.exports={
    handleGetVideos :handleGetVideos,
    handleCreateNewVideo:handleCreateNewVideo,
    handleEditVideo:handleEditVideo,
    handleDeleteVideo:handleDeleteVideo
}