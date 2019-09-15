import adminMenu from './admin-menu';
import loginMenu from './login-menu';
import backendApi from './backend-api';

const initialState = {
    backendApi,
    isAuthorized: false,
    user: null,
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
            };
        }
        case 'REMEMBER_CHECKED': {
            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    isRememberChecked: !state.loginForm.isRememberChecked,
                },
            };
        }
        case 'LOGIN_FORM_ONCHANGE': {
            let { name, value } = action.payload;
            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    [name]: value,
                },
            };
        }
        case 'LOGIN_FORM_VALIDATED': {
            const { usernameValidation, passwordValidation } = action.payload;
            return {
                ...state,
                loginForm: {
                    ...state.loginForm,
                    usernameValidation,
                    passwordValidation,
                },
            };
        }
        case 'JWT_VALIDATED': {
            const { jwt, storage, rights } = action.payload;
            const newAdminMenu = state.adminMenu.map(value => {
                return { ...value, disabled: !rights[value.id] };
            });
            debugger;
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
                ...initialState,
                mainMenu: state.mainMenu,
            };
        }
        default:
            return state;
    }
};

export default reducer;
