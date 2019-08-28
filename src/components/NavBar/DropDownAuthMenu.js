import React from 'react';
import $ from 'jquery';

class DropdownFormPassword extends React.PureComponent{
    render() {
        return(
            <div className="form-group">
                <input type={this.props.show?'text':'password'} className="form-control" id="exampleDropdownFormPassword1" placeholder={this.props.placeholder}></input>
            </div>
        )
    }

}
class DropDownFormUsername extends React.PureComponent{
    render() {
        return (
            <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail1">{this.props.textlabel}</label>
                <input type="email" className="form-control" id="exampleDropdownFormEmail1"
                       placeholder="email@example.com"></input>
            </div>
        )
    }

}

class DropDownPasswordCheck extends React.PureComponent{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
        this.props.onPasswordInputClick();
    }
    render(){
        return(
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="dropdownCheck" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="dropdownCheck">
                    {this.props.showpassword}
                </label>
            </div>
        )
    }

}

class DropDownAuthMenu extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            showPassword:false
        };
        this.rememberCheckClick = this.rememberCheckClick.bind(this);
        this.showPasswordClick = this.showPasswordClick.bind(this);
        this.onFormClick = this.onFormClick.bind(this);
    }
    componentDidMount() {
        $('.dropdown-menu-right').on("click.bs.dropdown", this.buttonClick);//обработчик событий нажатия. Нужен, чтобы форма не закрывалась при кликах. Работает только на jquery из-за бутстрапа
    }
    buttonClick(event){
        if (event.target.tagName ==="FORM" || event.target.tagName ==="LABEL")
            event.stopPropagation();//если клацнули на ^ то останавливаем всплытие
    }
    onFormClick(event){
        console.log(event.target.tagName);
    }
    rememberCheckClick(event){
    }
    showPasswordClick(){
       this.setState((state)=>({showPassword:!state.showPassword}));
    }

    renderNonAuthorized(){

        return(
            <div className="dropdown-menu dropdown-menu-right" >
                <form className="px-4 py-3" id="ToggleDropdown" action="">
                    <DropDownFormUsername textlabel={this.props.LoginMenu.email}/>
                    <DropdownFormPassword placeholder={this.props.LoginMenu.password} show={this.state.showPassword}/>
                    <DropDownPasswordCheck onPasswordInputClick={this.showPasswordClick} showpassword={this.props.LoginMenu.showpassword}/>

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
        let buttons = this.props.AdminMenu.map(data=><button className="dropdown-item" type="button" key={data.id} id={data.id}>{data.name}</button>);
        return (
            <div className="dropdown-menu dropdown-menu-right">
                {buttons}
            </div>
        );
    }
    render() {
        if (this.props.isAuthorized) return this.renderAuthorized();
        else return this.renderNonAuthorized();
    }

}
export default DropDownAuthMenu;