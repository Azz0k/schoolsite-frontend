import testMainMenu from './test-main-menu';
import adminMenu from './admin-menu';
import loginMenu from './login-menu';

const initialState = {
    isAuthorized: false,
    isRememberChecked: true,
    user: null,
    mainMenu: testMainMenu,
    adminMenu: adminMenu,
    loginMenu: loginMenu,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MAINMENU_LOADED': {
            return {
                mainMenu: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
