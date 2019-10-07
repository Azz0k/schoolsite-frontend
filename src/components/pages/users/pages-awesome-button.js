import React from 'react';
import { handleUsersTableEvents } from '../../../actions';
import { connect } from 'react-redux';

let PagesInput = ({
    data = {},
    handleUsersTableEvents,
    handleClick = handleUsersTableEvents,
    needValidation = false,
    errorFound = false,
    wrongId = null,
    pagesData: { text, value, validation = '' },
    borderless = false,
    disabled = false,
}) => {
    let inputValue = data[value];
    if (inputValue === null) {
        inputValue = '';
    }
    let textValidation = '';
    let className = 'form-control pages-input';
    if (borderless) className += ' pages-borderless';
    if (errorFound && needValidation && data.id === wrongId) {
        className += ' is-invalid';
        textValidation = validation;
    }
    return (
        <React.Fragment>
            <input
                type='text'
                className={className}
                value={inputValue}
                placeholder={text}
                onChange={event => handleClick(data.id, value, event)}
                disabled={disabled}
            />
            {needValidation && <div className='invalid-feedback'>{textValidation}</div>}
        </React.Fragment>
    );
};

const turnOffTooltip = id => {
    const $ = window.$;
    $('#' + id).tooltip('hide');
};

let PagesAwesomeButton = ({
    data = {},
    dataToggle = 'tooltip',
    dataTarget = '',
    handleUsersTableEvents,
    handleClick = handleUsersTableEvents,
    disabled = false,
    pagesData: { text, value, name, classChecked, classUnchecked, tooltip },
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
            data-toggle={dataToggle}
            data-target={dataTarget}
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

PagesAwesomeButton = connect(
    null,
    mapDispatchToUsersRightsProps,
)(PagesAwesomeButton);
PagesInput = connect(
    null,
    mapDispatchToUsersRightsProps,
)(PagesInput);
export { PagesAwesomeButton, PagesInput };
