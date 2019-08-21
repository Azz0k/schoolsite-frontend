import React, {Fragment} from 'react';
import Header from './components/Header/Header.js';
import NavBar from './components/NavBar/NavBar.js'
import Container from './components/Container/Container.js';
import './App.css';

function App() {
    return (
        <Fragment>
            <Header/>
            <NavBar/>
            <Container/>
        </Fragment>
    );
}

export default App;
