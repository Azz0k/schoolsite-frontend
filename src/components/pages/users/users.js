import React, { useEffect } from 'react';
import { UsersRights, UsersCell } from './users-rights';
import { WithSchoolSiteService } from '../../hoc';
import { connect } from 'react-redux';
import { fetchUsers, addUser, applyUsers, deleteUser } from '../../../actions';
import ModalChangePassword from './modal-change-password';

const Users = ({
    users,
    usersPageData,
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
                    <UsersCell
                        data={data}
                        needValidation={true}
                        errorFound={users.errorFound}
                        wrongId={users.wrongId}
                        usersPageData={usersPageData['userName']}
                    />
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['firstName']}
                    />
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['lastName']}
                    />
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['email']}
                    />
                    <UsersCell
                        data={data}
                        usersPageData={usersPageData['description']}
                    />
                    <td>
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['canConfigure']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['canChangeUsers']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['canChangeMenu']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['canChangeMaterials']}
                        />
                    </td>
                    <td>
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['enabled']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['deleteUser']}
                            handleClick={() => deleteUser(data.id)}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['changePassword']}
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
                <UsersRights
                    usersPageData={usersPageData['addUser']}
                    handleClick={addUser}
                />
                <UsersRights
                    usersPageData={usersPageData['apply']}
                    handleClick={() => applyUsers(users)}
                    disabled={!users.canApply}
                />
                <UsersRights
                    usersPageData={usersPageData['revert']}
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
