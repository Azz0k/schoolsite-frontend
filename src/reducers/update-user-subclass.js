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

const updateUserSubclass = (users, action) => {
    switch (action.type) {
        case 'FETCHED_USERS': {
            const { value } = action.payload;
            return {
                ...users,
                value,
                isLoaded: true,
                errorFound: false,
                wrongId: null,
                canRevert: false,
                canApply: false,
                updateUsersId: new Set(),
                addUsersId: new Set(),
            };
        }
        case 'ADD_USER_CLICKED': {
            const maxId =
                users.value.reduce((a, b) => {
                    if (b.id > a) return b.id;
                    else return a;
                }, 0) + 1;
            console.log(maxId);
            return {
                ...users,
                value: [...users.value, { ...emptyUser, id: maxId }],
                canRevert: true,
                canApply: true,
                addUsersId: users.addUsersId.add(maxId),
            };
        }
        case 'DELETE_USER_CLICKED': {
            const { id } = action.payload;
            const newUpdateUsersId = users.updateUsersId;
            const removeAdded = users.value.filter(element => {
                return !users.addUsersId.has(element.id);
            });
            const newValue = removeAdded.map(element => {
                if (id === element.id) {
                    element.deleted = 1;
                    newUpdateUsersId.add(id);
                }
                return element;
            });
            const newAddUsersId = users.addUsersId;
            newAddUsersId.delete(id);
            return {
                ...users,
                value: newValue,
                canApply: newUpdateUsersId.size || newAddUsersId.size,
                canRevert: newUpdateUsersId.size || newAddUsersId.size,
                updateUsersId: newUpdateUsersId,
                addUsersId: newAddUsersId,
            };
        }
        case 'UPDATE_USERS_CHANGE_AND_CLICK': {
            const { id, name, event } = action.payload;
            return {
                ...users,
                value: updateUsersOnChangeAndClick(
                    users.value,
                    id,
                    name,
                    event,
                ),
                canRevert: true,
                canApply: true,
                updateUsersId: users.updateUsersId.add(id),
            };
        }
        case 'UPDATE_USERS_VALIDATED': {
            const { errorFound, wrongId } = action.payload;
            return {
                ...users,
                errorFound,
                wrongId,
            };
        }
        default:
            return users;
    }
};

const updateUsersOnChangeAndClick = (state, id, name, event) => {
    let element = state.find(e => {
        return e.id === id;
    });
    if (event.type === 'click') {
        element = {
            ...element,
            [name]: +!element[name],
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

export default updateUserSubclass;
