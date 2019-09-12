import React from 'react';
import { connect } from 'react-redux';
import { handleRememberChecked, handleChangeLoginForm } from '../../actions';
import {
    DropDownPasswordCheck,
    DropDownRememberCheck,
    DropdownFormInput,
} from './drop-down-auth-menu-items';

class DropDownAuthMenu extends React.PureComponent {
    state = { showPassword: false };

    //обработчик кнопок AdminMenu - ИСПРАВИТЬ НА РЕДАКС
    handleLoginMenuClick = event => {
        // this.props.handleLoginMenuClick(event.target.id);
        event.preventDefault();
    };

    //сохраняем значения полей ввода в логин форме
    handleChangeFields = event => {
        event = event.nativeEvent;
        this.props.handleChangeLoginForm(event.target.value, event.target.name);
    };

    //обработчик кнопки показать пароль
    showPasswordClick = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    renderNonAuthorized() {
        const { loginMenu, loginForm } = this.props;
        return (
            <div className='dropdown-menu dropdown-menu-right'>
                <form
                    className='px-4 py-3 needs-validation was-validated'
                    action=''
                    method='POST'
                    noValidate={true}
                    onSubmit={this.handleSubmit}
                >
                    <DropdownFormInput
                        type='email'
                        textLabel={loginMenu.email}
                        name='username'
                        handlerChange={this.handleChangeFields}
                        placeholder='email@example.com'
                        validation={loginForm.usernameValidation}
                    />
                    <DropdownFormInput
                        type={this.state.showPassword ? 'text' : 'password'}
                        name='password'
                        handlerChange={this.handleChangeFields}
                        placeholder={loginMenu.password}
                        validation={loginForm.passwordValidation}
                    />
                    <DropDownPasswordCheck
                        showPasswordClick={this.showPasswordClick}
                        showpassword={loginMenu.showpassword}
                    />
                    <DropDownRememberCheck
                        handleRememberChecked={this.props.handleRememberChecked}
                        remember={loginMenu.remember}
                        isRememberChecked={loginForm.isRememberChecked}
                    />
                    <button
                        type='submit'
                        className='btn btn-primary'
                        id='submit'
                    >
                        {this.props.loginMenu.signin}
                    </button>
                </form>
            </div>
        );
    }
    renderAuthorized() {
        let buttons = this.props.adminMenu.map(data => (
            <button
                className='dropdown-item'
                type='button'
                key={data.id}
                id={data.id}
                onClick={this.handleLoginMenuClick}
            >
                {data.name}
            </button>
        ));
        return (
            <div className='dropdown-menu dropdown-menu-right'>{buttons}</div>
        );
    }
    render() {
        if (this.props.isAuthorized) return this.renderAuthorized();
        else return this.renderNonAuthorized();
    }
}

const mapStateToPropsDropDownMenu = ({
    isAuthorized,
    adminMenu,
    loginMenu,
    loginForm,
}) => {
    return { isAuthorized, adminMenu, loginMenu, loginForm };
};
const mapDispatchToPropsDropDownMenu = {
    handleRememberChecked,
    handleChangeLoginForm,
};

export default connect(
    mapStateToPropsDropDownMenu,
    mapDispatchToPropsDropDownMenu,
)(DropDownAuthMenu);
