import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email:'',
            pasword:'',
            firstName:'',
            lastName:'',
            address:'',
            phonenumber:''
        }
        this.listenToEmitter();
    }
    listenToEmitter(){
      emitter.on('EVENT_CLEAR_MODAL', () =>{
        this.setState({
          id: '',
          email:'',
          pasword:'',
          firstName:'',
          lastName:'',
          address:'',
          phonenumber:''
        })
      })
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: '123',
                firstName:user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber
            })
        }
    }   

    toggle= () =>{
        this.props.toggleFrom();
    }
    handleOnChangeInput=(event, id)=>{
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    
    }
    checkValideInput=()=>{
        let isValid = true;
        let arrInput = ['firstName','lastName','email','password','address','phonenumber'];
        for(let i=0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Thiếu : ' + arrInput[i]+ ' nhé !!!') ;
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = ()=>{
        let isValid = this.checkValideInput();
        if(isValid === true){
            this.props.editUser(this.state);
        }
    }
    render() {
        return (
            <Modal 
            isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}}
             className={'abcclassNameName'}
            //  size="lg"

             >
            <ModalHeader toggle={()=>{this.toggle()}}> Edit User</ModalHeader>
            <ModalBody>
                <div className="container">
                   <form> 
               <div className="form-row">
                <div className="form-group">
                  <label for="inputEmail4">First Name</label>
                  <input typ="text" className="form-control" onChange={(event)=> {this.handleOnChangeInput(event, 'firstName')}} value={this.state.firstName} placeholder="Ngô"/>
                </div>
                <div className="form-group ">
                  <label for="inputPassword4"> Last name </label>
                  <input type="text" className="form-control" onChange={(event)=> {this.handleOnChangeInput(event, 'lastName')}} value={this.state.lastName} placeholder="Quang Trường"/>
                </div>
              </div>
            <div className="form-row">
              <div className="form-group ">
                <label for="inputEmail4">Email</label>
                <input 
                    type="email"
                 className="form-control"
                 onChange={(event)=> {this.handleOnChangeInput(event, 'email')}} 
                  value={this.state.email} 
                  placeholder="truongtl27.ht@gmail.com"
                  disabled/>
              </div>
              <div className="form-group">
                <label for="inputPassword4">Password</label>
                <input
                 type="password"
                  className="form-control" 
                  onChange={(event)=> {this.handleOnChangeInput(event, 'password')}} 
                  value={this.state.password} 
                  placeholder="Nhập mật khẩu"
                  disabled/>
              </div>
            </div>
            <div className="form-group">
              <label for="inputAddress">Address</label>
              <input type="text" className="form-control" onChange={(event)=> {this.handleOnChangeInput(event, 'address')}} value={this.state.address}placeholder="Hà Tây"/>
            </div>
            <div className="form-group">
              <label for="inputAddress2"> Phone number</label>
              <input type="text" className="form-control" onChange={(event)=> {this.handleOnChangeInput(event, 'phonenumber')}} value={this.state.phonenumber} placeholder="0979 84 2701"/>
            </div>
            
            <div className="form-row">
              <div className="form-group col-md-3">
                <label  for="inputState">Sex</label>
                <select name="gender" className="form-control">
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>

                </select>
              </div>
              
         </div>
         </form> 
         </div>


            </ModalBody>
            <ModalFooter>
              <Button color="primary" 
              className="px-3" 
              onClick={()=>{this.handleSaveUser()}}>Cập nhật</Button>{' '}
              <Button color="secondary" className="px-3" onClick={()=>{this.toggle()}}>Hủy</Button>
            </ModalFooter>
          </Modal>
            )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
