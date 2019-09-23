import React from 'react';
import { DropDownAuthMenu } from '../../components/navbar/';
import './admin.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WithSchoolSiteService from '../hoc/with-schoolsite-service-context';
import { fetchUsers } from '../../actions';
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

const Admin = ({ isAuthorized, match, users, fetchUsers, usersPageData }) => {
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
    return <h6>{id}</h6>;
};

const mapStateToAdminProps = ({ isAuthorized, users, usersPageData }) => {
    return { isAuthorized, users, usersValue: users.value, usersPageData };
};
const mapDispatchToAdminProps = (dispatch, { schoolSiteService }) => {
    return {
        fetchUsers: fetchUsers(schoolSiteService, dispatch),
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
