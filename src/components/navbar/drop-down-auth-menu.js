/* eslint-disable*/
import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { handleRememberChecked , handleChangeLoginForm } from '../../actions';

class DropdownFormPassword extends React.PureComponent {
    render() {
        const { show, placeholder } = this.props;
        return (
            <div className='form-group'>
                <input type={ show?'text':'password' } 
                       className='form-control' 
                       name='password'
                       id='exampleDropdownFormPassword1' 
                       placeholder={ placeholder }
                       onChange={ event => this.props.handlerChange(event) }
                >
                </input>
            </div>
        );
    }
}

class DropDownFormUsername extends React.PureComponent{
    render() {
        return (
            <div className='form-group'>
                <label htmlFor='exampleDropdownFormEmail1'>
                    { this.props.textlabel }
                </label>
                <input type='email'
                       className='form-control'
                       id='exampleDropdownFormEmail1'
                       name='username'
                       placeholder='email@example.com'
                       onChange={ event => this.props.handlerChange(event) }
                >
                </input>
                <div className='invalid-feedback'
                     ref={ this.props.UsernameValidationRef }
                >
                </div>
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
            <div className='form-check'>
                <input type='checkbox' className='form-check-input' id='dropdownCheck' onClick={this.handleClick}></input>
                <label className='form-check-label' htmlFor='dropdownCheck'>
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
            <div className='form-check'>
                <input type='checkbox' className='form-check-input' id='rememberCheck' onChange={this.rememberCheckClick} value='' checked={this.props.isRememberChecked}></input>
                <label className='form-check-label' htmlFor='rememberCheck'>
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
                username:'',
                password:''
            }
        };
        this.divRef = React.createRef();
        //this.usernameRef = React.createRef();
        this.showPasswordClick = this.showPasswordClick.bind(this);
        this.handleChangeFields = this.handleChangeFields.bind(this);
        this.handleLoginMenuClick = this.handleLoginMenuClick.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        //this.handleChangeFields = debounce(500,this.handleChangeFields);
    }



    //привязываем обработчик нажатий на логин форму. (чтобы не закрывалась при лкм)
    componentDidMount() {
        if (!this.props.isAuthorized)
            $(this.divRef.current).on('click.bs.dropdown', this.buttonClick);
        //console.log(this.usernameRef.current);

    }

    //обработчик событий нажатия. Нужен, чтобы форма не закрывалась при кликах. Работает только на jquery из-за бутстрапа
    buttonClick(event){
        if (event.target.tagName ==='FORM' || event.target.tagName ==='LABEL' || event.target.id ==='submit') {
            event.preventDefault();//если клацнули на ^ то останавливаем всплытие
            event.stopPropagation();
        }
        if (event.target.id ==='submit')   //обработчик кнопки Войти, передаем состояние в App
            this.props.handleLoginSubmit(this.state.fields);
 }

    //обработчик кнопок AdminMenu
    handleLoginMenuClick(event){
        this.props.handleLoginMenuClick(event.target.id);
        event.preventDefault();
    }

    //сохраняем значения полей ввода в логин форме
    handleChangeFields(event){
        event = event.nativeEvent;
        this.props.handleChangeLoginForm(event.target.value, event.target.name);
    }

    //обработчик кнопки показать пароль
    showPasswordClick(){
       this.setState(state => ({showPassword:!state.showPassword}));
    }

    renderNonAuthorized(){
        const { loginMenu, loginForm } = this.props;
        return(
            <div className='dropdown-menu dropdown-menu-right' ref={this.divRef}>
                <form className='px-4 py-3 needs-validation was-validated' id='ToggleDropdown' action='' noValidate={true}>
                    <DropDownFormUsername
                        textlabel={ loginMenu.email }
                        handlerChange={this.handleChangeFields}
                        UsernameValidationRef={this.props.UsernameValidationRef}
                    />
                    <DropdownFormPassword
                        placeholder={ loginMenu.password }
                        show={ this.state.showPassword }
                        handlerChange={ this.handleChangeFields }
                    />
                    <DropDownPasswordCheck
                        onPasswordInputClick={ this.showPasswordClick }
                        showpassword={loginMenu.showpassword}
                    />
                    <DropDownRememberCheck
                        onRememberInputClick={this.props.handleRememberChecked}
                        remember={loginMenu.remember}
                        isRememberChecked={ loginForm.isRememberChecked }
                    />
                    <button type='submit' className='btn btn-primary' id='submit'>{this.props.loginMenu.signin}</button>
                </form>

            </div>
        );
    }
    renderAuthorized(){//дописать
        let buttons = this.props.adminMenu.map(data=><button className='dropdown-item' type='button' key={data.id} id={data.id} onClick={this.handleLoginMenuClick}>{data.name}</button>);
        return (
            <div className='dropdown-menu dropdown-menu-right'>
                {buttons}
            </div>
        );
    }
    render() {
        if (this.props.isAuthorized) return this.renderAuthorized();
        else return this.renderNonAuthorized();
    }

}

const mapStateToPropsDropDownMenu = ({ isAuthorized, adminMenu, loginMenu, loginForm }) => {
    return { isAuthorized, adminMenu, loginMenu, loginForm };
};
const mapDispatchToPropsDropDownMenu = { handleRememberChecked, handleChangeLoginForm };


export default connect(mapStateToPropsDropDownMenu, mapDispatchToPropsDropDownMenu)(DropDownAuthMenu);