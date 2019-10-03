import React, { useState } from 'react';
import { DropDownAuthMenu } from '../../components/navbar/';
import './admin.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WithSchoolSiteService from '../hoc/with-schoolsite-service-context';
import { fetchUsers, updateMenuDragDrop } from '../../actions';
import SpinnerBoundary from '../spinner/spinner-boundary';
import Users from './users/users';
import Menus from './menus/menus';

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

const Admin = ({
    isAuthorized,
    match,
    users,
    menus,
    fetchUsers,
    pagesData,
    updateMenuDragDrop,
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
                <Users users={users} usersPageData={pagesData} />
            </SpinnerBoundary>
        );
    }
    if (id === 'menu') {
        return (
            <SpinnerBoundary isLoaded={menus.isLoaded}>
                <Menus menus={menus} updateMenuDragDrop={updateMenuDragDrop} usersPageData={pagesData}/>
            </SpinnerBoundary>
        );
    }
    return <h6>{id}</h6>;
};

const mapStateToAdminProps = ({
    isAuthorized,
    users,
    menus,
    pagesData,
}) => {
    return { isAuthorized, users, menus, pagesData };
};
const mapDispatchToAdminProps = (dispatch, { schoolSiteService }) => {
    return {
        fetchUsers: fetchUsers(schoolSiteService, dispatch),
        updateMenuDragDrop: updateMenuDragDrop(dispatch),
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
