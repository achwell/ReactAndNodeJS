import React from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import Wrapper from "../../components/Wrapper"
import RoleForm, {RoleData} from "./RoleForm"

const RoleCreate = () => {
    let navigate = useNavigate()

    const submit = async (data: RoleData) => {
        data.permissions = data.permissions.filter(value => !!value)
        await axios.post('roles', data)
        navigate("/roles")
    }

    return (
        <Wrapper>
            <RoleForm defaultValues={{
                name: "",
                permissions: []
            }} submit={submit}/>
        </Wrapper>
    );
};

export default RoleCreate;