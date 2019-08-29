import TestMainMenu from "./TestMainMenu";
import LoginMenu from "./LoginMenu";
import AdminMenu from "./AdminMenu";
class SiteState {
    static #instance = null;
    #isAuthorized = false;
    #isRememberChecked = false;
    #User = null;
    #MainMenu = TestMainMenu;
    #AdminMenu = AdminMenu;
    #LoginMenu = LoginMenu;
    constructor(){
        if (!SiteState.#instance){
            SiteState.#instance = this;
        }
     return SiteState.#instance;
    }
    get isAuthorized(){
        return this.#isAuthorized;
    }
    get LoginMenu(){
        return this.#LoginMenu;
    }
    get MainMenu(){
        return this.#MainMenu;
    }
    get AdminMenu(){
        return this.#AdminMenu;
    }
    get isRememberChecked(){
        return this.#isRememberChecked;
    }
    set isRememberChecked(value){
        if (typeof value ==='boolean')
            this.#isRememberChecked = value;

    }
}

export default SiteState;