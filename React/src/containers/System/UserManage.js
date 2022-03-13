import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers , createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers:[],
            isOpenModalUser:false,
            isOpenModalEditUser:false,
            userEdit:{}
        }
    }
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async()=>{
        let response = await getAllUsers('ALL');
        console.log('data', response)
        if(response && response.errCode ===0){
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = ()=>{
        this.setState({
            isOpenModalUser:true,
        })
    }
    toggleUserModel=()=>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleEditUserModel=()=>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data)=>{
        try{
        let response = await  createNewUserService(data);
        if(response && response.errCode !==0){
            alert(response.errMessage)
        }else{
            await this.getAllUsersFromReact()
            this.setState({
                isOpenModalUser: false
            })
            emitter.emit('EVENT_CLEAR_MODAL')
        }
        }catch(e){
            console.log(e)
        }
    }
    handleDeleteUser = async (user)=>{
        try{
            let res = await deleteUserService(user.id);
            if(res && res.errCode ===0){
                await this.getAllUsersFromReact();
            }else{
            alert(res.errMessage)

            }
        }catch(e){
            console.log(e)
        }
    }
    handleEditUser = async (user)=>{
        console.log('Edit', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEditUser = async (user) => {
    try{
        let res = await editUserService(user);
        if(res && res.errCode === 0){
            this.setState({
            isOpenModalEditUser: false
            })
            await this.getAllUsersFromReact()
        }else{
            alert(res.errCode)
        }
    }catch(e){
        console.log(e)
    }
}
    render() {
        let arrUsers =this.state.arrUsers;
        
        return (
            <div className="container">
                <ModalUser
                        isOpen= {this.state.isOpenModalUser}
                        toggleFrom={this.toggleUserModel}
                        createNewUser={this.createNewUser}
                />

                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                    isOpen= {this.state.isOpenModalEditUser}
                    toggleFrom={this.toggleEditUserModel}
                    currentUser={this.state.userEdit}
                    editUser={this.doEditUser}
                    />
                }
               
                <div className="title text-center">USER TABLE</div>
                <button 
                type="button" 
                className="btn btn-primary px-3"
                onClick={() => this.handleAddNewUser()}
                > + Add New User </button>
                <div className="user-table">
                <table className="table table-dark" id="customers">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                                {arrUsers && arrUsers.map((item,index)=>{
                                    return(
                             <tr key={index}>
                               <td>{item.id}</td>
                               <td>{item.firstName}</td>
                               <td>{item.lastName}</td>
                               <td>{item.email}</td>
                               <td>{item.phonenumber}</td>
                               <td>{item.address}</td>
                            <td>
                                <button className="btn-edit" onClick={()=> this.handleEditUser(item)}> <i className="fas fa-edit"></i> </button>
                                <button className="btn-delete" onClick={()=> this.handleDeleteUser(item)}> <i className="fas fa-trash"></i> </button>

                            </td> 
                            </tr>

                                )
                                })
                                }
                        </tbody>
                        </table>
                </div>
             </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
