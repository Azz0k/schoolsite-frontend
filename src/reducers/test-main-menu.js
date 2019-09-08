const testMainMenu = [
    {id:'1',
        name:'Главная',
        href: '#',
        submenu:[]
    },
    {id:'2',
        name:'Сведения об образовательной организации',
        href: '#',
        submenu:[
            {id: '2-1',
                name:'Основные сведения',
                href: '#',
                submenu:[]
            },
            {id:'2-2',
                name:'Структура и органы управления образовательной организацией',
                href: '#',
                submenu:[]
            },
            {id:'2-3',
                name:'Документы',
                href: '#',
                submenu:[
                    {id:'2-3-1',
                        name:'Еще что-то',
                        href: '#',
                        submenu:[]
                    },

                ]
            },
            {id:'2-4',
                name:'Образование',
                href: '#',
                submenu:[]
            },
        ]
    },
    {id:'3',
        name:'Родителям',
        href: '#',
        submenu:[
            {id:'3-1',
            name:'Родителям-1',
            href: '#',
            submenu:[]
        },
            {id:'3-2',
                name:'Родителям-2',
                href: '#',
                submenu:[
                    {id:'3-2-1',
                    name:'Родителям-3',
                    href: '#',
                    submenu:[]
                }]
            },
        ]
    },
    {id:'4',
        name:'Начальная школа',
        href: '#',
        submenu:[]
    },
];
export default testMainMenu;