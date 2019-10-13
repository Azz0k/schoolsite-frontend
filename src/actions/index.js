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
        type: 'CHANGED_UPDATE_HORIZONTAL_MENU',
        payload: { menu },
    };
};

const updateVerticalMenu = menu => {
    return {
        type: 'CHANGED_UPDATE_VERTICAL_MENU',
        payload: { menu },
    };
};

const updateMenuDragDrop = dispatch => (
    menu,
    menuType,
    droppedElements,
    droppedOn,
    event,
) => {
    const verticalPosition = event.offsetY - event.target.clientHeight / 2;
    let offset = verticalPosition > 0 ? 1 : 0;
    let newMenu = [...menu];
    const depthWidth = Math.floor(event.target.parentNode.clientWidth / 10);
    let newDepth = Math.floor(event.clientX / depthWidth);
    let newFather;
    const droppedElementId = droppedElements.values().next().value;
    const droppedEl = menu.find(el => el.id === droppedElementId);
    if (verticalPosition < 0) {
        newFather = droppedOn.father;
        newDepth = droppedOn.depth;
    } else {
        newDepth = droppedOn.depth + 1;
        newFather = droppedOn.id;
    }
    if (event.type === 'dragover') {
        if (droppedElements.has(droppedOn.id)) return false;
        const dragging = true;
        const newEl = {
            ...droppedEl,
            dragging,
            father: newFather,
            depth: newDepth,
        };
        const oldIndex = newMenu.findIndex(el => el.id === droppedEl.id);
        newMenu.splice(oldIndex, 1);
        let newIndex = newMenu.findIndex(el => el.id === droppedOn.id);
        if (verticalPosition > 0) newIndex++;
        newMenu.splice(newIndex, 0, newEl);
    } else {
        if (droppedElements.has(droppedOn.id) && droppedOn.id !== droppedEl.id)
            return false;
        const dragging = false;
        if (droppedOn.id === droppedEl.id) {
            newFather = droppedEl.father;
            newDepth = droppedEl.depth;
        }
        const droppedElementsArray = Array.from(droppedElements);
        droppedElements.forEach(value => {
            const oldElement = newMenu.find(el => el.id === value);
            const oldIndex = newMenu.findIndex(el => el.id === value);
            newMenu.splice(oldIndex, 1);
            let newIndex = 0;
            if (value === droppedEl.id) {
                newIndex = newMenu.findIndex(el => el.id === droppedOn.id);
                if (verticalPosition > 0) newIndex++;
            } else {
                newIndex = newMenu.findIndex(el => el.id === droppedOn.id);
                if (verticalPosition > 0) newIndex++;
                const offset = droppedElementsArray.findIndex(
                    el => el === value,
                );
                newIndex += offset;
                newFather = oldElement.father;
                const tempFather = newMenu.find(
                    el => el.id === oldElement.father,
                );
                newDepth = tempFather.depth + 1;
            }
            const newEl = {
                ...oldElement,
                dragging,
                father: newFather,
                depth: newDepth,
            };
            newMenu.splice(newIndex, 0, newEl);
        });
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
