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

const usersLoaded = users => {
    return {
        type: 'USERS_LOADED',
        payload: users,
    };
};

const handleUsersTableEvents = (id, name, event) => {
    console.log(`name: ${name}, id:${id}`);
    return {type: ''};
};

export {
    mainMenuLoaded,
    handleRememberChecked,
    handleChangeLoginForm,
    loginFormValidated,
    JWTValidated,
    handleClickAdminMenu,
    usersLoaded,
    handleUsersTableEvents,
};
