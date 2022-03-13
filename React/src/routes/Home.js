import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";

class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/';

        return (
            <> 
                <Helmet>
                <title>Ngô Quang Trường</title>
                <meta 
                name="description" 
                content="Chào mừng bạn đến với website cá nhân của Ngô Quang Trường" />
                 </Helmet>
                 <Redirect to={linkToRedirect} />
            
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
