import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import '../Login.scss'

interface RegisterData {
    first_name: string
    middle_name?: string
    last_name: string
    email: string
    password: string
    password_confirm: string
}

const Register = () => {
    let navigate = useNavigate()
    const {register, formState:{errors}, handleSubmit} = useForm<RegisterData>()

    const submit = async (data: RegisterData) => {
        await axios.post('register', data);
        navigate("/login")
    }

    return (
        <main className="form-signin">
            <form onSubmit={handleSubmit(submit)}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <input id="first_name" className="form-control" placeholder="First Name" {...register('first_name', { required: "First Name is required" })} />
                {errors.first_name && <div>{errors.first_name.message}</div>}

                <input id="middle_name" className="form-control" placeholder="Middle Name" {...register('middle_name')} />
                {errors.middle_name && <div>{errors.middle_name.message}</div>}

                <input id="last_name" className="form-control" placeholder="Last Name" {...register('last_name', { required: "Last Name is required" })} />
                {errors.last_name && <div>{errors.last_name.message}</div>}

                <input id="email" type="email" className="form-control" placeholder="Email" {...register('email', { required: "Email is required" })} />
                {errors.email && <div>{errors.email.message}</div>}

                <input id="password" type="password" className="form-control" placeholder="Password" {...register('password', { required: "Password is required" })} />
                {errors.password && <div>{errors.password.message}</div>}

                <input id="password_confirm" type="password" className="form-control" placeholder="Password Confirm" {...register('password_confirm', { required: "Password Confirm is required" })} />
                {errors.password_confirm && <div>{errors.password_confirm.message}</div>}

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    )
}
export default Register