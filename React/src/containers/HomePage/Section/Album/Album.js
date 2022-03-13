import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link , Redirect} from 'react-router-dom';
import Navbar from '../../Header/Navbar';
import './Album.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import blogpost1 from '../../../../assets/blog/blogpost1.jpg';
import blogpost2 from '../../../../assets/blog/blogpost2.jpg';
import blogpost3 from '../../../../assets/blog/blogpost3.jpg';
import blogpost4 from '../../../../assets/blog/blogpost4.jpg';
import blogpost5 from '../../../../assets/blog/blogpost5.jpg';
import blogpost6 from '../../../../assets/blog/blogpost6.jpg';


class Album extends Component {

    render() {
     
        return (
            <>
            <Navbar />
            <div className='header-album'>
             <Link to ={`/album/viet-nam-que-huong-toi`}> 
                <div className='thumlb-album'>
                    <img src={blogpost1} />
                </div>
             </Link>
             <Link to ={`/album/ha-tay-que-lua`}> 
                <div className='thumlb-album'>
                    <img src={blogpost2} />
                </div>
             </Link>
             <Link to ={`/album/truong-va-nhung-nguoi-ban`}> 
                <div className='thumlb-album'>
                    <img src={blogpost3} />
                </div>
             </Link>
             <Link to ={`/album/bsa`}> 
                <div className='thumlb-album'>
                    <img src={blogpost4} />
                </div>
             </Link>
             <Link to ={`/album/bus-ha-noi`}> 
                <div className='thumlb-album'>
                    <img src={blogpost5} />
                </div>
             </Link>    
             <Link to ={`/album/design`}> 
                <div className='thumlb-album'>
                    <img src={blogpost6} />
                </div>
             </Link>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Album);
