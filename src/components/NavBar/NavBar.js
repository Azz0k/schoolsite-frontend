import React, {Fragment} from 'react';
import NavElement from "./NavElement";
import './NavBar.css';
import DropDownAuthMenu from './DropDownAuthMenu.js';

function NavBarToggler() {
    return(
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

    )
}
class NavBar extends React.PureComponent{
    render() {
        let NavElements=this.props.MainMenu.map(data=><NavElement key={data.id} id={data.id} href={data.href} name={data.name} submenu={data.submenu}/>);
        return(
          <Fragment>
              <nav className="navbar navbar-expand-lg navbar-light bg-light" id="Menu">
                    <NavBarToggler/>

                  <div className="collapse navbar-collapse " id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                          {NavElements}
                      </ul>

                      <div className="btn-group">
                          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {this.props.LoginMenu.signin}
                          </button>
                          <DropDownAuthMenu isAuthorized={this.props.isAuthorized} LoginMenu={this.props.LoginMenu}
                                            AdminMenu={this.props.AdminMenu} onRememberInputClick={this.props.onRememberInputClick} handleLoginSubmit={this.props.handleLoginSubmit}/>
                      </div>
                  </div>
              </nav>
          </Fragment>
        )
    }

}

export default NavBar;
