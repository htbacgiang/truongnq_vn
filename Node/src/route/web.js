const express = require("express");
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const videoController = require("../controllers/videoController");
const blogController = require("../controllers/blogController");


let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/get-video', videoController.handleGetVideos);
    router.post('/api/create-new-video', videoController.handleCreateNewVideo);
    router.delete('/api/delete-video', videoController.handleDeleteVideo);
    router.put('/api/edit-video', videoController.handleEditVideo);

    router.get('/api/get-blog', blogController.handleGetBlogs);
    router.get('/api/get-all-blog', blogController.handleGetAllBlogs);
    router.post('/api/create-new-blog', blogController.handleCreateNewBlog);
    router.get('/api/get-detail-blog', blogController.getDetailBlog);
    router.put('/api/edit-blog', blogController.handleEditBlog);
    router.delete('/api/delete-blog', blogController.handleDeleteBlog);


    // router.delete('/api/delete-blog', blogController.handleDeleteBlog);
    // router.put('/api/edit-blog', blogController.handleEditBlog);


    router.get('/api/allcode', userController.getAllCode);

    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/update-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/post', homeController.postCRUD);
    

    return app.use("/", router);
}

module.exports = initWebRoutes;