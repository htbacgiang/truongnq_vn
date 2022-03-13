const db = require("../models/index");
const CRUDservice = require("../services/CRUDservice");


let getHomePage = async (req, res) => {
    try{
        let data = await db.User.findAll();
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    }
    catch(e){
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewVideo(req.body);
    console.log(message);
    console.log(req.body);
    return res.send('Đã post');
}
let displayGetCRUD = async (req, res) =>{
    let data = await CRUDservice.getAllVideo();


    return res.render('displayCRUD.ejs',
    {
        dataTable: data
    });
}
let editCRUD = async (req, res) => { 
    let videoId = req.query.id;
    if (videoId){
    let videoData = await CRUDservice.getVideoInfoById(videoId);
  

    return res.render('editCRUD.ejs',{
        video: videoData
    });
    }
    else{
        return res.send('None');

    }
}
let putCRUD = async (req,res) =>{
    let data = req.body;
    let allVideos = await CRUDservice.updateVideoData(data);
    return res.render('displayCRUD.ejs',
    {
        dataTable: allVideos
    })

}
let deleteCRUD = async (req,res) =>{
    let id = req.query.id;
    if(id){
        await CRUDservice.deleteVideoById(id);
        return res.send('Deleted')
    }
    else {
        return res.send('Không có video')

    }

}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}