import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";

// import {  } from '../../services/userService';



class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
           usersRedux:[]
        }
    
  
    };
    componentDidMount(){
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps,prevState, snapshot){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux:this.props.listUsers
            })
        }
    }
    handleDeleteUser=(user)=>{
        this.props.deleteUserRedux(user.id);
    }
    handleEditUser=(user)=>{
        this.props.handeleEditUserReact(user)
    }

    render() {
        let arrUsers= this.state.usersRedux;
        return (
            <div className="container">
       
                <div className="title text-center">USER TABLE</div>
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
                              
                        {arrUsers && arrUsers.length >0 && 
                        arrUsers.map((item,index) =>{
                            return(
                                <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phonenumber}</td>
                                <td>{item.address}</td>
 
                             <td>
                                 <button className="btn-edit"
                                    onClick={() => this.handleEditUser(item)}
                                 
                                 > <i className="fas fa-edit"></i> </button>
                                 <button className="btn-delete"
                                    onClick={() => this.handleDeleteUser(item)}
                                 > <i className="fas fa-trash"></i> </button>
 
                             </td> 
                             </tr>
                            )}
                        )}

                        </tbody>
                        </table>
                </div>
             </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux:() => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux:(id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
