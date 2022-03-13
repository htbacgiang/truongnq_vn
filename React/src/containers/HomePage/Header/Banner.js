import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typewriter from 'typewriter-effect';
import './Banner.scss';
import { Link , Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cover from "../../../assets/images/banner1.png";
import {Helmet} from "react-helmet";

class Banner extends Component {

    componentDidMount(){
            
    
      }

    render() {
        
        return (
            <React.Fragment>
              <Helmet>
                <title>Ngô Quang Trường</title>
                <meta 
                name="description" 
                content="Chào mừng bạn đến với website cá nhân của Ngô Quang Trường" />
                 </Helmet>
            <div className='home-header-banner'>
                    <div className="banner">
                <img src={Cover} alt=""/>
                <div className="intro">
                    <section className="home" id="home">
                        <div className="max-width">
                            <div className="home-content">
                                <div className="text-1">Xin chào, Tôi là: </div>
                                <div className="text-2">Ngô Quang Trường </div>
                                <div className="text-3">And I'm a &nbsp; <span className="typing">
                                    <Typewriter
                                    options={{
                                        autoStart: true,
                                        loop: true,
                                        delay: 40,
                                        strings: ["Developer", "Designer", " Video Editer" , "Photographer", "Ads Mannager", "SEOer", "and Shipper"],
                                    }}
                                    />
                                
                                    </span></div>
                                <div className="buttons">
                                <Link to ={`/about`}>
                                <button>About Me</button>
                                 </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    </div>
                </div>
            </div>

          <section className="theodoi">
    <h3> Flollow Me</h3>
    <div className="wrapper">
        <div className="button">
           <div className="icon1">
              <i className="fab fa-facebook-f" > </i>
           </div>
           <span> <a href="https://www.facebook.com/truongtl27.ht/" target="_blank" > Facebook </a> </span>
        </div>
        <div className="button">
           <div className="icon1">
              <i className="fab fa-flickr"></i>
           </div>
           <span> <a href="https://flickr.com/htbacgiang " target="_blank" > Flickr</a> </span>
        </div>
        <div className="button">
           <div className="icon1">
              <i className="fab fa-instagram"></i>
           </div>
           <span> <a href="https://www.instagram.com/truongtl27.ht" target="_blank"> Instagram</a> </span>
        </div>
        
        <div className="button">
           <div className="icon1">
              <i className="fab fa-youtube"></i>
           </div>
           <span><a href="https://www.youtube.com/channel/UCBe3QQefgDgkav0EhwA3xGA" target="_blank"> YouTube </a> </span>
        </div>
     </div>
       
 </section>

            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
