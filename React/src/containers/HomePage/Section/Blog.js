import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link , Redirect} from 'react-router-dom';
import { withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Blog.scss';
import "aos/dist/aos.css";
import {getBlogs} from '../../../services/blogService'
import {Helmet} from "react-helmet";
import Navbar from '../Header/Navbar';
import Footer from '../Header/Footer';
class Blog extends Component {
        constructor(props){
            super(props);
            this.state={
                dataBlog:[],
                activePage: 15
            }
        }
    async componentDidMount (){
        let res = await getBlogs();
        if(res && res.errCode ===0){
            this.setState({
                dataBlog: res.data ? res.data : []
            })
        }
    }
    handleViewDetailBlog = (blog) => {
        console.log('click', blog)
        this.props.history.push(`/blog/${blog.slug}`)

    }
    render() {
         let {dataBlog} = this.state
        return (
            <> 
                 <Helmet>
                <title>Blog của Trường</title>
                <meta 
                name="description" 
                content="Chào mừng bạn đến với website cá nhân của Ngô Quang Trường" />
                 </Helmet>
                 <Navbar/>
            <div className="blog">
                <section className="section" id="blog">
        <div className="container">
            
            <div className="row">
                <div className="col-lg-12">
                    <div className="center-heading">
                        <h2 className="section-title">Blog của Trường </h2>
                    </div>
                </div>
                <div className="offset-lg-3 col-lg-6">
                    <div className="center-text">
                        <p></p>
                    </div>
                </div>
            </div>
            
             
            <div class="row" {...this.props.settings} >
                {dataBlog &&dataBlog.length>0 && dataBlog.map((item, index)=>{
                    return(
                        <div class="col-lg-4 col-md-6 col-sm-12" key={index}>
                        <div class="blog-post-thumb">
                            <div class="img" onClick={()=>this.handleViewDetailBlog(item)} style={{backgroundImage:`url(${item.image})`}}>
                            </div>
                            <div class="blog-content">
                                <h3>
                                    <a> 
                                <Link to ={`/blog/${item.slug}`}> {item.name}</Link>
                                </a>
                                </h3>

                                <div class="text">
                                    {item.description}
                                </div>
                                <button class="main-button" > 
                                <Link to ={`/blog/${item.slug}`}> Chi tiết </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    )
                })}
           
            </div>
        </div>
    </section>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
