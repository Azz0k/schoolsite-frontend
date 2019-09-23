import React, { useEffect } from 'react';
import { UsersRights, UsersCell } from './users-rights';

const Users = ({ users, usersPageData }) => {
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
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['changePassword']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['apply']}
                        />
                        <UsersRights
                            data={data}
                            usersPageData={usersPageData['revert']}
                        />
                    </td>
                </tr>
            );
        });
    return (
        <table className='table table-bordered table-hover w-auto table-responsive'>
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
    );
};

export default Users;
