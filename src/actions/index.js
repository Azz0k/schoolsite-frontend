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

const updateHorizontalMenu = menu => {
    return {
        type: 'UPDATE_HORIZONTAL_MENU',
        payload: { menu },
    };
};

const updateVerticalMenu = menu => {
    return {
        type: 'UPDATE_VERTICAL_MENU',
        payload: { menu },
    };
};

const updateMenuDragDrop = dispatch => (
    menu,
    menuType,
    droppedEl,
    droppedOn,
    event,
) => {
    const newMenu = [...menu];
    let dragging = false;
    if (event.type === 'dragover') dragging = true;
    const depthWidth = Math.floor(event.target.parentNode.clientWidth / 10);
    let newDepth = Math.floor(event.clientX / depthWidth);
    let newFather;
    if (newDepth === droppedOn.depth) newFather = droppedOn.father;
    else {
        newDepth = droppedOn.depth + 1;
        newFather = droppedOn.id;
    }
    const newEl = {
        ...droppedEl,
        father: newFather,
        depth: newDepth,
        dragging,
    };
    if (droppedOn.id !== droppedEl.id) {
        let index = newMenu.findIndex(el => el.id === droppedEl.id);
        newMenu.splice(index, 1);
        index = newMenu.findIndex(el => el.id === droppedOn.id);
        const verticalPosition = event.offsetY - event.target.clientHeight / 2;
        if (verticalPosition > 0) index++;
        newMenu.splice(index, 0, newEl);
    } else {
        let index = newMenu.findIndex(el => el.id === droppedOn.id);
        newMenu.splice(index, 1, newEl);
    }
    if (menuType) dispatch(updateHorizontalMenu(newMenu));
    else dispatch(updateVerticalMenu(newMenu));
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
    updateHorizontalMenu,
    updateMenuDragDrop,
};
