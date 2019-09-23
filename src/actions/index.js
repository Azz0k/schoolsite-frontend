const mainMenuLoaded = mainMenu => {
    return {
        type: 'MAINMENU_LOADED',
        payload: mainMenu,
    };
};
const handleRememberChecked = () => {
    return {
        type: 'REMEMBER_CHECKED',
    };
};
const handleChangeLoginForm = (value, name) => {
    return {
        type: 'LOGIN_FORM_ONCHANGE',
        payload: { value, name },
    };
};
const loginFormValidated = (usernameValidation, passwordValidation) => {
    return {
        type: 'LOGIN_FORM_VALIDATED',
        payload: { usernameValidation, passwordValidation },
    };
};
const JWTValidated = (jwt, storage, rights) => {
    return {
        type: 'JWT_VALIDATED',
        payload: { jwt, storage, rights },
    };
};
const handleClickAdminMenu = (id, value) => {
    return {
        type: 'CLICKED_ON_ADMIN_MENU',
        payload: { id, value },
    };
};

const addUser = () => {
    return {
        type: 'ADD_USER_CLICKED',
    };
};

const handleUsersTableEvents = (id, name, event) => {
    return {
        type: 'UPDATE_USERS_CHANGE_AND_CLICK',
        payload: { id, name, event },
    };
};

const fetchUsers = (schoolSiteService, dispatch) => () => {
    schoolSiteService
        .getUsers()
        .then(resolve => {
            dispatch(handleClickAdminMenu('Users', resolve));
        })
        .catch(reject => {
            console.log(reject);
        });
};

export {
    mainMenuLoaded,
    handleRememberChecked,
    handleChangeLoginForm,
    loginFormValidated,
    JWTValidated,
    handleClickAdminMenu,
    addUser,
    handleUsersTableEvents,
    fetchUsers,
};
