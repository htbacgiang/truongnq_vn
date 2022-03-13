import { getAllCodeService , createNewUserService,getAllUsers,deleteUserService,editUserService} from '../../services/userService';
import actionTypes from './actionTypes';
import { ToastContainer, toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState)=>{
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if(res && res.errCode ===0 ){
               dispatch( fetchGenderSuccess(res.data))
            }else{
                dispatch( fetchGenderFailded());
            }
        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('lỗi',e)
        }
    }
  
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailded = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})
export const createNewUser = (data) => {
    return async (dispatch, getState)=>{
        try {
            
            let res = await createNewUserService(data);
            if(res && res.errCode ===0 ){
                toast.success("Tạo thành công");
                   dispatch( saveUserSuccess())
                   dispatch( fetchAllUsersStart())
            }else{
                dispatch( saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
        }
    }
  
}
export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCES'

})
export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED'
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState)=>{
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res = await getAllUsers("ALL")
            if(res && res.errCode ===0 ){
               dispatch( fetchAllUsersSuccess(res.users.reverse()))
            }else{
                toast.error("Lỗi rồi");
                dispatch( fetchAllUsersFailded());
            }
        } catch (e) {
            toast.error("Lỗi rồi");
            dispatch(fetchAllUsersFailded());
            console.log('lỗi',e)
        }
    }
  
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailded = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIDED,
})

export const deleteUser = (userId) => {
    return async (dispatch, getState)=>{
        try {
            
            let res = await deleteUserService(userId);
            if(res && res.errCode ===0 ){
                toast.success("OK, xóa rồi nhé");
                   dispatch( saveUserSuccess())
                   dispatch( fetchAllUsersStart())
            }else{
                toast.error("Chưa xóa được rồi! Buồn quá");
                dispatch( deleteUserFailed());
            }
        } catch (e) {
            toast.error("Chưa xóa được rồi! Buồn quá");
            dispatch(deleteUserFailed());
        }
    }
  
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCES


})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED

})
export const updateUser = (data) => {
    return async (dispatch, getState)=>{
        try {
            
            let res = await editUserService(data);
            if(res && res.errCode ===0 ){
                toast.success("OK, Xong rồi nhé");
                   dispatch( updateUserSuccess())
                   dispatch( fetchAllUsersStart())
            }else{
              toast.error("Chưa cập nhật được đâu!");
                dispatch( deleteUserFailed());
            }
        } catch (e) {
            toast.error("Chưa cập nhật được đâu!");
            dispatch(updateUserFailed());
        }
    }
  
}
export const    updateUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCES


})
export const updateUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED

})