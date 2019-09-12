import React from 'react';

class DropdownFormInput extends React.PureComponent {
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
                    className='form-control'
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

class DropDownPasswordCheck extends React.PureComponent {
    handleClick = () => {
        this.props.showPasswordClick();
    };

    render() {
        const { showpassword } = this.props;
        return (
            <div className='form-check'>
                <input
                    type='checkbox'
                    className='form-check-input'
                    id='dropdownCheck'
                    onClick={this.handleClick}
                ></input>
                <label className='form-check-label' htmlFor='dropdownCheck'>
                    {showpassword}
                </label>
            </div>
        );
    }
}

class DropDownRememberCheck extends React.PureComponent {
    render() {
        const {
            handleRememberChecked,
            isRememberChecked,
            remember,
        } = this.props;
        return (
            <div className='form-check'>
                <input
                    type='checkbox'
                    className='form-check-input'
                    id='rememberCheck'
                    onChange={handleRememberChecked}
                    value=''
                    checked={isRememberChecked}
                ></input>
                <label className='form-check-label' htmlFor='rememberCheck'>
                    {remember}
                </label>
            </div>
        );
    }
}

export {
    DropDownRememberCheck,
    DropDownPasswordCheck,
    DropdownFormInput,
};
