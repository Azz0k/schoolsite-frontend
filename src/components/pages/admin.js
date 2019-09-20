import React from 'react';
import { DropDownAuthMenu } from '../../components/navbar/';
import './admin.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WithSchoolSiteService from '../hoc/with-schoolsite-service-context';
import { handleClickAdminMenu } from '../../actions';
import SpinnerBoundary from '../spinner/spinner-boundary';

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
const Users = ({ users }) => {
    const rows = users.value.map(data => {
        return (
            //<input type='text' className='form-control' value={data.username}/>
            <tr key={data.id}>
                <td>
                    <input
                        type='text'
                        className='form-control users-username'
                        value={data.username}
                    />
                </td>
                <td>
                    <input
                        type='text'
                        className='form-control'
                        value={data.firstname}
                    />
                </td>
                <td>
                    <input
                        type='text'
                        className='form-control'
                        value={data.lastname}
                    />
                </td>
                <td>
                    <input
                        type='text'
                        className='form-control'
                        value={data.email}
                    />
                </td>
                <td>
                    <input
                        type='text'
                        className='form-control'
                        value={data.description}
                    />
                </td>
                <td></td>
            </tr>
        );
    });
    return (
        <table className='table table-bordered table-hover w-auto table-responsive'>
            <thead>
                <tr>
                    <th scope='col'>
                        Имя пользователя
                    </th>
                    <th scope='col'>
                        Фамилия
                    </th>
                    <th scope='col'>
                        Имя
                    </th>
                    <th scope='col'>
                        E-mail
                    </th>
                    <th scope='col'>
                        Комментарий
                    </th>
                    <th scope='col'></th>
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
}) => {
    const { id } = match.params;

    if (id === undefined) {
        return <WholeAdmin isAuthorized={isAuthorized} />;
    }
    if (id === 'users') {
        schoolSiteService
            .getUsers()
            .then(resolve => {
                handleClickAdminMenu('Users', resolve);
            })
            .catch(reject => {
                console.log(reject);
            });
        return (
            <SpinnerBoundary isLoaded={users.isLoaded}>
                <Users users={users} />
            </SpinnerBoundary>
        );
    }
    return <h6>{id}</h6>;
};

const mapStateToAdminProps = ({ isAuthorized, users }) => {
    return { isAuthorized, users };
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
