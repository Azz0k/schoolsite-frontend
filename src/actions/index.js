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
const handleClickAdminMenu = (id, schoolSiteService) => {
    return {
        type: 'CLICKED_ON_ADMIN_MENU',
        payload: { id, schoolSiteService },
    };
};

export {
    mainMenuLoaded,
    handleRememberChecked,
    handleChangeLoginForm,
    loginFormValidated,
    JWTValidated,
    handleClickAdminMenu,
};
