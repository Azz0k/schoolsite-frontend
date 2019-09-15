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
const Users = () => {
    return <h4>lol users</h4>;
};
const Admin = ({ isAuthorized, match }) => {
    const { id } = match.params;
    if (id === undefined) {
        return <WholeAdmin isAuthorized={isAuthorized} />;
    }
    if (id === 'users') {
        return <Users />;
    }
    return <h6>{id}</h6>;
};

export default withRouter(
    connect(({ isAuthorized }) => ({ isAuthorized }))(Admin),
);
