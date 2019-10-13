import React, { useState, useEffect } from 'react';
import { PagesInput, PagesAwesomeButton } from '../users/pages-awesome-button';

const debounce = (f, ms) => {
    let isCooldown = false;
    return function() {
        if (isCooldown) return;
        f.apply(this, arguments);
        isCooldown = true;
        setTimeout(() => (isCooldown = false), ms);
    };
};

const addActive = bool => {
    if (bool) return ' active';
    return '';
};

const findAllChildren = (element, menu) => {
    const elements = new Set();
    elements.add(element.id);
    menu.forEach(el => {
        if (elements.has(el.father)) elements.add(el.id);
    });
    return elements;
};

const Menus = ({
    menus: { horizontalMenu, verticalMenu, canApply, canRevert },
    updateMenuDragDrop,
    pagesData,
}) => {
    const [droppedElement, setDroppedElement] = useState(null);
    const [isHorizontal, setMenuType] = useState(true);
    useEffect(() => {
        const $ = window.$;
        $(function() {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    const thisMenu = isHorizontal ? horizontalMenu : verticalMenu;
    const horizontalClassName = 'list-group-item' + addActive(isHorizontal);
    const verticalClassName = 'list-group-item' + addActive(!isHorizontal);
    const menuToList = element =>
        element.map(data => {
            const currentWidth = 100 - data.depth * 10;
            let dragClass = '';
            if (data.dragging) dragClass = ' list-group-item-warning';
            const className =
                ' menu-list-item list-group-item w-' + currentWidth + dragClass;
            return (
                <React.Fragment key={data.id}>
                    <li
                        className={className}
                        draggable
                        onDragStart={() => {
                            setDroppedElement(findAllChildren(data, thisMenu));
                        }}
                        onDragOver={event => {
                            event.preventDefault();
                            updateMenuDragDrop(
                                thisMenu,
                                isHorizontal,
                                droppedElement,
                                data,
                                event.nativeEvent,
                            );
                        }}
                        onDrop={event => {
                            updateMenuDragDrop(
                                thisMenu,
                                isHorizontal,
                                droppedElement,
                                data,
                                event.nativeEvent,
                            );
                        }}
                    >
                        <div className='input-group input-group mb-3'>
                            <div className='input-group-prepend'>
                                <PagesAwesomeButton
                                    pagesData={pagesData['editMenuName']}
                                    handleClick={() => {}}
                                />
                            </div>
                            <PagesInput
                                data={data}
                                pagesData={pagesData['menuName']}

                                disabled={true}
                            />
                            <PagesInput
                                data={data}
                                pagesData={pagesData['menuLink']}

                                disabled={true}
                            />
                        </div>
                    </li>
                </React.Fragment>
            );
        });
    const menuList = menuToList(isHorizontal ? horizontalMenu : verticalMenu);
    return (
        <React.Fragment>
            <ul className='list-group flex-sm-row justify-content-center menu-selector'>
                <li
                    className={horizontalClassName}
                    onClick={() => setMenuType(true)}
                >
                    Горизонтальное
                </li>
                <li
                    className={verticalClassName}
                    onClick={() => setMenuType(false)}
                >
                    Вертикальное
                </li>
            </ul>
            <ul
                className='list-group d-flex flex-column align-items-end'
                onDragOver={event => event.preventDefault()}
            >
                {menuList}
            </ul>
            <div className='d-flex justify-content-center menu-selector'>
                <PagesAwesomeButton
                    pagesData={pagesData['addMenuElement']}
                    handleClick={() => {}}
                />
                <PagesAwesomeButton
                    pagesData={pagesData['apply']}
                    handleClick={() => {}}
                    disabled={!canApply}
                />
                <PagesAwesomeButton
                    pagesData={pagesData['revert']}
                    handleClick={() => {}}
                    disabled={!canRevert}
                />
            </div>
        </React.Fragment>
    );
};

export default Menus;
