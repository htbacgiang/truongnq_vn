import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";
import Navbar from '../../../Header/Navbar';
import Album from '../Album';
import ListBSA from './listBSA'
import '../../Album/Hatay.scss';
class DetailBlog extends Component {
    render() {
        return (
          <> 
          <Helmet>
                <title>Album ảnh | BSA - Hội sinh viên Bắc Giang </title>
                <meta 
                name="description" 
                content="Chào mừng bạn đến với website cá nhân của Ngô Quang Trường" />
                
          </Helmet>
        <Navbar />
        <Album />
        <div className='ha-tay'>
         <h1> BSA - Hội sinh viên Bắc Giang </h1>
        </div>
        <ListBSA />
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
