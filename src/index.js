import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app';
import {Provider } from 'react-redux';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import ErrorBoundary from './components/error-boundry';
import SchoolSiteService from './services/schoolsite-service';
import {SchoolSiteServiceProvider} from './components/schoolsite-service-context';
import store from './store';


const schoolSiteService = new SchoolSiteService();

ReactDom.render(
    <Provider store={store}>
        <ErrorBoundary>
            <SchoolSiteServiceProvider value = {schoolSiteService}>
                <Router>
                    <App/>
                </Router>
            </SchoolSiteServiceProvider>
        </ErrorBoundary>
    </Provider>
    , document.getElementById('root'));
