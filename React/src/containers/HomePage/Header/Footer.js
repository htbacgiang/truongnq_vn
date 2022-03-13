import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class Banner extends Component {

    componentDidMount(){
            
    
      }

    render() {
        
        return (
            <React.Fragment>
            <div className='footer'>
            Copyright © 2022 truongnq.vn | Design by: Truong Tlbb
            </div>

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
