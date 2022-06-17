import React from "react";
import {useForm} from "react-hook-form"
import axios from "axios"

interface UserData {
    password: string
    password_confirm: string
}

const ChangePasswordForm = () => {
    const {register, formState: {errors}, handleSubmit} = useForm<UserData>()

    const submit = async (userData: UserData) => {
        await axios.put('users/password', userData)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="form-control"
                       placeholder="Password" {...register('password', {required: "Password is required"})} />
                {errors.password && <div>{errors.password.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="password_confirm">Password Confirm</label>
                <input id="password_confirm" type="password" className="form-control"
                       placeholder="Password Confirm" {...register('password_confirm', {required: "Password Confirm is required"})} />
                {errors.password_confirm && <div>{errors.password_confirm.message}</div>}
            </div>
            <button className="btn btn-outline-secondary">Save</button>
        </form>
    )
}
export default ChangePasswordForm