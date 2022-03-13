import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import HomePage  from './HomePage/HomePage.js';
import { path } from '../utils'
import Login from './Auth/Login';
import Home from '../routes/Home';
import DetailBlog from './HomePage/Section/DetailBlog';
import Blog from './HomePage/Section/Blog';
import System from '../routes/System';
import Hatay from './HomePage/Section/Album/HaTay/Hatay'
import Image from './HomePage/Section/Image';
import Desgin from './HomePage/Section/Album/Desgin/Desgin';
import TruongFriend from './HomePage/Section/Album/Truong&Friends/TruongFriend';
import BSA from './HomePage/Section/Album/BSA/BSA';
import BusHN from './HomePage/Section/Album/BusHN/BusHN';
import VietNam from './HomePage/Section/Album/VN/VietNam';
import { CustomToastCloseButton } from '../components/CustomToast';
import  CustomScrollbars from '../components/CustomScrollbars';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{height:'100vh', width: '100%'}}> 
                            <Switch>
                                <Route path={path.HOME} exact component={(HomePage)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path="/blog" exact component={Blog} />
                                <Route path={path.DETAILBLOG} component={DetailBlog} />
                                <Route path="/album" exact component={Image} />
                                {/* <Route path="/album/viet-nam-que-huong-toi" exact component={} /> */}
                                <Route path="/album/ha-tay-que-lua" exact component={Hatay} />
                                <Route path="/album/truong-va-nhung-nguoi-ban" exact component={TruongFriend} />
                                <Route path="/album/design" exact component={Desgin} />
                                <Route path="/album/bus-ha-noi" exact component={BusHN} />
                                <Route path="/album/bsa" exact component={BSA} />
                                <Route path="/album/viet-nam-que-huong-toi" exact component={VietNam} />
                            </Switch>
                            </CustomScrollbars> 

                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);