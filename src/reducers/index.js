import testMainMenu from './test-main-menu';
import adminMenu from './admin-menu';
import loginMenu from './login-menu';

const initialState = {
    isAuthorized: false,
    user: null,
    mainMenu: testMainMenu,
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
                mainMenu: action.payload,
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
        default:
            return state;
    }
};

export default reducer;
