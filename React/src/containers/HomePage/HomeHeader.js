import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typewriter from 'typewriter-effect';
import './HomeHeader.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormattedMessage} from 'react-intl';
import Banner from '../../assets/images/banner2.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



class HomeHeader extends Component {

    render() {
     
        return (
			<>
				<div className='home-header-banner'> 
				<Carousel>
				<Carousel.Item>
				<div className='banner'>
					<img
					className="d-block w-100"
					src={Banner}
					alt="First slide"
					/>
				</div>

				</Carousel.Item>
				<Carousel.Item>
				<div className='banner'>
					<img
					className="d-block w-100"
					src={Banner}
					alt="First slide"
					/>
				</div>

				</Carousel.Item>
				</Carousel>

				</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
