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

const handleLogout = () => {
    return {
        type: 'LOGOUT',
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
const handleFetchedUsers = value => {
    return {
        type: 'FETCHED_USERS',
        payload: { value },
    };
};

const addUser = () => {
    return {
        type: 'ADD_USER_CLICKED',
    };
};

const deleteUser = id => {
    return {
        type: 'DELETE_USER_CLICKED',
        payload: { id },
    };
};

const handleUsersTableEvents = (id, name, event) => {
    return {
        type: 'UPDATE_USERS_CHANGE_AND_CLICK',
        payload: { id, name, event },
    };
};
const usersValidated = (errorFound, wrongId) => {
    return {
        type: 'UPDATE_USERS_VALIDATED',
        payload: { errorFound, wrongId },
    };
};

const fetchUsers = (schoolSiteService, dispatch) => () => {
    schoolSiteService
        .getUsers()
        .then(resolve => {
            dispatch(handleFetchedUsers(resolve));
        })
        .catch(reject => {
            console.log(reject);
        });
};

const validateUsers = users => {
    const pattern = /^[\w-_@.]+$/;
    let wrongId;
    let errorFound = false;
    const set = new Set();
    users.value.forEach(el => {
        if (
            !pattern.test(el.username) ||
            el.username.length === 0 ||
            set.has(el.username)
        ) {
            errorFound = true;
            wrongId = el.id;
        }
        set.add(el.username);
    });
    return { errorFound, wrongId };
};

const applyUsers = (schoolSiteService, dispatch) => users => {
    const { errorFound, wrongId } = validateUsers(users);
    dispatch(usersValidated(errorFound, wrongId));
    if (!errorFound) {
        schoolSiteService
            .putUsers()
            .then(resolve => {
                dispatch(handleFetchedUsers(resolve));
            })
            .catch(reject => {
                console.log(reject);
            });
    }
};

export {
    mainMenuLoaded,
    handleRememberChecked,
    handleChangeLoginForm,
    loginFormValidated,
    JWTValidated,
    handleFetchedUsers,
    addUser,
    handleUsersTableEvents,
    fetchUsers,
    applyUsers,
    deleteUser,
    handleLogout,
};
