import adminMenu from './admin-menu';
import loginMenu from './login-menu';
import backendApi from './backend-api';
import usersPageData from './users-page-data';

const initialState = {
    backendApi,
    usersPageData,
    isAuthorized: false,
    users: {
        value: [],
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
        case 'CLICKED_ON_ADMIN_MENU': {
            const { id, value } = action.payload;
            return updateOnClickedAdminMenu(state, id, value);
        }
        case 'USERS_LOADED': {
            return {
                ...state,
                users: {
                    value: action.payload,
                    isLoaded: true,
                },
            };
        }
        case 'UPDATE_USERS_CHANGE_FIELDS': {
            const { id, name, value } = action.payload;
            return {
                ...state,
                users: {
                    ...state.users,
                    value: updateUsersOnChangeFields(
                        state.users.value,
                        id,
                        name,
                        value,
                    ),
                },
            };
        }
        default:
            return state;
    }
};
//переписать
const updateUsersOnChangeFields = (state, id, name, value) => {
    state = [...state];
    const element = state.find(e => {
        return e.id === id;
    });
    element[name] = value;
    const rest = state.filter(e => {
        return e.id !== id;
    });
    console.log([...rest, element]);
    return [...rest, element];
};

const updateOnClickedAdminMenu = (state, id, value) => {
    switch (id) {
        case 'Logout':
            return {
                ...state,
                isAuthorized: false,
            };
        case 'Users':
            return {
                ...state,
                users: {
                    value,
                    isLoaded: true,
                },
            };
        default:
            return state;
    }
};

export default reducer;
