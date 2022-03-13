import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { handleLoginApi } from '../../services/userService';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            isShowPassword: false,
            errMessage: '',
        }
    }
          handleOnchangeUsername =(event) =>
        {   
        this.setState({
            username: event.target.value
        })
        } 

         handleOnchangePassword =(event) =>
        {   
        this.setState({
            password: event.target.value
        })
          }
    
        handeleShowPassword =() => {
            this.setState({
                isShowPassword:!this.state.isShowPassword
            })
           }  
        handleLogin = async() =>{
            this.setState({
                errMessage:''
            })
            try{
                let data =  await handleLoginApi(this.state.username, this.state.password);
                   if(data && data.errCode !== 0){
                       this.setState({
                           errMessage: data.message
                       })

                   }  
                   if(data && data.errCode === 0){
                    this.props.userLoginSeccess(data.user)
                   }
               }
                        
            catch(error){
                if(error.response){
                    if(error.response.data){
                        this.setState({
                            errMessage: error.response.data.message
                        }) 

                    }
                }
            }  
           }

    render() {
   

        return (
            <div className= "login-bg"> 
            <div className= "login-container"> 
                 <div className= "login-content row"> 
                 <div className="col-12 text-login"> Login </div>
                 <div className="col-12 form-group login-input"> 
                    <label>Username:</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Nhập username"
                    value={this.state.username}
                    onChange={(event)=> this.handleOnchangeUsername(event)}
                    />
                 </div>
                 <div className="col-12 form-group login-input"> 
                    <label>Password:</label>
                    <div className="input-password" >
                    <input
                    type={this.state.isShowPassword ? 'text' : 'password'} 
                    className="form-control" 
                    placeholder="Nhập password"
                    value={this.state.password}
                    onChange={(event)=>this.handleOnchangePassword(event)}

                    />
                    <span
                    onClick={()=> {this.handeleShowPassword()}}
                    >
                        <i className={(this.state.isShowPassword ?'far fa-eye' : 'fas fa-eye-slash' )}></i>
                    </span>
                    </div>
                 </div>
               
                 <div className="col-12" style={{color:'red'}} > 
                     {this.state.errMessage}
                 </div>

                 <div className="col-12"> 
                 <button type="button" className="btn btn-success btn-login"  onClick={()=>{this.handleLogin()}} >Login </button>
                 </div>
                 <div className="col-12 forgot-password"> 
                    <span>Forgot your password? </span>
                 </div>
                 <div className="col-12 text-center mt-3"> 
                 <span className="other-login">Or Login With:</span>
                 </div>
                 <div className="col-12 social-login"> 
                 <i className="fab fa-facebook-f facebook"></i>
                 <i className="fab fa-google-plus-g google"></i>

                 </div>
                 </div>
            </div>
        </div>
        
        )
    }
    }

    const mapStateToProps = state => {
    return {
        language: state.app.language
    };
    };

    const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSeccess: (userInfo) => dispatch(actions.userLoginSeccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
