import React from 'react';
import $ from 'jquery';

class DropDownAuthMenu extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount() {
        $('.dropdown-menu-right').on("click.bs.dropdown", this.buttonClick);//обработчик событий нажатия. Нужен, чтобы форма не закрывалась при кликах. Работает только на jquery из-за бутстрапа
    }
    buttonClick(event){
        if (event.target.tagName ==="FORM" || event.target.tagName ==="INPUT" || event.target.tagName ==="LABEL")
            event.stopPropagation();//если клацнули на ^ то останавливаем всплытие
    }
    rememberCheckClick(event){
    }

    renderNonAuthorized(){

        return(
            <div className="dropdown-menu dropdown-menu-right" id="ToggleDropdown">
                <form className="px-4 py-3" >
                    <div className="form-group">
                        <label htmlFor="exampleDropdownFormEmail1">{this.props.LoginMenu.email}</label>
                        <input type="email" className="form-control" id="exampleDropdownFormEmail1"
                               placeholder="email@example.com"></input>
                    </div>
                    <div className="form-group">

                        <input type="password" className="form-control" id="exampleDropdownFormPassword1"
                               placeholder={this.props.LoginMenu.password}></input>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck"></input>
                            <label className="form-check-label" htmlFor="dropdownCheck">
                                {this.props.LoginMenu.showpassword}
                            </label>

                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="rememberCheck" onClick={this.rememberCheckClick} ></input>
                        <label className="form-check-label" htmlFor="rememberCheck">
                            {this.props.LoginMenu.remember}
                        </label>

                    </div>
                    <button type="submit" className="btn btn-primary" >{this.props.LoginMenu.signin}</button>
                </form>

            </div>
        );
    }
    renderAuthorized(){//дописать
        return (
            <div className="dropdown-menu dropdown-menu-right">
                <button className="dropdown-item" type="button">Action</button>
                <button className="dropdown-item" type="button">Another action</button>
                <button className="dropdown-item" type="button">Something else here</button>
            </div>
        );
    }
    render() {
        if (this.props.isAuthorized) return this.renderAuthorized();
        else return this.renderNonAuthorized();
    }

}
export default DropDownAuthMenu;