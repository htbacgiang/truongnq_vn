import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../../Header/Navbar';
import Album from '../Album';
import ListTruong from './ListTruong';
import {Helmet} from "react-helmet";
import '../../Album/Hatay.scss';
class DetailBlog extends Component {
    render() {
        return (
          <> 
            <Helmet>
                <title>Album ảnh | Trường và những người bạn</title>
                <meta 
                name="description" 
                content="Chào mừng bạn đến với website cá nhân của Ngô Quang Trường" />
                 </Helmet>
        <Navbar />
        <Album />
        <div className='ha-tay'>
         <h1> Trường và những người bạn</h1>
        </div>
        <ListTruong />
          </>
             
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBlog);
