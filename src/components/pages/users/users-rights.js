import React from 'react';
import { handleUsersTableEvents } from '../../../actions';
import { connect } from 'react-redux';

let UsersCell = ({
    data = {},
    handleUsersTableEvents,
    usersPageData: { text, value, name },
}) => {
    let inputValue = data[value];
    if (inputValue === null) {
        inputValue = '';
    }
    return (
        <td key={data.id + value}>
            <input
                type='text'
                className='form-control users-input'
                value={inputValue}
                placeholder={text}
                onChange={event =>
                    handleUsersTableEvents(data.id, value, event)
                }
            />
        </td>
    );
};

let UsersRights = ({
    data = {},
    handleUsersTableEvents,
    usersPageData: { text, value, name, classChecked, classUnchecked, tooltip },
}) => {
    const checked = data[value];
    const className = checked ? classChecked : classUnchecked;
    return (
        <button
            key={data.id + value}
            className='btn btn-outline-success btn-sm'
            name={name}
            id={data.id}
            onClick={event => handleUsersTableEvents(data.id, value, event)}
            data-toggle='tooltip'
            data-placement='top'
            title={tooltip}
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
