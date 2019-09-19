import React from 'react';
import { DropDownAuthMenu } from '../../components/navbar/';
import './admin.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    //canchangematerials: 1
    // canchangemenu: 1
    // canchangeusers: 1
    // canconfigure: 1
    // deleted: 0
    // description: null
    // email: "11@11.ru"
    // enabled: 1
    // firstname: "pavel"
    // id: 2
    // lastname: "milokum"
    // userdate: "2019-08-16"
    // username: "pmilokum"
    const rows = users.value.map(data => {
        return (
            <tr key={data.id} className='d-flex'>
                <td className='col-sm-3'><input type='text' className='form-control' value={data.username}/></td>
                <td className='col-sm-3'>{data.firstname}</td>
                <td className='col-sm-3'>{data.lastname}</td>
                <td className='col-sm-3'>{data.email}</td>
                <td className='col-sm-3'>{data.description}</td>
            </tr>
        );
    });
    return (
        <table className='table table-borderless table-hover'>
            <thead>
                <tr className='d-flex'>
                    <th scope='col-sm-3'>Имя пользователя</th>
                    <th scope='col-sm-3'>Фамилия</th>
                    <th scope='col-sm-3'>Имя</th>
                    <th scope='col-sm-3'>E-mail</th>
                    <th scope='col-sm-3'>Комментарий</th>
                    <th scope='col-sm-3'></th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};
const Admin = ({ isAuthorized, match, users }) => {
    const { id } = match.params;
    if (id === undefined) {
        return <WholeAdmin isAuthorized={isAuthorized} />;
    }
    if (id === 'users') {
        return <Users users={users} />;
    }
    return <h6>{id}</h6>;
};

const mapStateToAdminProps = ({ isAuthorized, users }) => {
    return { isAuthorized, users };
};
export default withRouter(connect(mapStateToAdminProps)(Admin));
