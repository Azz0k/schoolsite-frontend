import React from 'react';
import { DropDownAuthMenu } from '../../components/navbar/';
import './admin.css';

const Admin = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-4'>
                    <h6>вертикальное меню</h6>
                </div>
                <div className='col-sm-8'>
                    <DropDownAuthMenu className='admin' />
                </div>
            </div>
        </div>
    );
};
export default Admin;
