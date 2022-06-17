import React from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import Wrapper from "../../components/Wrapper"
import UserForm, {UserData} from "./UserForm"

const UserCreate = () => {
    let navigate = useNavigate()

    const submit = async (data: UserData) => {
        await axios.post('users', data);
        navigate("/users")
    }

    return (
        <Wrapper>
            <UserForm defaultValues={{
                first_name: "",
                middle_name: "",
                last_name: "",
                email: "",
                role_id: 0
            }} submit={submit}/>
        </Wrapper>
    );
};

export default UserCreate;