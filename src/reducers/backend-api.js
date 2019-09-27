import axios from 'axios';
let backendApi = {
    host: 'http://127.0.0.1',
    api: '/api/1.0.0',
    storage: null,
    jwt: null,
    loginUrl: '/login.php',
    usersUrl: '/users/index.php',
    jsonRpc: '/jsonrpc/index.php',
    usersUpdateUrl: '/users/update.php?XDEBUG_SESSION_START=17501',
    loginHeaders: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    app: axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }),
};
export default backendApi;
