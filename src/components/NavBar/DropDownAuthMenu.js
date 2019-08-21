import React from 'react';

class DropDownAuthMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAuthorized: props.isAuthorized
        }
    }
    renderNonAuthorized(){
        return(
            <div className="dropdown-menu dropdown-menu-right">
                <form className="px-4 py-3">
                    <div className="form-group">
                        <label htmlFor="exampleDropdownFormEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleDropdownFormEmail1"
                               placeholder="email@example.com"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleDropdownFormPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleDropdownFormPassword1"
                               placeholder="Password"></input>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck"></input>
                            <label className="form-check-label" htmlFor="dropdownCheck">
                                Remember me
                            </label>

                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">New around here? Sign up</a>
                <a className="dropdown-item" href="#">Forgot password?</a>
            </div>
        );
    }
    renderAuthorized(){
        return (
            <div className="dropdown-menu dropdown-menu-right">
                <button className="dropdown-item" type="button">Action</button>
                <button className="dropdown-item" type="button">Another action</button>
                <button className="dropdown-item" type="button">Something else here</button>
            </div>
        );
    }
    render() {
        if (this.state.isAuthorized) return this.renderAuthorized();
        else return this.renderNonAuthorized();
    }

}
export default DropDownAuthMenu;