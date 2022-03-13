import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";
import Video from './Section/Video';
import Blog from './Section/Blog';
import Image from './Section/Image';
import Navbar from './Header/Navbar';
import Banner from './Header/Banner';
import SEO from './Section/SEO';
import Footer from './Header/Footer';
import Logo from '../../assets/thumlbnail/logo.png';
class HomePage extends Component {

    render() {
        return (
            <> 
                <Helmet>
                <title>Ngô Quang Trường | HomePage </title> 
                <meta 
                name="description" 
                content= {"Chào mừng bạn đã đến với website của Ngô Quang Trường"} />
                <meta name="og:type" content="website" />
                <meta property="og:image" content={Logo}/>
                <meta property="og:image:type" content="image/jpeg"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:width" content="600"/>
                 </Helmet>
                 <Navbar />
                 <Banner /> 
                 <Blog />
                 <Image />
                 <Video />
                 <SEO />
                 <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
