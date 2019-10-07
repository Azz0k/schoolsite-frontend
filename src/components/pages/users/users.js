import React, { useEffect } from 'react';
import { PagesAwesomeButton, PagesInput } from './pages-awesome-button';
import { WithSchoolSiteService } from '../../hoc';
import { connect } from 'react-redux';
import { fetchUsers, addUser, applyUsers, deleteUser } from '../../../actions';
import ModalChangePassword from './modal-change-password';

const Users = ({
    users,
    pagesData,
    fetchUsers,
    addUser,
    applyUsers,
    deleteUser,
}) => {
    useEffect(() => {
        const $ = window.$;
        $(function() {
            $('[data-toggle="tooltip"]').tooltip();
        });
    });
    const rows = users.value
        .filter(data => data.deleted === 0)
        .map(data => {
            return (
                <tr key={data.id}>
                    <td>
                        <PagesInput
                            data={data}
                            needValidation={true}
                            errorFound={users.errorFound}
                            wrongId={users.wrongId}
                            pagesData={pagesData['userName']}
                        />
                    </td>
                    <td>
                        <PagesInput
                            data={data}
                            pagesData={pagesData['firstName']}
                        />
                    </td>
                    <td>
                        <PagesInput
                            data={data}
                            pagesData={pagesData['lastName']}
                        />
                    </td>
                    <td>
                        <PagesInput
                            data={data}
                            pagesData={pagesData['email']}
                        />
                    </td>
                    <td>
                        <PagesInput
                            data={data}
                            pagesData={pagesData['description']}
                        />
                    </td>
                    <td>
                        <PagesAwesomeButton
                            data={data}
                            pagesData={pagesData['canConfigure']}
                        />
                        <PagesAwesomeButton
                            data={data}
                            pagesData={pagesData['canChangeUsers']}
                        />
                        <PagesAwesomeButton
                            data={data}
                            pagesData={pagesData['canChangeMenu']}
                        />
                        <PagesAwesomeButton
                            data={data}
                            pagesData={pagesData['canChangeMaterials']}
                        />
                    </td>
                    <td>
                        <PagesAwesomeButton
                            data={data}
                            pagesData={pagesData['enabled']}
                        />
                        <PagesAwesomeButton
                            data={data}
                            pagesData={pagesData['deleteUser']}
                            handleClick={() => deleteUser(data.id)}
                        />
                        <PagesAwesomeButton
                            data={data}
                            pagesData={pagesData['changePassword']}
                            dataToggle='modal'
                            dataTarget={'#modalChangePassword' + data.id}
                        />
                        <ModalChangePassword id={data.id} />
                    </td>
                </tr>
            );
        });
    return (
        <React.Fragment>
            <table className='table table-borderless table-hover w-auto table-responsive'>
                <thead>
                    <tr>
                        <th scope='col'>Имя пользователя</th>
                        <th scope='col'>Фамилия</th>
                        <th scope='col'>Имя</th>
                        <th scope='col'>E-mail</th>
                        <th scope='col'>Комментарий</th>
                        <th scope='col'>Может изменять</th>
                        <th scope='col'>Действия</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            <div className='d-flex justify-content-center'>
                <PagesAwesomeButton
                    pagesData={pagesData['addUser']}
                    handleClick={addUser}
                />
                <PagesAwesomeButton
                    pagesData={pagesData['apply']}
                    handleClick={() => applyUsers(users)}
                    disabled={!users.canApply}
                />
                <PagesAwesomeButton
                    pagesData={pagesData['revert']}
                    handleClick={fetchUsers}
                    disabled={!users.canRevert}
                />
            </div>
        </React.Fragment>
    );
};

const mapDispatchToUsersProps = (dispatch, { schoolSiteService }) => {
    return {
        fetchUsers: fetchUsers(schoolSiteService, dispatch),
        addUser: () => {
            dispatch(addUser());
        },
        applyUsers: applyUsers(schoolSiteService, dispatch),
        deleteUser: id => {
            dispatch(deleteUser(id));
        },
    };
};

export default WithSchoolSiteService(
    connect(
        null,
        mapDispatchToUsersProps,
    )(Users),
);
