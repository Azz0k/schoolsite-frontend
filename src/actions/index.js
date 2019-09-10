

const mainMenuLoaded= (mainMenu) => {
    return {
        type:'MAINMENU_LOADED',
        payload: mainMenu
    }
};

export {
    mainMenuLoaded
};