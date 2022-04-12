import React, { useState, useEffect } from "react";
import Select from 'react-select';
import RolesService from "../../services/roles.service";
import UserService from "../../services/user.service";
import Loader from '../Loader/loader.component';

import './users.component.scss';

const RolesSelect = ({ user }) => {

    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let [selectedValues,setSelectedValues] = useState(user.roles.map(role => {return {id:role.id,name:role.name,label:role.name,value:role.name};}));

    useEffect(() => {
        retrieveRoles();
    }, []);

    const retrieveRoles = () => {
        setIsLoading(true);
        RolesService.getAllRoles()
            .then((response) => {
                setRoles(response.data);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            });
    };

    const updateUser = () => {
        setIsLoading(true);
        UserService.update(user)
            .then(() => {
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            });
    };

    

    const handleChangeRoles = (user, selectedRoles) => {
        user.roles = selectedRoles;
        setSelectedValues(selectedRoles);
        updateUser();
    }

    return (
        <div>
            {isLoading && (<Loader />)}
            <Select
                className="dropdown"
                placeholder="Select Option"
                options={roles.map(role => {return {id:role.id,name:role.name,label:role.name,value:role.name};})}
                value={selectedValues}
                onChange={(e) => handleChangeRoles(user, e)}
                isMulti={true}
                isClearable
            />
        </div>
    );
};

export default RolesSelect;