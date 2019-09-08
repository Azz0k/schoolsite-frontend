import axios from 'axios';
let BackendAPI = {
    host: "http://127.0.0.1",
    api: "/api/1.0.0",
    loginUrl: "/login.php?XDEBUG_SESSION_START=13795",
    loginHeaders:{
        'Content-Type' : 'application/json; charset=UTF-8',
    },
    jwt:null,
    app: axios.create({
        withCredentials: true,
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8',
        }
}),
};
export default BackendAPI;