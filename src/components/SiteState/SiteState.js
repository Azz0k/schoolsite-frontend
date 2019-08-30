import TestMainMenu from "./TestMainMenu";
import LoginMenu from "./LoginMenu";
import AdminMenu from "./AdminMenu";
import BackendAPI from "./BackendAPI";
import axios from 'axios';
class SiteState {
    static #instance = null;
    #isAuthorized = false;
    #isRememberChecked = false;
    #User = null;
    #MainMenu = TestMainMenu;
    #AdminMenu = AdminMenu;
    #LoginMenu = LoginMenu;
    #BackendAPI = BackendAPI;
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
    getCSRFToken(){
        let url = this.#BackendAPI.host+this.#BackendAPI.api+this.#BackendAPI.loginUrl;
        axios.get(url, {headers: this.#BackendAPI.loginHeaders}).catch(function (e) {
            console.log(e);
        });
    }
    Authorization(username, password){
        this.getCSRFToken();
        let url = this.#BackendAPI.host+this.#BackendAPI.api+this.#BackendAPI.loginUrl;
       // axios.post(url,{username:username,password:password},{withCredentials: true}).then((response)=>(console.log(response)));
    }
}

export default SiteState;