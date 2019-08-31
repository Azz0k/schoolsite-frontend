import TestMainMenu from "./TestMainMenu";
import LoginMenu from "./LoginMenu";
import AdminMenu from "./AdminMenu";
import BackendAPI from "./BackendAPI";

let SiteState = {

    isAuthorized: false,
    isRememberChecked : true,
    User : null,
    MainMenu : TestMainMenu,
    AdminMenu : AdminMenu,
    LoginMenu : LoginMenu,
    BackendAPI : BackendAPI,
}

export default SiteState;