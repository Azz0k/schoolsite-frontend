import testMainMenu from "./test-main-menu";
import adminMenu from "./admin-menu";
import loginMenu from "./login-menu";


const initialState = {
    isAuthorized: false,
    isRememberChecked : true,
    user : null,
    mainMenu : testMainMenu,
    adminMenu : adminMenu,
    loginMenu : loginMenu,
    testState: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case  'TEST': {
            return {
                testState: action.payload
            }

        }
        default: return state;
    }

};

export default reducer;