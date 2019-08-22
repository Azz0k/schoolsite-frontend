import React, {Fragment} from 'react';
import './NavBar.css';
import DropDownAuthMenu from './DropDownAuthMenu.js';

class NavBar extends React.Component{
    constructor(){
        super();
        this.state = {
            isAuthorized:false
        }
    }
    render() {
        const formInlineCSS = {
          position: "relative",
          left: "-20px"
        };
        return(
          <Fragment>
              <nav className="navbar navbar-expand-lg navbar-light bg-light"
                   id="Menu">
                  <button className="navbar-toggler" type="button" data-toggle="collapse"
                          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                          aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse " id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                              <a className="nav-link" href="#">message <span
                                  className="sr-only">(current)</span></a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#">Link</a>
                          </li>
                          <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Dropdown
                              </a>
                              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                  <a className="dropdown-item" href="#">Action</a>
                                  <a className="dropdown-item" href="#">Another action</a>
                                  <div className="dropdown-divider"></div>
                                  <a className="dropdown-item" href="#">Something else here</a>
                              </div>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link disabled" href="#">Disabled</a>
                          </li>
                      </ul>
                      <form className="form-inline my-2 my-lg-0" style = {formInlineCSS}>
                          <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                 aria-label="Search"></input>
                              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                      </form>
                      <div className="btn-group ">
                          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false">
                              Right-aligned menu
                          </button>
                          <DropDownAuthMenu isAutorized={this.state.isAuthorized}/>
                      </div>
                  </div>
              </nav>
          </Fragment>
        )
    }

}

export default NavBar;