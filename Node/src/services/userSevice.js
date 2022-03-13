const db = require("../models/index");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch(e) {
             reject(e);
    }
    })
}
let handleUserLogin = (email, password) =>{
    return new Promise(async(resolve, reject) =>{
        try{    
                let userData = {};

                let isExit = await checkUserEmail(email);
                if(isExit){
                    let user = await db.User.findOne({
                        where:{ email : email},
                        attributes: ['email', 'roleId', 'password','firstName', 'lastName'],
                        raw: true
                    });
                    if(user){
                        let check = await bcrypt.compareSync(password, user.password);
                        if(check){
                            userData.errCode = 0;
                            userData.errMessage = "Ok";
                            console.log(user);
                            delete user.password;
                            userData.user= user;
                        }else{
                            userData.errCode = 3;
                            userData.errMessage = "Sai mật khẩu";
                        }
                    }else{
                    userData.errCode = 2;
                    userData.errMessage = 'Không tìm thấy user';
                    }

                }else{
                    userData.errCode = 1;
                    userData.errMessage = 'Email không tồn tại, vui lòng nhập email khác';
                }
                resolve(userData)
                

        }catch(e){
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) =>{
    return new Promise(async(resolve, reject)=>
    {
        try{ 
            let user = await db.User.findOne({
                where: {email : userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }

        }catch(e){
            reject(e);
        }
    })
}
let getAllUsers =(userId) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where : {id: userId},
                    attributes:{
                        exclude:['password']
                    }
                })
            }
            resolve(users)
        }catch(e){
            reject(e);
        }
    })
    }
    
    let createNewUser =(data) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode:1,
                    errMessage:'Email đã được sử dụng'
                })
            }else{
                let hashPasswordFormBcrypt = await hashUserPassword(data.password);
                await db.User.create(
                    {
                     email: data.email,
                     password: hashPasswordFormBcrypt,
                     firstName: data.firstName,
                     lastName: data.lastName,
                     address: data.address,
                     gender: data.gender,
                     phonenumber: data.phonenumber,
                     roleId: data.roleId,
                     image:data.avatar
                    })
                    resolve({
                        errCode:0,
                        message:'Done'
                    })
            }
        
        }catch(e){
            reject(e)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise (async(resolve, reject)=>{
        let foundUser = await db.User.findOne({
            where: {id: userId}
        })
        if(!foundUser){
            resolve({
                errCode:2,
                errMessage: 'Người dùng ko tồn tại'
            })

        }
        await db.User.destroy({
            where: {id: userId}
        })

        resolve({
            errCode:0,
            message: 'Người dùng đã bị xóa'
        })
    })
}

let updateUserData = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:'Missing id'
                })
            }
            let user =  await db.User.findOne({
                where: {id: data.id},
                raw:false
            })
            if(user){
                user.lastName = data.lastName;
                user.email = data.email;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.image = data.avatar;
                await user.save();
                
                resolve({
                    errCode:0,
                    message: 'Update thành công'
                })
            } else{
                resolve({
                    errCode:1,
                    message: 'Không tìm thấy người dùng'
                })
            }
        }
        catch(e){
            reject(e);
        }
    })
}   
let getAllCodeService = (typeInput) =>{
    return new Promise( async(resolve, reject)=>{
        try {
           if(!typeInput){
            resolve({
                errCode:1,
                errMessage:'Missing'
            })

           }else{
            let res ={};
            let allcode = await db.Allcode.findAll({
                where: {type:typeInput}
            });
            res.errCode = 0;
            res.data = allcode;
            resolve(res)
           }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports={
    handleUserLogin:handleUserLogin,
    checkUserEmail:checkUserEmail,
    getAllUsers:getAllUsers,
    createNewUser:createNewUser,
    deleteUser: deleteUser,
    updateUserData:updateUserData,
    getAllCodeService:getAllCodeService
}


