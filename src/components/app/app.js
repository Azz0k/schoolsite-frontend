import React from 'react';
import { Admin, Container, Error404, Logout } from '../pages';
import { Switch, Route } from 'react-router-dom';
import Header from '../header/header';
import NavBar from '../navbar/navbar';

const App = () => {
    return (
        <React.Fragment>
            <Header />
            <NavBar />
            <Switch>
                <Route path='/' component={Container} exact />
                <Route path='/admin' component={Admin} exact />
                <Route path='/admin/:id?' component={Admin} />
                <Route path='/logout' component={Logout} exact />
                <Route component={Error404} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
