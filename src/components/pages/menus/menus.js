import React, { useState } from 'react';
import { PagesAwesomeButton } from '../users/pages-awesome-button';

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

// сейчас работает только на горизонтальном - сделать так, чтобы работало для обоих
const Menus = ({
    menus: { horizontalMenu, verticalMenu, canApply, canRevert },
    updateMenuDragDrop,
    pagesData,
}) => {
    const [droppedElement, setDroppedElement] = useState(null);
    const [isHorizontal, setMenuType] = useState(true);
    const horizontalClassName = 'list-group-item' + addActive(isHorizontal);
    const verticalClassName = 'list-group-item' + addActive(!isHorizontal);
    const menuToList = element =>
        element.map(data => {
            const currentWidth = 100 - data.depth * 10;
            let dragClass = '';
            if (data.dragging) dragClass = ' list-group-item-warning';
            const className = 'list-group-item w-' + currentWidth + dragClass;
            return (
                <React.Fragment key={data.id}>
                    <li
                        className={className}
                        draggable
                        onDragStart={() => {
                            setDroppedElement(data);
                        }}
                        onDragOver={event => {
                            event.preventDefault();
                            updateMenuDragDrop(
                                isHorizontal ? horizontalMenu : verticalMenu,
                                isHorizontal,
                                droppedElement,
                                data,
                                event.nativeEvent,
                            );
                        }}
                        onDrop={event => {
                            updateMenuDragDrop(
                                isHorizontal ? horizontalMenu : verticalMenu,
                                isHorizontal,
                                droppedElement,
                                data,
                                event.nativeEvent,
                            );
                        }}
                    >
                        {data.name}
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
