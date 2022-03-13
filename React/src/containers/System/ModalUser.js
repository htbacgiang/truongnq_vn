import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    handleAddNewUser = ()=>{
        let isValid = this.checkValideInput();
        if(isValid === true){
            this.props.createNewUser(this.state);
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
            <ModalHeader toggle={()=>{this.toggle()}}> Create New User</ModalHeader>
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
                <input type="email" className="form-control"onChange={(event)=> {this.handleOnChangeInput(event, 'email')}}  value={this.state.email} placeholder="truongtl27.ht@gmail.com"/>
              </div>
              <div className="form-group">
                <label for="inputPassword4">Password</label>
                <input type="password" className="form-control" onChange={(event)=> {this.handleOnChangeInput(event, 'password')}} value={this.state.password} placeholder="Nhập mật khẩu"/>
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
              onClick={()=>{this.handleAddNewUser()}}>Tạo tài khoản</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
