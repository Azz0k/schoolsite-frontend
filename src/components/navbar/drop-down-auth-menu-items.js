import React from 'react';

class DropDownFormInput extends React.PureComponent {
    render() {
        const {
            type,
            textLabel = '',
            name,
            handlerChange = () => {},
            placeholder = '',
            validation = '',
        } = this.props;
        const isVisibleLabel = textLabel ? true : false;
        return (
            <div className='form-group'>
                {isVisibleLabel && <label htmlFor={name}>{textLabel} </label>}
                <input
                    type={type}
                    className='form-control is-invalid'
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onChange={event => handlerChange(event)}
                ></input>
                <div className='invalid-feedback'>{validation}</div>
            </div>
        );
    }
}

class DropDownFormCheck extends React.PureComponent {
    render() {
        const {
            handleChecked = () => {},
            isChecked = false,
            textLabel = '',
            value = '',
            name,
        } = this.props;
        return (
            <div className='form-check'>
                <input
                    type='checkbox'
                    className='form-check-input'
                    id={name}
                    onChange={handleChecked}
                    value={value}
                    checked={isChecked}
                ></input>
                <label className='form-check-label' htmlFor={name}>
                    {textLabel}
                </label>
            </div>
        );
    }
}

export { DropDownFormCheck, DropDownFormInput };
