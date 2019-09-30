const testMainMenuFlat = [
    { id: '1', name: 'Главная', href: '#' },
    {
        id: '2',
        name: 'Сведения об образовательной организации',
        href: '#',
    },
    { id: '2-1', name: 'Основные сведения', href: '#', father: '2' },
    {
        id: '2-2',
        name: 'Структура и органы управления образовательной организацией',
        href: '#',
        father: '2',
    },
    {
        id: '2-3',
        name: 'Документы',
        href: '#',
        father: '2',
    },
    { id: '2-3-1', name: 'Еще что-то', href: '#', father: '2-3' },
    { id: '2-4', name: 'Образование', href: '#', father: '2' },
    {
        id: '3',
        name: 'Родителям',
        href: '#',
    },
    { id: '3-1', name: 'Родителям-1', href: '#', father: '3' },
    {
        id: '3-2',
        name: 'Родителям-2',
        href: '#',
        father: '3',
    },
    { id: '3-2-1', name: 'Родителям-3', href: '#', father: '3-2' },
    { id: '4', name: 'Начальная школа', href: '#' },
];

const addDepth = menu => {
    return menu.map(element => {
        if (element.father === undefined) {
            element.depth = 0;
            addDepth.father = element;
        } else {
            if (addDepth.father.id === element.father) {
                element.depth = addDepth.father.depth + 1;
            } else {
                addDepth.father = menu.find(e => e.id === element.father);
                element.depth = addDepth.father.depth + 1;
            }
        }
        return element;
    });
};
export default addDepth(testMainMenuFlat);
