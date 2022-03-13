const db = require("../models/index");

    let getVideos = (videoId) =>{
        return new Promise (async(resolve, reject)=>{
            try {
                let data = await db.Video.findAll();
                if(data && data.length>0){
                    data.map(item=>{
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                        return item;
                    })
                    
                    console.log('check video',data)
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
    let createNewVideo =(data) =>{
        return new Promise(async(resolve, reject)=>{
            try{    
                  if(!data.nameVideo || !data.youtubeId || !data.thumbnail || !data.contentHTML 
                    ) resolve({
                        errCode:1,
                        errMessage:'thiếu rồi'

                    })
                else{
                    await db.Video.create(
                        {
                            nameVideo: data.nameVideo,
                            youtubeId:  data.youtubeId,
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

    let deleteVideo = (videoId) => {
        return new Promise (async(resolve, reject)=>{
            let foundVideo = await db.Video.findOne({
                where: {id: videoId}
            })
            if(!foundVideo){
                resolve({
                    errCode:2,
                    errMessage: 'Video ko tồn tại'
                })
    
            }
            await db.Video.destroy({
                where: {id: videoId}
            })
    
            resolve({
                errCode:0,
                message: 'Video đã bị xóa'
            })
        })
    }
    
    let updateVideoData = (data)=>{
        return new Promise(async(resolve,reject)=>{
            try{
                if(!data.id){
                    resolve({
                        errCode:2,
                        errMessage:'Missing id'
                    })
                }
                let video =  await db.Video.findOne({
                    where: {id: data.id},
                    raw:false
                })
                if(video){
                    video.nameVideo = data.nameVideo;
                    video.youtubeId = data.youtubeId;
                   
                    await video.save();
                    
                    resolve({
                        errCode:0,
                        message: 'Update thành công'
                    })
                } else{
                    resolve({
                        errCode:1,
                        message: 'Không tìm thấy Video'
                    })
                }
            }
            catch(e){
                reject(e);
            }
        })
    }   
module.exports = {
    getVideos : getVideos,
    createNewVideo:createNewVideo,
    deleteVideo:deleteVideo,
    updateVideoData:updateVideoData
}