import React from 'react';
import { Admin, Container, Error404 } from '../pages';
import { Switch, Route } from 'react-router-dom';
import Header from '../header/header';
import NavBar from '../navbar/navbar';

const App = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <NavBar />
                <Route path='/admin' component={Admin} exact />
                <Route path='/' component={Container} exact />
                <Route component={Error404} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
