import React, {FC, useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import axios from "axios"
import {Role} from "../../models/role"

export interface UserData {
    first_name: string
    middle_name?: string
    last_name: string
    email: string
    role_id: number
}

interface UserFormProps {
    defaultValues?: UserData
    submit: (data: UserData) => Promise<void>
}

const UserForm: FC<UserFormProps> = ({defaultValues, submit}) => {
    const [roles, setRoles] = useState<Role[]>([])
    const {register, formState:{errors}, handleSubmit, setValue} = useForm<UserData>()

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('roles')
                setRoles(data)
            }
        )()
    }, [])

    useEffect(() => {
        if(!!defaultValues) {
            setValue("first_name", defaultValues.first_name)
            setValue("middle_name", defaultValues.middle_name)
            setValue("last_name", defaultValues.last_name)
            setValue("email", defaultValues.email)
            setValue("role_id", defaultValues.role_id)
        }
    },[defaultValues, setValue])
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="mb-3">
                <label htmlFor="first_name">First Name</label>
                <input id="first_name" className="form-control" placeholder="First Name" {...register('first_name', { required: "First Name is required" })} />
                {errors.first_name && <div>{errors.first_name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="middle_name">Middle Name</label>
                <input id="middle_name" className="form-control" placeholder="Middle Name" {...register('middle_name')} />
                {errors.middle_name && <div>{errors.middle_name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="last_name">Last Name</label>
                <input id="last_name" className="form-control" placeholder="Last Name" {...register('last_name', { required: "Last Name is required" })} />
                {errors.last_name && <div>{errors.last_name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" className="form-control" placeholder="Email" {...register('email', { required: "Email is required" })} />
                {errors.email && <div>{errors.email.message}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="role_id">Role</label>
                <select id="role_id" className="form-control" {...register('role_id', { required: "Role is required" })}>
                    {roles.map((r: Role) => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
            </div>

            <button type="submit" className="btn btn-outline-secondary">Save</button>
        </form>
    )
}
export default UserForm