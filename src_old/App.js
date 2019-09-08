import React, { Fragment } from 'react';
import Header from './components/Header/Header.js';
import NavBar from './components/NavBar/NavBar.js';
import Container from './components/Container/Container.js';
import './App.css';
import SiteState from './components/SiteState/SiteState';
//import 'core-js/stable';
import 'regenerator-runtime/runtime';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site: SiteState,
            jwt: null,
        };
        this.handleRememberInputClick = this.handleRememberInputClick.bind(
            this,
        );
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleLoginMenuClick = this.handleLoginMenuClick.bind(this);
        this.UsernameValidationRef = React.createRef();
    }
    componentDidMount() {
        this.GetAndValidateJWT().then();
    }

    //Обработчик галки запомнить меня.
    handleRememberInputClick(value) {
        this.setState(state => (state.site.isRememberChecked = value));
    }

    //Обработчик нажатия кнопки Войти. Проверяет имя пользователя (нет ли там левых символов) и пытается авторизоваться.
    handleLoginSubmit(fields) {
        let pattern = /^[\w-_@]+$/;
        if (pattern.test(fields.username)) {
            this.Authorization(fields.username, fields.password).then();
        }
    }

    //обаработчик клика в админМеню
    handleLoginMenuClick(id) {
        switch (id) {
            case 'Logout': {
                this.setState(state => (state.site.isAuthorized = false));
                this.setState(state => (state.jwt = null));
                this.ClearJWT();
                break;
            }
            default:
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <NavBar
                    isAuthorized={this.state.site.isAuthorized}
                    LoginMenu={this.state.site.LoginMenu}
                    MainMenu={this.state.site.MainMenu}
                    AdminMenu={this.state.site.AdminMenu}
                    onRememberInputClick={this.handleRememberInputClick}
                    handleLoginSubmit={this.handleLoginSubmit}
                    isRememberChecked={this.state.site.isRememberChecked}
                    handleLoginMenuClick={this.handleLoginMenuClick}
                    UsernameValidationRef={this.UsernameValidationRef}
                />

                <Container />
            </Fragment>
        );
    }

    //записывет токены в необходимое хранилище
    StoreJWT(jwt) {
        this.setState(state => {
            state.jwt = jwt;
        });
        //{site: {BackendAPI:{jwt:jwt}}});
        if (this.state.site.isRememberChecked) {
            localStorage.setItem('jwt', jwt);
            sessionStorage.clear();
        } else {
            sessionStorage.setItem('jwt', jwt);
            localStorage.clear();
        }
    }

    //Очищает хранилище от ключей
    ClearJWT() {
        localStorage.clear();
        sessionStorage.clear();
    }

    //общая часть авторизации по токену и по логину с паролем.
    // Если ответ ок - значит автроизация прошла успешно.
    ManageStateAndJWT(response) {
        let jwt = response.data['jwt'];
        if (response.status === 200 && jwt) {
            this.setState(state => (state.site.isAuthorized = true));
            this.StoreJWT(jwt);
        } else {
            this.setState(state => (state.site.isAuthorized = false));
            this.ClearJWT();
        }
    }

    //авторизация по ключу из хранилища - если не нашли ключей, ничего не меняем. Если нашли, идем у апи спрашивать,
    //валидный или нет.
    async GetAndValidateJWT() {
        let url =
            this.state.site.BackendAPI.host +
            this.state.site.BackendAPI.api +
            this.state.site.BackendAPI.loginUrl;
        let jwt = null;
        // eslint-disable-next-line no-undef
        if (sessionStorage.getItem('jwt')) {
            jwt = sessionStorage.getItem('jwt');
            this.state.site.isRememberChecked = false;
            this.setState(state => (state.site.isRememberChecked = false));
        } else if (localStorage.getItem('jwt')) {
            jwt = localStorage.getItem('jwt');
            this.state.site.isRememberChecked = true;
            this.setState(state => {
                state.site.isRememberChecked = true;
            });
        } else return null;

        let AuthHeader = { Authorization: 'Bearer ' + jwt };

        let response = null;
        try {
            response = await this.state.site.BackendAPI.app.get(url, {
                headers: AuthHeader,
            });
            this.ManageStateAndJWT(response);
        } catch (e) {
            this.setState(state => (state.site.isAuthorized = false));
            this.ClearJWT();
        }
    }

    //авторизация по логину и паролю. Сначала берем цсрф токен через гет, а потом отдаем его через пост.
    async Authorization(username, password) {
        let url =
            this.state.site.BackendAPI.host +
            this.state.site.BackendAPI.api +
            this.state.site.BackendAPI.loginUrl;
        let response = await this.state.site.BackendAPI.app.get(url);
        let csrf = response.data['csrf'];
        let data = { username: username, password: password, csrf: csrf };

        try {
            response = await this.state.site.BackendAPI.app.post(url, data);
            this.UsernameValidationRef.current.textContent = '';
            this.ManageStateAndJWT(response);
        } catch (e) {
            this.UsernameValidationRef.current.textContent =
                'Не правильное имя пользователя или пароль';
        }
    }
}

export default App;
