import React from 'react';
import './container.css';
import Spinner from '../spinner';

const Container = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-4'>
                    <h6>вертикальное меню</h6>
                </div>
                <div className='col-sm-8'>
                    <Spinner />
                </div>
            </div>
        </div>
    );
};
export default Container;
