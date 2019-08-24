import TestMainMenu from "./TestMainMenu";
import LoginMenu from "./LoginMenu";
class SiteState {
    static #instance = null;
    #isAuthorized = false;
    #User = null;
    #MainMenu = TestMainMenu;
    #AdminMenu = null;
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
}

export default SiteState;