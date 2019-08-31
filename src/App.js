import React, {Fragment} from 'react';
import Header from './components/Header/Header.js';
import NavBar from './components/NavBar/NavBar.js'
import Container from './components/Container/Container.js';
import './App.css';
import SiteState from "./components/SiteState/SiteState";


class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            site : SiteState
        };
//        this.state.site.GetAndValidateJWT();
        this.handleRememberInputClick = this.handleRememberInputClick.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleRememberInputClick(value){
        this.setState((state)=>(state.site.isRememberChecked = value));
    }

    handleLoginSubmit(fields){
        let pattern = /^[\w-_@]+$/;
        if (pattern.test(fields.username)){
            this.Authorization(fields.username,fields.password);
        }
    }

    render() {
        return (
            <Fragment>
                <Header/>
                {/*<NavBar isAuthorized={this.state.isAuthorized} LoginMenu={this.state.LoginMenu} MainMenu={this.state.MainMenu} AdminMenu={this.state.AdminMenu} onRememberInputClick={this.handleRememberInputClick} />*/}
                <NavBar isAuthorized={this.state.site.isAuthorized} LoginMenu={this.state.site.LoginMenu}
                        MainMenu={this.state.site.MainMenu} AdminMenu={this.state.site.AdminMenu}
                        onRememberInputClick={this.handleRememberInputClick} handleLoginSubmit={this.handleLoginSubmit} isRememberChecked={this.state.site.isRememberChecked}/>
                <Container/>
            </Fragment>
        );
    }

    StoreJWT(jwt){
        this.setState((state)=>(state.site.BackendAPI.jwt = jwt));
        //{site: {BackendAPI:{jwt:jwt}}});


        if (this.state.site.isRememberChecked){
            localStorage.setItem('jwt', jwt);
            sessionStorage.clear();
        }
        else {
            sessionStorage.setItem('jwt', jwt);
            localStorage.clear();
        }
    }
    ClearJWT(){
        localStorage.clear();
        sessionStorage.clear();
    }
/*
    async GetAndValidateJWT(){
        let url = this.BackendAPI.host+this.BackendAPI.api+this.BackendAPI.loginUrl;
        let jwt = null;
        if (sessionStorage.getItem('jwt')){
            jwt = sessionStorage.getItem('jwt');
            this.isRememberChecked = false;
        }
        else if (localStorage.getItem('jwt')){
            jwt = localStorage.getItem('jwt');
            this.isRememberChecked = true;
        }
        else return null;

        let AuthHeader = {'Authorization':'Bearer '+jwt};
        let response = await this.BackendAPI.app.get(url,{headers:AuthHeader});
        jwt = response.data['jwt'];
        if (response.status===200 && jwt){
            this.isAuthorized = true;
            this.StoreJWT(jwt);
        }
        else {
            this.isAuthorized = false;
            this.ClearJWT();
        }

    }
*/
    async Authorization(username, password){

        let url = this.state.site.BackendAPI.host+this.state.site.BackendAPI.api+this.state.site.BackendAPI.loginUrl;
        let response = await this.state.site.BackendAPI.app.get(url);
        let csrf = response.data['csrf'];
        let data = {username:username,password:password, csrf:csrf};
        response = await this.state.site.BackendAPI.app.post(url,data);
        let jwt = response.data['jwt'];
        if (response.status===200 && jwt){
            this.setState((state)=>(state.site.isAuthorized = true));
            this.StoreJWT(jwt);
        }
        else {
            this.setState((state)=>(state.site.isAuthorized = false));
            this.ClearJWT();
        }
    }
}

export default App;
