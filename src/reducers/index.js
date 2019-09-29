import adminMenu from './admin-menu';
import loginMenu from './login-menu';
import backendApi from './backend-api';
import usersPageData from './users-page-data';
import updateUserSubclass from './update-user-subclass';
import updateLoginFormSubclass from './update-loginform-subclass';

const initialState = {
    backendApi,
    usersPageData,
    isAuthorized: false,
    users: {
        value: [],
        isLoaded: false,
        errorFound: false,
        wrongId: null,
        canRevert: false,
        canApply: false,
        updateUsersId: new Set(),
        addUsersId: new Set(),
    },
    menus: {
        horizontalMenu: [],
        verticalMenu: [],
        isLoaded: false,
    },
    mainMenu: {
        value: [],
        isLoaded: false,
    },
    adminMenu: adminMenu,
    loginMenu: loginMenu,
    loginForm: {
        username: '',
        password: '',
        isRememberChecked: true,
        usernameValidation: '',
        passwordValidation: '',
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MAINMENU_LOADED': {
            return {
                ...state,
                mainMenu: {
                    value: action.payload,
                    isLoaded: true,
                },
                menus: {
                    ...state.menus,
                    horizontalMenu: action.payload,
                    isLoaded: true,
                },
            };
        }
        case 'JWT_VALIDATED': {
            const { jwt, storage, rights } = action.payload;
            const newAdminMenu = state.adminMenu.map(value => {
                return { ...value, disabled: !rights[value.id] };
            });
            return {
                ...state,
                isAuthorized: true,
                adminMenu: newAdminMenu,
                backendApi: {
                    ...state.backendApi,
                    jwt,
                    storage,
                },
            };
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthorized: false,
            };
        }
        default:
            return {
                ...state,
                menus: updateMenusSubclass(state.menus, action),
                loginForm: updateLoginFormSubclass(state.loginForm, action),
                users: updateUserSubclass(state.users, action),
            };
    }
};

const updateMenusSubclass = (menus, action) => {
    switch (action.type) {
        case '':
            break;
        default:
            return menus;
    }
};
export default reducer;
