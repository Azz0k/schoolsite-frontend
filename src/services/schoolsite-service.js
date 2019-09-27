import testMainMenu from '../reducers/test-main-menu';
import { utoa, atou } from '../utils/encode';
import store from '../store';
import { JWTValidated, handleClickAdminMenu } from '../actions';

class SchoolSiteService {
    constructor() {
        this.checkJWT().then(resolve => {
            if (!resolve) {
                store.dispatch(handleClickAdminMenu('Logout', this));
            }
        });
    }

    clearJWT = () => {
        sessionStorage.removeItem('jwt');
        localStorage.removeItem('jwt');
    };

    mapJWTtoRights = jwt => {
        let [, rights] = jwt.split('.');
        rights = JSON.parse(atou(rights));
        rights = {
            Configuration: !!+rights.Configuration,
            Users: !!+rights.Users,
            Menu: !!+rights.Menu,
            Materials: !!+rights.Materials,
            Logout: true,
        };
        return rights;
    };

    manageJWT = (response, storage) => {
        if (response.status === 200) {
            const jwt = response.data['jwt'];
            store.dispatch(
                JWTValidated(jwt, storage, this.mapJWTtoRights(jwt)),
            );
            storage.setItem('jwt', jwt);
            return true;
        }
        return false;
    };

    async checkJWT() {
        let jwtSession = sessionStorage.getItem('jwt');
        let jwtLocal = localStorage.getItem('jwt');
        let jwt,
            storage = null;
        if (jwtLocal) {
            jwt = jwtLocal;
            storage = localStorage;
        } else if (jwtSession) {
            jwt = jwtSession;
            storage = sessionStorage;
        } else {
            return false;
        }
        let AuthHeader = { Authorization: 'Bearer ' + jwt };
        const { backendApi } = store.getState();
        const url = backendApi.host + backendApi.api + backendApi.loginUrl;
        let response;
        try {
            response = await backendApi.app.get(url, { headers: AuthHeader });
        } catch (e) {
            return false;
        }
        return this.manageJWT(response, storage);
    }

    async validateUsernamePassword() {
        const {
            username,
            password,
            isRememberChecked,
        } = store.getState().loginForm;
        const { backendApi } = store.getState();
        const url = backendApi.host + backendApi.api + backendApi.loginUrl;
        let response;
        try {
            response = await backendApi.app.get(url);
        } catch (e) {
            return false;
        }
        if (response.status !== 200) {
            return false;
        }
        const csrf = response.data['csrf'];
        const data = { username, password, csrf };
        try {
            response = await backendApi.app.post(url, data);
        } catch (e) {
            return false;
        }
        let storage = sessionStorage;
        if (isRememberChecked) storage = localStorage;
        return this.manageJWT(response, storage);
    }

    async getUsers() {
        const { backendApi, isAuthorized } = store.getState();
        const jwt = backendApi.jwt;
        let AuthHeader = { Authorization: 'Bearer ' + jwt };
        const url = backendApi.host + backendApi.api + backendApi.jsonRpc;
        //const url = backendApi.host + backendApi.api + backendApi.usersUrl;
        let response;
        try {
            let data = { jsonrpc: '2.0', method: 'Users.getAll' };
            response = await backendApi.app.post(url, data, {
                headers: AuthHeader,
            });
            //response = await backendApi.app.get(url, { headers: AuthHeader });
        } catch (e) {
            throw new Error(`Not connected! ${isAuthorized} `);
        }
        if (response.status === 200) {
            const { result } = response.data;
            return result;
        }
        throw new Error('Service unavailable');
    }

    async getNavBar() {
        const restoredMenu = sessionStorage.getItem(utoa('MainMenu'));
        if (restoredMenu) {
            return JSON.parse(atou(restoredMenu));
        }
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(testMainMenu);
                sessionStorage.setItem(
                    utoa('MainMenu'),
                    utoa(JSON.stringify(testMainMenu)),
                );
            }, 1000);
        });
    }

    //переписать - принимает пользователей, вызывает функцию адд (если в добавленных нет удаленных) и апдейт
    async putUsers(users) {
        const { backendApi } = store.getState();
        const jwt = backendApi.jwt;
        let AuthHeader = { Authorization: 'Bearer ' + jwt };
        const url =
            backendApi.host + backendApi.api + backendApi.usersUpdateUrl;
        let response;
        try {
            response = await backendApi.app.post(url, users, {
                headers: AuthHeader,
            });
            console.log(response);
        } catch (e) {
            throw new Error('Service unavailable');
        }
        return users.value;
    }
}

export default SchoolSiteService;
