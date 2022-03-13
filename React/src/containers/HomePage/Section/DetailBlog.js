import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailBlog.scss';
import {getDetailBlog} from '../../../services/blogService'
import {Helmet} from "react-helmet";
import Navbar from '../Header/Navbar';
import Footer from '../Header/Footer';
class DetailBlog extends Component {
  constructor(props){
    super(props);
    this.state = {
      detailBlog:{}
    }
  }
    async componentDidMount(){
      if(this.props.match && this.props.match.params && this.props.match.params.slug){
        let slug = this.props.match.params.slug;
        let res = await getDetailBlog(slug);
        if(res && res.errCode ===0){
          this.setState({
            detailBlog : res.data
          })
        }
      }
    }


      componentDidUpdate(prevProps,prevState, snapshot){
      
      }
    render() {
        let {detailBlog} = this.state;
        return (
          <> 
          <Navbar/> 
          <div className='detail_blog'>
         
             <Helmet>
                <title>{detailBlog.name}</title> 
                <meta 
                name="description" 
                content= {detailBlog.description} />
                <meta name="og:type" content="website" />
                <meta name="og:title" content={detailBlog.name} />
                <meta property="og:image" content={detailBlog.linkimage}/>
                <meta property="og:image:type" content="image/jpeg"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:width" content="600"/>
                 </Helmet>
            <div className='content-blog'>
            <h1 > {detailBlog.name} </h1>
             <p> {detailBlog.createdAt} </p>
            <div dangerouslySetInnerHTML={{__html: detailBlog.contentHTML} }></div>
              </div>
          </div>
          <Footer />

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
