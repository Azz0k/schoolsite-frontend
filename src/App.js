import React, {Fragment} from 'react';
import Header from './components/Header/Header.js';
import NavBar from './components/NavBar/NavBar.js'
import Container from './components/Container/Container.js';
import './App.css';
import SiteState from "./components/SiteState/SiteState";

class App extends React.Component{
    constructor(props){
        super(props);
//        this.state = new SiteState();

        this.state={
            site : new SiteState()
        };
        this.handleRememberInputClick = this.handleRememberInputClick.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }
    handleRememberInputClick(value){
        this.setState((state)=>(state.site.isRememberChecked = value));
    }
    handleLoginSubmit(fields){

    }
    render() {
        return (
            <Fragment>
                <Header/>
                {/*<NavBar isAuthorized={this.state.isAuthorized} LoginMenu={this.state.LoginMenu} MainMenu={this.state.MainMenu} AdminMenu={this.state.AdminMenu} onRememberInputClick={this.handleRememberInputClick} />*/}
                <NavBar isAuthorized={this.state.site.isAuthorized} LoginMenu={this.state.site.LoginMenu}
                        MainMenu={this.state.site.MainMenu} AdminMenu={this.state.site.AdminMenu}
                        onRememberInputClick={this.handleRememberInputClick} handleLoginSubmit={this.handleLoginSubmit}/>
                <Container/>
            </Fragment>
        );
    }


}

export default App;
