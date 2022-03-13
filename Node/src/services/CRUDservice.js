const db = require("../models/index.js");
const bcrypt = require("bcryptjs");
const reject = require("async");



 
 
let createNewVideo = async (data) => {
    return new Promise(async (resolve, reject) =>{
        try{
       await db.User.create(
           {
            email: data.email,
            password: data.password,
     
           })
           resolve('OK!!!')
        } catch(e) {
            reject(e);
        }
    })
}

let getAllVideo = () =>{
    return new Promise(async(resolve, reject) =>{
        try{
            let videos = db.Video.findAll({
                raw : true
            });
            resolve(videos)
        }catch(e){
            reject(e)
        }
    })
}
let getVideoInfoById =(videoId) =>{
    return new Promise( async (resolve,reject) =>{
        try{
            let video = await db.Video.findOne({
                where: { id: videoId},
                raw:true,

            })
            if(video){
                resolve(video)
            }
            else{
                resolve({})
            }
        }catch(e){
            reject(e);
        }
    })
}
let updateVideoData =(data) =>{
    return new Promise( async (resolve,reject) =>{
        try{
            let video =  await db.Video.findOne({
                where: {id: data.id}
            })
            if(video){
                video.nameVideo = data.nameVideo;
                video.youtubeId = data.youtubeId;

                await video.save();
                
                let allVideos = await db.Video.findAll();
                resolve(allVideos);
            } else{
                resolve();
            }
          
        }catch(e){
            console.log(e);
        }
    })
}
let deleteVideoById =(videoId) =>{
    return new Promise( async (resolve,reject) =>{
        try{
            let video =  await db.Video.findOne({
                where: {id: videoId}
            })
        if(video){
            await video.destroy();
        }
        resolve();
        }catch(e){
            console.log(e);
        }
    })
}
module.exports = {
    createNewVideo : createNewVideo,
    getAllVideo : getAllVideo,
    getVideoInfoById: getVideoInfoById,
    updateVideoData: updateVideoData,
    deleteVideoById:deleteVideoById
}