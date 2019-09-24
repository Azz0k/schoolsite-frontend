import adminMenu from './admin-menu';
import loginMenu from './login-menu';
import backendApi from './backend-api';
import usersPageData from './users-page-data';

const emptyUser = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    description: '',
    enabled: 0,
    deleted: 0,
    canconfigure: 0,
    canchangeusers: 0,
    canchangemenu: 0,
    canchangematerials: 0,
};
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
        case 'ADD_USER_CLICKED': {
            const maxId =
                state.users.value.reduce((a, b) => {
                    if (b.id > a) return b.id;
                    else return a;
                }, 0) + 1;
            console.log(maxId);
            return {
                ...state,
                users: {
                    ...state.users,
                    value: [...state.users.value, { ...emptyUser, id: maxId }],
                    canRevert: true,
                    canApply: true,
                },
            };
        }
        case 'DELETE_USER_CLICKED': {
            const { id } = action.payload;
            const newValue = state.users.value.filter(
                element => element.id !== id,
            );
            return {
                ...state,
                users: {
                    ...state.users,
                    value: newValue,
                    canApply: true,
                    canRevert: true,
                },
            };
        }
        case 'UPDATE_USERS_CHANGE_AND_CLICK': {
            const { id, name, event } = action.payload;
            return {
                ...state,
                users: {
                    ...state.users,
                    value: updateUsersOnChangeAndClick(
                        state.users.value,
                        id,
                        name,
                        event,
                    ),
                    canRevert: true,
                    canApply: true,
                },
            };
        }
        case 'UPDATE_USERS_VALIDATED': {
            const { errorFound, wrongId } = action.payload;
            return {
                ...state,
                users: {
                    ...state.users,
                    errorFound,
                    wrongId,
                },
            };
        }
        default:
            return state;
    }
};

const updateUsersOnChangeAndClick = (state, id, name, event) => {
    let element = state.find(e => {
        return e.id === id;
    });
    if (event.type === 'click') {
        element = {
            ...element,
            [name]: !element[name],
        };
    } else {
        element = {
            ...element,
            [name]: event.target.value,
        };
    }
    const result = state.map(e => {
        if (e.id === id) {
            return element;
        } else {
            return e;
        }
    });
    return result;
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
                    ...state.users,
                    value,
                    isLoaded: true,
                    errorFound: false,
                    wrongId: null,
                    canRevert: false,
                    canApply: false,
                },
            };
        default:
            return state;
    }
};

export default reducer;
