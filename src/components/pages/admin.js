import React, { useState } from 'react';
import { DropDownAuthMenu } from '../../components/navbar/';
import './admin.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WithSchoolSiteService from '../hoc/with-schoolsite-service-context';
import { fetchUsers, updateHorizontalMenu } from '../../actions';
import SpinnerBoundary from '../spinner/spinner-boundary';
import Users from './users/users';

const WholeAdmin = ({ isAuthorized }) => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-4'>
                    <h6>вертикальное меню</h6>
                </div>
                <div className='col-sm-8'>
                    {!isAuthorized && <DropDownAuthMenu className='admin' />}
                </div>
            </div>
        </div>
    );
};

const debounce = (f, ms) => {
    let isCooldown = false;
    return function() {
        if (isCooldown) return;
        f.apply(this, arguments);
        isCooldown = true;
        setTimeout(() => (isCooldown = false), ms);
    };
};

// сейчас работает только на горизонтальном - сделать так, чтобы работало для обоих
const Menus = ({ menus: { horizontalMenu }, updateHorizontalMenu }) => {
    const [droppedElement, setDroppedElement] = useState(null);
    const updateMenu = menu => (droppedEl, droppedOn, event) => {
        const newMenu = [...menu];
        let dragging = false;
        if (event.type === 'dragover') dragging = true;
        const depthWidth = Math.floor(event.target.parentNode.clientWidth / 10);
        let newDepth = Math.floor(event.clientX / depthWidth);
        let newFather;
        if (newDepth === droppedOn.depth) newFather = droppedOn.father;
        else {
            newDepth = droppedOn.depth + 1;
            newFather = droppedOn.id;
        }
        const newEl = {
            ...droppedEl,
            father: newFather,
            depth: newDepth,
            dragging,
        };
        if (droppedOn.id !== droppedEl.id) {
            let index = newMenu.findIndex(el => el.id === droppedEl.id);
            newMenu.splice(index, 1);
            index = newMenu.findIndex(el => el.id === droppedOn.id);
            const verticalPosition =
                event.offsetY - event.target.clientHeight / 2;
            if (verticalPosition > 0) index++;
            newMenu.splice(index, 0, newEl);
        } else {
            let index = newMenu.findIndex(el => el.id === droppedOn.id);
            newMenu.splice(index, 1, newEl);
        }
        updateHorizontalMenu(newMenu);
    };
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
                            updateMenu(horizontalMenu)(
                                droppedElement,
                                data,
                                event.nativeEvent,
                            );
                        }}
                        onDrop={event => {
                            //let droppedId = event.dataTransfer.getData('id');
                            updateMenu(horizontalMenu)(
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
    const horizontalList = menuToList(horizontalMenu);
    return (
        <React.Fragment>
            <div className='d-flex justify-content-center'>
                <div className='form-group'>
                    <select
                        className='form-control'
                        id='menuSelect'
                        onChange={event => console.log(event.target.value)}
                    >
                        <option>Горизонтальное</option>
                        <option>Вертикальное</option>
                    </select>
                </div>
            </div>
            <ul
                className='list-group d-flex flex-column align-items-end'
                onDragOver={event => event.preventDefault()}
            >
                {horizontalList}
            </ul>
        </React.Fragment>
    );
};

const Admin = ({
    isAuthorized,
    match,
    users,
    menus,
    fetchUsers,
    usersPageData,
    updateHorizontalMenu,
}) => {
    const { id } = match.params;

    if (id === undefined) {
        return <WholeAdmin isAuthorized={isAuthorized} />;
    }
    if (id === 'users') {
        if (!users.isLoaded) {
            fetchUsers();
        }
        return (
            <SpinnerBoundary isLoaded={users.isLoaded}>
                <Users users={users} usersPageData={usersPageData} />
            </SpinnerBoundary>
        );
    }
    if (id === 'menu') {
        return (
            <SpinnerBoundary isLoaded={menus.isLoaded}>
                <Menus
                    menus={menus}
                    updateHorizontalMenu={updateHorizontalMenu}
                />
            </SpinnerBoundary>
        );
    }
    return <h6>{id}</h6>;
};

const mapStateToAdminProps = ({
    isAuthorized,
    users,
    menus,
    usersPageData,
}) => {
    return { isAuthorized, users, menus, usersPageData };
};
const mapDispatchToAdminProps = (dispatch, { schoolSiteService }) => {
    return {
        fetchUsers: fetchUsers(schoolSiteService, dispatch),
        updateHorizontalMenu: menu => dispatch(updateHorizontalMenu(menu)),
    };
};
export default withRouter(
    WithSchoolSiteService(
        connect(
            mapStateToAdminProps,
            mapDispatchToAdminProps,
        )(Admin),
    ),
);
