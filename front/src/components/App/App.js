import React, {Component} from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { connect } from 'react-redux';


import Nav from '../Nav';
import Footer from '../Footer';
import MainPage from '../MainPage';
import EnterForm from '../EnterForm';
import CheckInForm from '../CheckInForm';
import UserPage from '../UserPageOwner';
import AdminPage from '../AdminPage';


import mapDispatchToProps from '../actionsRedux';
import gotService from '../gotService/gotService.js';




const mapStateToProps = (state) => ({...state});





class App extends Component {
    gotService = new gotService();

    

    componentDidMount() {
        const jwt = localStorage.getItem('superJWT_')
        if(jwt && !this.props.data) {
            
            this.gotService.getJWT(jwt)
                .then(res=> this.props.putState({data: res}), err=> console.log(err))

        }   
    }



    render() {
        let ovnerId = this.props.data ? this.props.data._id: null;

        return(
            <>
                <div className='wrapper'>
                    <div className='main-background'></div>
                    <section className='main-part'>
                        <Nav ovnerHere={ovnerId} />

                        <Switch>

                            <Route exact path='/'>
                                <MainPage/>
                            </Route>

                            <Route path='/user/:id' render={({match}) => (
                                    <UserPage idU={match}/>
                            )}/>
                                
                            <Route path='/users/get'>
                                <EnterForm/>
                            </Route>

                            <Route path='/users/new'>
                                <CheckInForm/>
                            </Route>

                            <Route path='/adminpage' >
                                <AdminPage/>
                            </Route>

                            <Redirect to="/"/>
                        </Switch>

                    </section>
                    <Footer/>
                </div>
            </>
        )
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(App);