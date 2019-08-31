import React from 'react';
import './Container.css';

function Container() {
    return(
        <div className="container-fluid" >
            <div className="row">
                <div className="col-sm-4" >
                    <h6>вертикальное меню</h6>
                </div>
                <div className="col-sm-8" >
                    <h6>материалы</h6>
                </div>
            </div>
        </div>
    )
}
export default Container;