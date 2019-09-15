const adminMenu = [
    { id: 'Configuration', name: 'Настройки сайта', href: '/admin/configuration', disabled: true, submenu: [] },
    { id: 'Users', name: 'Пользователи', href: '/admin/users', disabled: true, submenu: [] },
    { id: 'Menu', name: 'Меню', href: '/admin/menu', disabled: true, submenu: [] },
    { id: 'Materials', name: 'Материалы', href: '/admin/materials', disabled: true, submenu: [] },
    { id: 'Logout', name: 'Выйти', href: '#', disabled: false, submenu: [] },
];

export default adminMenu;
