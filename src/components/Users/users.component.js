import React, { useState, useEffect, useMemo, useRef } from "react";
import UserService from "../../services/user.service";
import { useTable } from "react-table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Trans } from 'react-i18next';
import { useTranslation } from "react-i18next";
import '../../i18n.js';

import Loader from '../Loader/loader.component';

import './users.component.scss';

const UsersList = (props) => {
    const [users, setUsers] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const usersRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    usersRef.current = users;

    useEffect(() => {
        retrieveUsers();
    }, []);

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveUsers = () => {
        setIsLoading(true);
        UserService.getAllUsers()
            .then((response) => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            });
    };

    const refreshList = () => {
        retrieveUsers();
    };

    const removeAllUsers = () => {
        setIsLoading(true);
        UserService.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByName = () => {
        setIsLoading(true);
        UserService.findByName(searchTitle)
            .then((response) => {
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            });
    };

    const deleteUser = (rowIndex) => {
        const id = usersRef.current[rowIndex].id;
        setIsLoading(true);
        UserService.delete(id)
            .then((response) => {

                let newusers = [...usersRef.current];
                newusers.splice(rowIndex, 1);
                setUsers(newusers);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            });
    };
    
    const columns = useMemo(
        () => [
            {
                Header: <Trans i18nKey="label.id"/>,
                accessor: "id",
            },
            {
                Header: <Trans i18nKey="label.username"/>,
                accessor: "username",
            },
            {
                Header: <Trans i18nKey="label.authorities"/>,
                accessor: "roles",
                Cell: (props) => {
                    return props.value.map(item => item.name).join(',');
                },
            },
            {
                Header: <Trans i18nKey="label.actions"/>,
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div className="actions">
                            <button type="button" className="btn btn-primary button" onClick={() => deleteUser(rowIdx)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: users,
    });

    return (
        <div className="list row">
            {isLoading && (<Loader />)}
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('placehoder.searchByName')}
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            {t('input.search')}
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <table
                    className="table table-striped table-bordered"
                    {...getTableProps()}
                >
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="col-md-8">
                <button className="btn btn-sm btn-danger" onClick={removeAllUsers}>
                {t('input.deleteAll')}
                </button>
            </div>
        </div>
    );
};

export default UsersList;