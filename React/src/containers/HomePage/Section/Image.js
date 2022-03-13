import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link , Redirect} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Navbar from '../Header/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Image.scss';
import Footer from '../Header/Footer';
import blogpost1 from '../../../assets/blog/blogpost1.jpg';
import blogpost2 from '../../../assets/blog/blogpost2.jpg';
import blogpost3 from '../../../assets/blog/blogpost3.jpg';
import blogpost4 from '../../../assets/blog/blogpost4.jpg';
import blogpost5 from '../../../assets/blog/blogpost5.jpg';
import blogpost6 from '../../../assets/blog/blogpost6.jpg';


class Image extends Component {
  
    render() {
         
        return (
            <> 
                <Helmet>
                <title>Album ảnh </title>
                <meta 
                name="description" 
                content="Hình ảnh" />
               </Helmet>
               <Navbar />
            <div className="image-container">
                <div id="latest-blog">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="heading-section">
                    <Link to ={`/album`}>
                    <h2>ALBUM ẢNH</h2>
                    </Link>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 col-sm-6">
                <div className="blog-post">
                    <Link to ={`/album/viet-nam-que-huong-toi`}> 
                    <div className="blog-thumb">
                        <img src={blogpost1} alt="" />
                    </div>
                    </Link>

                    <div className="img-content">
                        <div className="content-show">
                            <h4><a href="single-post.html">Việt Nam quê hương tôi</a></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6">
                <div className="blog-post">
                     <Link to ={`/album/ha-tay-que-lua`}> 
                    <div className="blog-thumb">
                        <img src={blogpost2} alt="" />
                    </div>
                    </Link>
                    <div className="img-content">
                        <div className="content-show">
                            <h4><a href="single-post.html">HÀ TÂY QUÊ LỤA</a></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6">
                <div className="blog-post">
                <Link to ={`/album/truong-va-nhung-nguoi-ban`}> 
                    <div className="blog-thumb">
                        <img src={blogpost3} alt="" />
                    </div>
                    </Link>
                    <div className="img-content">
                        <div className="content-show">
                            <h4><a href="single-post.html">TRƯỜNG VÀ NHỮNG NGƯỜI BẠN</a></h4>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6">
                <div className="blog-post">
                    <Link to ={`/album/bsa`}> 
                    <div className="blog-thumb">
                        <img src={blogpost4} alt="" />
                    </div>
                    </Link>
                    <div className="img-content">
                        <div className="content-show">
                            <h4><a href="single-post.html">BSA</a></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6">
                <div className="blog-post">
                    <Link to ={`/album/bus-ha-noi`}> 
                    <div className="blog-thumb">
                        <img src={blogpost5} alt="" />
                    </div>
                   </Link>    
                    <div className="img-content">
                        <div className="content-show">
                            <h4><a href="single-post.html">XE BUS HÀ NỘI</a></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6">
                <div className="blog-post">
                   <Link to ={`/album/design`}> 
                    <div className="blog-thumb">
                        <img src={blogpost6} alt="" />
                    </div>
                   </Link>    

                    <div className="img-content">
                        <div className="content-show">
                            <h4><a href="single-post.html">Design</a></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

            </div>
            <Footer />

            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Image);
