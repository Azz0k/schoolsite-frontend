import React from 'react';
import { connect } from 'react-redux';
import {
    handleRememberChecked,
    handleChangeLoginForm,
    loginFormValidated,
    handleClickAdminMenu,
} from '../../actions';
import {
    DropDownFormInput,
    DropDownFormCheck,
} from './drop-down-auth-menu-items';
import WithSchoolSiteService from '../hoc/with-schoolsite-service-context';
import { withRouter } from 'react-router-dom';

class DropDownAuthMenu extends React.PureComponent {
    state = { showPassword: false };

    //обработчик кнопок AdminMenu - ИСПРАВИТЬ НА РЕДАКС
    handleLoginMenuClick = event => {
        const { history, adminMenu } = this.props;
        const id = event.target.id;
        history.push(
            adminMenu.find(el => {
                return el.id === id;
            }).href,
        );
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
        const {
            loginForm,
            loginFormValidated,
            loginMenu,
            schoolSiteService,
        } = this.props;
        event.preventDefault();
        let pattern = /^[\w-_@.]+$/;
        if (!pattern.test(loginForm.username)) {
            loginFormValidated(loginMenu.usernameValidation, '');
            return false;
        }
        if (loginForm.password.length === 0) {
            loginFormValidated('', loginMenu.passwordValidation);
            return false;
        }
        schoolSiteService.validateUsernamePassword().then(resolve => {
            if (!resolve) {
                loginFormValidated('', loginMenu.passwordValidation);
                return false;
            }
        });
    };

    renderNonAuthorized() {
        const {
            loginMenu,
            loginForm,
            handleRememberChecked,
            className = 'dropdown-menu dropdown-menu-right',
        } = this.props;
        return (
            <div className={className}>
                <form
                    className='px-4 py-3'
                    action=''
                    method='POST'
                    onSubmit={this.handleSubmit}
                >
                    <DropDownFormInput
                        type='text'
                        textLabel={loginMenu.email}
                        name='username'
                        handlerChange={this.handleChangeFields}
                        placeholder='email@example.com'
                        validation={loginForm.usernameValidation}
                    />
                    <DropDownFormInput
                        type={this.state.showPassword ? 'text' : 'password'}
                        name='password'
                        handlerChange={this.handleChangeFields}
                        placeholder={loginMenu.password}
                        validation={loginForm.passwordValidation}
                    />
                    <DropDownFormCheck
                        handleChecked={this.showPasswordClick}
                        textLabel={loginMenu.showpassword}
                        isChecked={this.state.showPassword}
                        name='ShowPassword'
                    />
                    <DropDownFormCheck
                        handleChecked={handleRememberChecked}
                        textLabel={loginMenu.remember}
                        isChecked={loginForm.isRememberChecked}
                        name='RememberPassword'
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
        const { className = 'dropdown-menu dropdown-menu-right' } = this.props;
        let buttons = this.props.adminMenu.map(data => (
            <button
                className='dropdown-item'
                type='button'
                key={data.id}
                id={data.id}
                disabled={data.disabled}
                onClick={this.handleLoginMenuClick}
            >
                {data.name}
            </button>
        ));
        return <div className={className}>{buttons}</div>;
    }
    render() {
        if (this.props.isAuthorized) return this.renderAuthorized();
        else return this.renderNonAuthorized();
    }
}

let mapStateToPropsDropDownMenu = ({
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
    loginFormValidated,
    handleClickAdminMenu,
};

export default withRouter(
    WithSchoolSiteService(
        connect(
            mapStateToPropsDropDownMenu,
            mapDispatchToPropsDropDownMenu,
        )(DropDownAuthMenu),
    ),
);
