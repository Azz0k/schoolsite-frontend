import React, {Fragment} from 'react';
import Header from './components/Header/Header.js';
import NavBar from './components/NavBar/NavBar.js'
import Container from './components/Container/Container.js';
import './App.css';
import SiteState from "./components/SiteState/SiteState";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = new SiteState();
    }
    render() {
        return (
            <Fragment>
                <Header/>
                <NavBar isAuthorized={this.state.isAuthorized} LoginMenu={this.state.LoginMenu} MainMenu={this.state.MainMenu}/>
                <Container/>
            </Fragment>
        );
    }


}

export default App;
