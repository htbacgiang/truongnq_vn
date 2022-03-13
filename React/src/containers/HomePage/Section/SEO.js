import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
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
                content="Xin chào tôi là: Ngô Quang Trường" />
                 </Helmet>
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
