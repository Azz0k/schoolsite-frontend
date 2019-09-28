const updateLoginFormSubclass = (loginForm, action) => {
    switch (action.type) {
        case 'REMEMBER_CHECKED': {
            return {
                ...loginForm,
                isRememberChecked: !loginForm.isRememberChecked,
            };
        }
        case 'LOGIN_FORM_ONCHANGE': {
            let { name, value } = action.payload;
            return {
                ...loginForm,
                [name]: value,
            };
        }
        case 'LOGIN_FORM_VALIDATED': {
            const { usernameValidation, passwordValidation } = action.payload;
            return {
                ...loginForm,
                usernameValidation,
                passwordValidation,
            };
        }
        default:
            return loginForm;
    }
};

export default updateLoginFormSubclass;
