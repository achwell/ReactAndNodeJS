import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios'
import Wrapper from "../../components/Wrapper"
import RoleForm, {RoleData} from "./RoleForm"

const RoleEdit = () => {
    const [defaultValues, setDefaultValues] = useState<RoleData>()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`roles/${id}`);
                setDefaultValues({
                    name: data.name,
                    permissions: data.permissions
                })
            }
        )()
    }, [id])

    const submit = async (data: RoleData) => {
        await axios.put(`roles/${id}`, data);
        navigate("/roles")
    }

    return (
        <Wrapper>
            <RoleForm defaultValues={defaultValues} submit={submit}/>
        </Wrapper>
    );
};

export default RoleEdit;