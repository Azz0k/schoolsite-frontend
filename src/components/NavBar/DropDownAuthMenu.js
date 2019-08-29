import React from 'react';
import $ from 'jquery';
function debounce(time, func) {
    let isCooldown = false;
    return function () {
        if (isCooldown) return;
        func.apply(this, arguments);
        isCooldown = true;
        setTimeout(()=>isCooldown=false,time);
    }

}
class DropdownFormPassword extends React.PureComponent{
    render() {
        return(
            <div className="form-group">
                <input type={this.props.show?'text':'password'} className="form-control" name="password"
                       id="exampleDropdownFormPassword1" placeholder={this.props.placeholder} onChange={event => this.props.handlerChange(event)}></input>
            </div>
        )
    }

}
class DropDownFormUsername extends React.PureComponent{
    render() {
        return (
            <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail1">{this.props.textlabel}</label>
                <input type="email" className="form-control" id="exampleDropdownFormEmail1" name="username"
                       placeholder="email@example.com" onChange={event => this.props.handlerChange(event)}></input>
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

class  DropDownRememberCheck extends React.PureComponent{
    constructor(props){
        super(props);
        this.rememberCheckClick = this.rememberCheckClick.bind(this);
    }
    rememberCheckClick(event){
        this.props.onRememberInputClick(event.target.checked);
    }
    render() {
        return(
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberCheck" onClick={this.rememberCheckClick} value=""></input>
                <label className="form-check-label" htmlFor="rememberCheck">
                    {this.props.remember}
                </label>

            </div>
        )
    }

}

class DropDownAuthMenu extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            showPassword:false,
            fields:{
                username:"",
                password:""
            }
        };
        this.divRef = React.createRef();
        this.usernameRef = React.createRef();
        this.showPasswordClick = this.showPasswordClick.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.handleChangeFields = this.handleChangeFields.bind(this);
        this.handleChangeFields = debounce(500,this.handleChangeFields);
    }
    componentDidMount() {
        $(this.divRef.current).on("click.bs.dropdown", this.buttonClick);//обработчик событий нажатия. Нужен, чтобы форма не закрывалась при кликах. Работает только на jquery из-за бутстрапа
    }

    buttonClick(event){
        if (event.target.tagName ==="FORM" || event.target.tagName ==="LABEL")
            event.stopPropagation();//если клацнули на ^ то останавливаем всплытие
    }
    onSubmitClick(event){

        this.props.handleLoginSubmit(this.state.fields);
        event.preventDefault();

    }
    handleChangeFields(event){
        event = event.nativeEvent;
        let stateCopy = Object.assign({},this.state);
        stateCopy.fields[event.target.name] = event.target.value;
        this.setState(stateCopy);
    }
    showPasswordClick(){
       this.setState((state)=>({showPassword:!state.showPassword}));
    }

    renderNonAuthorized(){

        return(
            <div className="dropdown-menu dropdown-menu-right" ref={this.divRef}>
                <form className="px-4 py-3" id="ToggleDropdown" action="" >
                    <DropDownFormUsername textlabel={this.props.LoginMenu.email} handlerChange={this.handleChangeFields}/>
                    <DropdownFormPassword placeholder={this.props.LoginMenu.password} show={this.state.showPassword} handlerChange={this.handleChangeFields}/>
                    <DropDownPasswordCheck onPasswordInputClick={this.showPasswordClick} showpassword={this.props.LoginMenu.showpassword}/>
                    <DropDownRememberCheck onRememberInputClick={this.props.onRememberInputClick} remember={this.props.LoginMenu.remember}/>

                    <button type="submit" className="btn btn-primary" onClick={this.onSubmitClick}>{this.props.LoginMenu.signin}</button>
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