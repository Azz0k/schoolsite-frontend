import testMainMenu from '../reducers/test-main-menu';
import { utoa, atou } from '../utils/encode';
import store from '../store';
import { JWTValidated, logout } from '../actions';

class SchoolSiteService {
    constructor() {
        this.checkJWT().then(resolve => {
            if (!resolve) {
                this.clearJWT();
                store.dispatch(logout());
            }
        });
    }

    clearJWT = () => {
        sessionStorage.removeItem('jwt');
        localStorage.removeItem('jwt');
    };

    manageJWT = (response, storage) => {
        if (response.status === 200) {
            const jwt = response.data['jwt'];
            store.dispatch(JWTValidated(jwt, storage));
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
}

export default SchoolSiteService;
