import React, {Fragment} from 'react';
//import './Header.css';

function Header() {
    const jumbotronCSS ={
            marginBottom: "0px",
    backgroundColor: "white",
    height: "10px"
    };
    return(
        <Fragment>
            <div className="jumbotron text-center" style={jumbotronCSS}>
                <h3>Тут что-то прикрутим попозже</h3>
            </div>
        </Fragment>
    )

}

export default Header;