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

const Menus = ({ menus: { horizontalMenu }, updateHorizontalMenu }) => {
    const [droppedElement, setDroppedElement] = useState(null);
    const updateMenu = menu => (droppedEl, droppedOn, position) => {
        //допилить функцию, чтобы вставляло нормально а не куда -попало и удаляло исходник
        let index = menu.findIndex(el => el.id === droppedOn.id);
        index++;
        const newMenu = [...menu];
        const newEl = {
            ...droppedEl,
            father: droppedOn.id,
            depth: droppedOn.depth + 1,
        };
        newMenu.splice(index, 0, newEl);
        updateHorizontalMenu(newMenu);
    };
    const menuToList = element =>
        element.map(data => {
            const currentWidth = 100 - data.depth * 10;
            const className = 'list-group-item w-' + currentWidth;
            return (
                <React.Fragment key={data.id}>
                    <li
                        className={className}
                        draggable
                        onDragStart={event => {
                            //event.dataTransfer.setData('id', data.id);
                            setDroppedElement(data);
                        }}
                        onDragOver={event => event.preventDefault()}
                        onDrop={event => {
                            //let droppedId = event.dataTransfer.getData('id');
                            updateMenu(horizontalMenu)(
                                droppedElement,
                                data,
                                event.nativeEvent.clientY / 2 -
                                    event.nativeEvent.offsetY,
                            );
                            console.log(event.nativeEvent);
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
