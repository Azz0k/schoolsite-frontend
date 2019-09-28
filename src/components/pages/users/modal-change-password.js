import React, { useState } from 'react';
import { DropDownFormInput } from '../../navbar/drop-down-auth-menu-items';
import { WithSchoolSiteService } from '../../hoc';

const ModalChangePassword = ({ id, schoolSiteService }) => {
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [validation, setValidation] = useState('');
    const modalId = 'modalChangePassword' + id;
    const nameNewPassword = 'newPassword' + id;
    const nameRepeatNewPassword = 'repeatNewPassword' + id;
    const handleClick = () => {
        if (newPassword.length > 0 && newPassword === repeatNewPassword) {
            schoolSiteService
                .changePassword(newPassword, id)
                .then(() => {
                    setNewPassword('');
                    setRepeatNewPassword('');
                    window.$('#' + modalId).modal('hide');
                })
                .catch(() => {
                    setValidation('Ошибка');
                });
        } else {
            setValidation('Пароли не совпадают');
        }
    };
    return (
        <div
            className='modal fade'
            key={id}
            id={modalId}
            tabIndex='-1'
            role='dialog'
            aria-labelledby='exampleModalCenterTitle'
            aria-hidden='true'
        >
            <div className='modal-dialog modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                            aria-label='Close'
                        >
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
                    <div className='modal-body'>
                        <DropDownFormInput
                            type='password'
                            textLabel='Новый пароль'
                            name={nameNewPassword}
                            handlerChange={event =>
                                setNewPassword(event.target.value)
                            }
                            value={newPassword}
                            placeholder=''
                            validation=''
                        />
                        <DropDownFormInput
                            type='password'
                            textLabel='подтверждение пароля'
                            name={nameRepeatNewPassword}
                            value={repeatNewPassword}
                            handlerChange={event =>
                                setRepeatNewPassword(event.target.value)
                            }
                            placeholder=''
                            validation={validation}
                        />
                    </div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            data-dismiss='modal'
                        >
                            Закрыть
                        </button>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={handleClick}
                        >
                            Изменить пароль
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithSchoolSiteService(ModalChangePassword);
