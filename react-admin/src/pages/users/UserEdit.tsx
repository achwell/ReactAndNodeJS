import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios'
import Wrapper from "../../components/Wrapper"
import UserForm, {UserData} from "./UserForm"

const UserEdit = () => {
    const [defaultValues, setDefaultValues] = useState<UserData>()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`users/${id}`);
                setDefaultValues({
                    first_name: data.first_name,
                    middle_name: data.middle_name,
                    last_name: data.last_name,
                    email: data.email,
                    role_id: data.role.id
                })
            }
        )()
    }, [id])

    const submit = async (data: UserData) => {
        await axios.put(`users/${id}`, data);
        navigate("/users")
    }

    return (
        <Wrapper>
            <UserForm defaultValues={defaultValues} submit={submit}/>
        </Wrapper>
    );
};

export default UserEdit;