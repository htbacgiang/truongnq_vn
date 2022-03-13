import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {getAllCodeService} from"../../services/userService";
import * as actions from "../../store/actions";
import {CRUD_ACTION, CommonUtils} from '../../utils';
import "./UserRedux.scss";
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Lightbox from 'react-image-lightbox';
import TableManageUser from './TableManageUser';
import { data } from 'jquery';
import MetaTags from 'react-meta-tags';

class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state={
            genderArr:[],
            preImg:'',
            isOpen:false,
            email:'',
            password:'',
            lastName:'',
            firstName:'',
            phonenumber:'',
            address:'',
            gender:'',
            avatar:'',
            action:'',
            userEditId:''
        }

    }

    async componentDidMount() {
        this.props.getGenderStart();
      
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux
            
            this.setState({
                genderArr: arrGenders,
                gender:arrGenders && arrGenders.length >0 ?  arrGenders[0].key: ''
            })
        }
        if(prevProps.listUsers!== this.props.listUsers){
            let arrGenders = this.props.genderRedux
            console.log('234', this.state)
            this.setState({
            email:'',
            password:'',
            lastName:'',
            firstName:'',
            phonenumber:'',
            address:'',
            gender:arrGenders && arrGenders.length >0 ?  arrGenders[0].key: '',
            avatar:'',
            action:CRUD_ACTION.CREATE
            })
        }
    }
    handleOnchangeImage = async (event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let  base64 = await CommonUtils.getBase64(file);
            console.log('img',base64)
            let objectUrl = URL.createObjectURL(file)
           console.log('1', objectUrl)
           this.setState({
            preImage: objectUrl,
            avatar:base64
           })
        }
    }
    openReviewImage= () =>{
        if(!this.state.preImage) return;
        this.setState({
            isOpen:true
        })
    }
    handleSaveUser=() =>{
        let isValid = this.checkValidateInput();
        if(isValid===false)  return;
        let {action} = this.state;
        if (action===CRUD_ACTION.CREATE){
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                phonenumber: this.state.phonenumber,
                avatar:this.state.avatar
            })
        }
        if (action===CRUD_ACTION.EDIT){
        this.props.updateUserRedux({
            id:this.state.userEditId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            gender: this.state.gender,
            phonenumber: this.state.phonenumber,
            avatar:this.state.avatar,
        })
        }
        // setTimeout(()=>{
        //     this.props.fetchUserRedux();
        // },1000)
    }
    checkValidateInput=() =>{
        let isValid = true;
        let arrCheck = ['email','password','lastName','firstName','phonenumber','address']
        for (let i=0; i < arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid=false;
                alert('Nhập thiếu '+ arrCheck[i])
                break;
            }
          
        }  return{
            isValid
        }
    }
    onChangeInput =(event,id)=>{
        let copyState = { ...this.state}
        copyState[id]=event.target.value
        this.setState({
            ...copyState
        },()=>{
            console.log('truongnq',this.state)
        })
    
    }
    handeleEditUser=(user)=>{
        let imageBase64 ='';
        if(user.image){
             imageBase64 = new Buffer(user.image,'base64').toString('binary');
        }
        
        console.log('edit', user)
        this.setState({
            email:  user.email,
            password:'12345',
            lastName: user.lastName,
            firstName: user.firstName,
            phonenumber: user.phonenumber,
            address :user.address,
            gender: user.gender,
            avatar:'',
            preImage:imageBase64,
            action: CRUD_ACTION.EDIT,
            userEditId:user.id
            })
    }
    render() {
        // console.log('check: ', this.state)
        let genders = this.state.genderArr;
        let {email,password,lastName,firstName,phonenumber,address,gender,avatar }= this.state;
        
        return (
            <div className="user-redux-container" >
                <div className="title text-center" >
                    <h2> Quản lý người dùng</h2>
            </div>
            <div className="user-redux-body" >
              <div className="container" >
                 <div className="row" >
                <h3> Thêm người dùng </h3>

                 <div className="col-3" >
                    <label> Email </label>
                    <input className="form-control"  type="email"
                        value={email}
                        onChange= {(event)=>{this.onChangeInput(event,'email')}}
                        disabled={this.state.action === CRUD_ACTION.EDIT? true :false}
                    /> 

                    </div>
                    <div className="col-3" >
                    <label> Mật khẩu </label>
                    <input className="form-control"  type="password"
                        value={password}
                        onChange= {(event)=>{this.onChangeInput(event,'password')}}
                    /> 

                    </div>
                    <div className="col-3" >
                    <label> Họ  </label>
                    <input className="form-control"  type="text"
                    value={firstName}
                    onChange= {(event)=>{this.onChangeInput(event,'firstName')}}
                    /> 

                    </div>
                    <div className="col-3" >
                    <label> Tên </label>
                    <input className="form-control"  type="text"
                    value={lastName}
                    onChange= {(event)=>{this.onChangeInput(event,'lastName')}}
                    /> 

                    </div>
                    <div className="col-3" >
                    <label>  Số điện thại </label>
                    <input className="form-control"  type="text"
                    value={phonenumber}
                    onChange= {(event)=>{this.onChangeInput(event,'phonenumber')}}
                    /> 

                    </div>
                    <div className="col-9" >
                    <label> Địa chỉ </label>
                    <input className="form-control"  type="text"
                    value={address}
                    onChange= {(event)=>{this.onChangeInput(event,'address')}}
                    /> 

                    </div>
                    <div className="col-3" >
                    <label> Giới tính </label>
                    <select className="form-control" 
                    value={gender}
                    onChange= {(event)=>{this.onChangeInput(event,'gender')}}
                    
                    > 
                    {genders&& genders.length > 0 && genders.map((item,index)=>{
                        return (
                        <option key={index} value={item.keyMap}> {item.valueVi}  </option>

                        )
                    })}
                       
                    </select>

                    </div>
                    <div className="col-4" >
                    <div> Avata </div>

                            <div className="preImg-container">
                            <input id="preImg" type="file" hidden
                            onChange={(event) => this.handleOnchangeImage(event)}
                            
                            />  
                             <label  className="labal-upload" htmlFor="preImg"> Tải ảnh <i class="fas fa-cloud-upload-alt"></i></label>
                               <div className="preview-image"
                               style={{backgroundImage:`url(${this.state.preImage})`}}
                               onClick={()=>this.openReviewImage()}
                               > 

                                  </div>      
                            </div>          

                    </div>
                    <div className="col-12 mt-2" >
                    <button type="button" className={this.state.action === CRUD_ACTION.EDIT? "btn btn-warning" : "btn btn-primary" }
                        onClick={() =>this.handleSaveUser()}
                    >{this.state.action === CRUD_ACTION.EDIT? 'Cập nhật' : 'Lưu'}
                    
                    </button>
                  
                    </div>
                 </div>
              </div>
             </div>
             <TableManageUser
                handeleEditUserReact={this.handeleEditUser}
                action={this.state.action}
             />
               {this.state.isOpen === true &&
                   <Lightbox
                   mainSrc={this.state.preImage}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                /> }
                 
             </div>

        )

    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart:() =>dispatch(actions.fetchGenderStart()),
        createNewUser:(data) =>dispatch(actions.createNewUser(data)),
        fetchUserRedux:() => dispatch(actions.fetchAllUsersStart()),
        updateUserRedux:(data) => dispatch(actions.updateUser(data))
        
        // processLogout: () => dispatch(actions.processLogout()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
