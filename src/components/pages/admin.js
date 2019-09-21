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

const UsersCell = ({ value }) => {
    return (
        <td>
            <input
                type='text'
                className='form-control users-input'
                value={value}
            />
        </td>
    );
};

const UsersRights = ({ checked, text }) => {
    const wordChecked = checked ? 'check-' : '';
    const className = `far fa-${wordChecked}square`;
    return (
        <button className='btn btn-outline-success btn-sm '>
            <i className={className} />
            {' ' + text}
        </button>
    );
};

const Users = ({ users }) => {
    const rows = users.value.map(data => {
        if (data.deleted === 0) {
            return (
                //canconfigure(pin):0
                // canchangeusers(pin):0
                // canchangemenu(pin):0
                // canchangematerials(pin):0
                // deleted(pin):0
                // enabled(pin):0
                <tr key={data.id}>
                    <UsersCell value={data.username} />
                    <UsersCell value={data.firstname} />
                    <UsersCell value={data.lastname} />
                    <UsersCell value={data.email} />
                    <UsersCell value={data.description} />
                    <td>
                        <UsersRights checked={data.canconfigure} text='конфигурацию'/>
                        <UsersRights checked={data.canchangeusers} text='пользователей'/>
                        <UsersRights checked={data.canchangemenu} text='меню' />
                        <UsersRights checked={data.canchangematerials} text='материалы'/>
                    </td>
                    <td>
                        <UsersRights checked={data.enabled} text='Активен' />
                        <button className='btn btn-outline-success btn-sm '>
                            <i className='fas fa-user-slash' />
                        </button>
                        <button className='btn btn-outline-success btn-sm '>
                            <i className='fas fa-key' />
                        </button>
                        <button className='btn btn-outline-success btn-sm '>
                            <i className='far fa-check-circle' />
                        </button>
                        <button className='btn btn-outline-success btn-sm '>
                            <i className='fa fa-undo' />
                        </button>
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
