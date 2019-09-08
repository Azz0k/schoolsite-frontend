import React from 'react';
import {Admin, Root, Error404} from '../pages'
import {Switch,Route} from 'react-router-dom';

const  App = ()=> {


    return (
        <Switch>
            <Route path='/admin' component={Admin} exact />
            <Route path='/' component={Root} exact />
            <Route component={Error404}/>
        </Switch>
    );
};

export default App;