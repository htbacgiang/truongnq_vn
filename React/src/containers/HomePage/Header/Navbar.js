import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link , Redirect} from 'react-router-dom';
import { withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import Logo  from '../../../assets/logo.png';

class Video extends Component {
    componentDidMount(){
   
      }
    render() {

         
        return (
          <>
       
     <div className="header-navbar">
        <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="logo-nav">
            <div className="logo">
             <Link to ={`/`}>
             <img src={Logo} alt=""/>
             </Link>
            </div>
                  <label for="nav-mobile-input" className="icon"> <i className="fas fa-bars"></i> </label>  
            </div>
    </div>

    <input hidden type="checkbox" className="nav-input" id="nav-mobile-input"/>
    <label for="nav-mobile-input" className="nav-overlay"></label>
    <div className="menu-mobile" >
        <label for="nav-mobile-input" className="nav-close-btn"> <i className="fas fa-times"></i></label>    
        <ul>
          <li><a> <Link to={`/`}> Trang chủ </Link> </a></li>
          <li><a> <Link to={`/about`}> Giới thiệu</Link> </a></li>
          <li>
          <a> <Link to={`/album`}> Album </Link> </a>
            <label for="btn-1">  <i class="fas fa-angle-down"></i>  </label>
            <input className='input' type="checkbox" id="btn-1"/>
            <ul>
                       <li><a> <Link to={`/album/viet-nam-que-huong-toi`}> Việt Nam quê hương tôi </Link> </a></li>
                       <li><a> <Link to={`/album/ha-tay-que-lua`}> Hà Tây quê lụa </Link> </a></li>
                       <li><a> <Link to={`/album/truong-va-nhung-nguoi-ban`}> Trường & Friends </Link> </a></li>
                       <li><a> <Link to={`/album/bsa`}> BSA </Link> </a></li>
                       <li><a> <Link to={`/album/bus-ha-noi`}> Xe bus Hà Nội </Link> </a></li>
                       <li><a> <Link to={`/album/design`}> Design </Link> </a></li>
            </ul>
          </li>
          <li><a> <Link to={`/blog`}> Bài biết </Link> </a></li>
          <li><a> <Link to={`/lien-he`}> Liên hệ </Link> </a></li>
          </ul>
    </div>
        <div className="d-none d-sm-none d-md-none d-lg-block col-lg-8">
            <div className="menu-pc">
                <ul>
                    <li><a> <Link to={`/`}> Trang chủ </Link> </a></li>
                    <li><a> <Link to={`/about`}> Giới thiệu </Link> </a></li>
                    <li><a> <Link to={`/album`}> Album</Link> </a>
                      <ul>
                      <li><a> <Link to={`/album/viet-nam-que-huong-toi`}> Việt Nam quê hương tôi </Link> </a></li>
                       <li><a> <Link to={`/album/ha-tay-que-lua`}> Hà Tây quê lụa </Link> </a></li>
                       <li><a> <Link to={`/album/truong-va-nhung-nguoi-ban`}> Trường & Friends </Link> </a></li>
                       <li><a> <Link to={`/album/bsa`}> BSA </Link> </a></li>
                       <li><a> <Link to={`/album/bus-ha-noi`}> Xe bus Hà Nội </Link> </a></li>
                       <li><a> <Link to={`/album/design`}> Design </Link> </a></li>
                      </ul>
                    </li>
                    <li><a> <Link to={`/blog`}> Bài viết </Link> </a></li>
                    <li><a> <Link to={`/lien-he`}> Liên hệ </Link> </a></li>
                </ul>
            </div>
        </div>
        </div>
    </div>
          </>
         
        );
}
}



const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
