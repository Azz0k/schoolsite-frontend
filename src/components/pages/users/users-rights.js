import React, { useEffect } from 'react';
import { handleUsersTableEvents } from '../../../actions';
import { connect } from 'react-redux';

let UsersCell = ({
    data = {},
    handleUsersTableEvents,
    needValidation = false,
    errorFound = false,
    wrongId = null,
    usersPageData: { text, value, validation = '' },
}) => {
    let inputValue = data[value];
    if (inputValue === null) {
        inputValue = '';
    }
    let textValidation = '';
    let className = 'form-control users-input';
    if (errorFound && needValidation && data.id === wrongId) {
        className += ' is-invalid';
        textValidation = validation;
    }
    return (
        <td key={data.id + value}>
            <div className='form-group'>
                <input
                    type='text'
                    className={className}
                    value={inputValue}
                    placeholder={text}
                    onChange={event =>
                        handleUsersTableEvents(data.id, value, event)
                    }
                />
                <div className='invalid-feedback'>{textValidation}</div>
            </div>
        </td>
    );
};

const turnOffTooltip = id => {
    const $ = window.$;
    $('#' + id).tooltip('hide');
};

let UsersRights = ({
    data = {},
    handleUsersTableEvents,
    handleClick = handleUsersTableEvents,
    disabled = false,
    usersPageData: { text, value, name, classChecked, classUnchecked, tooltip },
}) => {
    const checked = data[value];
    const className = checked ? classChecked : classUnchecked;
    const key = data.id + name;
    const id = data.id + name;
    return (
        <button
            key={key}
            className='btn btn-outline-success'
            name={name}
            id={id}
            onClick={event => {
                turnOffTooltip(id);
                handleClick(data.id, value, event);
            }}
            data-toggle='tooltip'
            data-placement='top'
            title={tooltip}
            disabled={disabled}
        >
            <i className={className} />
            {text}
        </button>
    );
};

const mapDispatchToUsersRightsProps = {
    handleUsersTableEvents: handleUsersTableEvents,
};

UsersRights = connect(
    null,
    mapDispatchToUsersRightsProps,
)(UsersRights);
UsersCell = connect(
    null,
    mapDispatchToUsersRightsProps,
)(UsersCell);
export { UsersRights, UsersCell };
