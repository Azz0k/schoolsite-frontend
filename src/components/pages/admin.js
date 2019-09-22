import React, { useEffect } from 'react';
import { DropDownAuthMenu } from '../../components/navbar/';
import './admin.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WithSchoolSiteService from '../hoc/with-schoolsite-service-context';
import { handleClickAdminMenu } from '../../actions';
import SpinnerBoundary from '../spinner/spinner-boundary';
import { UsersRights, UsersCell } from './users/users-rights';

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

const Users = ({ users, usersPageData }) => {
    useEffect(() => {
        const $ = window.$;
        $(function() {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    const rows = users.value.map(data => {
        if (data.deleted === 0) {
            return (
                <tr key={data.id}>
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['userName']}
                    />
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['firstName']}
                    />
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['lastName']}
                    />
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['email']}
                    />
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['description']}
                    />
                    <td>
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['canConfigure']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['canChangeUsers']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['canChangeMenu']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['canChangeMaterials']}
                        />
                    </td>
                    <td>
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['enabled']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['deleteUser']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['changePassword']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['apply']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['revert']}
                        />
                    </td>
                </tr>
            );
        }
    });
    return (
        <table className='table table-bordered table-hover w-auto table-responsive'>
            <thead>
                <tr>
                    <th scope='col'>Имя пользователя</th>
                    <th scope='col'>Фамилия</th>
                    <th scope='col'>Имя</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Комментарий</th>
                    <th scope='col'>Может изменять</th>
                    <th scope='col'>Действия</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

const Admin = ({
    isAuthorized,
    match,
    users,
    schoolSiteService,
    handleClickAdminMenu,
    usersPageData,
}) => {
    const { id } = match.params;

    if (id === undefined) {
        return <WholeAdmin isAuthorized={isAuthorized} />;
    }
    if (id === 'users') {
        if (!users.isLoaded) {
            schoolSiteService
                .getUsers()
                .then(resolve => {
                    handleClickAdminMenu('Users', resolve);
                })
                .catch(reject => {
                    console.log(reject);
                });
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
const mapDispatchToAdminProps = {
    handleClickAdminMenu,
};
export default withRouter(
    WithSchoolSiteService(
        connect(
            mapStateToAdminProps,
            mapDispatchToAdminProps,
        )(Admin),
    ),
);
