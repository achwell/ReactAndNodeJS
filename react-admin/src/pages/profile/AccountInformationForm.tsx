import React, {FC, useEffect} from "react"
import {useForm} from "react-hook-form"
import axios from "axios"
import {UserData} from "../users/UserForm"
import {User} from "../../models/user"


interface AccountInformationFormProps {
    user: User
    setUser: (u: User) => void
}

const AccountInformationForm: FC<AccountInformationFormProps> = ({user, setUser}) => {

    const {register, formState: {errors}, handleSubmit, setValue} = useForm<UserData>()

    useEffect(() => {
        setValue("first_name", user.first_name)
        setValue("middle_name", user.middle_name)
        setValue("last_name", user.last_name)
        setValue("email", user.email)
        setValue("role_id", user.role.id)
    }, [user, setValue])

    const submit = async (userData: UserData) => {
        const {data} = await axios.put('users/info', {
            "first_name": userData.first_name,
            "middle_name": userData.middle_name,
            "last_name": userData.last_name,
            "email": userData.email,
            "role": {id: userData.role_id}
        })
        const newUser = {...user, ...data}
        setUser(new User(newUser.id, newUser.first_name, newUser.middle_name, newUser.last_name, newUser.email, newUser.role))
        setValue("first_name", data.first_name)
        setValue("middle_name", data.middle_name)
        setValue("last_name", data.last_name)
        setValue("email", data.email)
        setValue("role_id", newUser.role.id)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="mb-3">
                <label htmlFor="first_name">First Name</label>
                <input id="first_name" className="form-control"
                       placeholder="First Name" {...register('first_name', {required: "First Name is required"})} />
                {errors.first_name && <div>{errors.first_name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="middle_name">Middle Name</label>
                <input id="middle_name" className="form-control"
                       placeholder="Middle Name" {...register('middle_name')} />
                {errors.middle_name && <div>{errors.middle_name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="last_name">Last Name</label>
                <input id="last_name" className="form-control"
                       placeholder="Last Name" {...register('last_name', {required: "Last Name is required"})} />
                {errors.last_name && <div>{errors.last_name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" className="form-control"
                       placeholder="Email" {...register('email', {required: "Email is required"})} />
                {errors.email && <div>{errors.email.message}</div>}
            </div>
            <button className="btn btn-outline-secondary">Save</button>
        </form>
    )
}
export default AccountInformationForm