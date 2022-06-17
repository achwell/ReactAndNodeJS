import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"

interface LoginData {
    email: string
    password: string
}
const Login = () => {
    const [redirect, setRedirect] = useState(false)
    let navigate = useNavigate()
    const {register, formState:{errors}, handleSubmit} = useForm<LoginData>()

    const submit = async (data: LoginData) => {
        await axios.post('login', data);
        setRedirect(true)
    }

    if(redirect) {
        navigate("/")
    }

    return (
        <main className="form-signin">
            <form onSubmit={handleSubmit(submit)}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <input id="email" type="email" className="form-control" placeholder="Email" {...register('email', { required: "Email is required" })} />
                {errors.email && <div>{errors.email.message}</div>}

                <input id="password" type="password" className="form-control" placeholder="Password" {...register('password', { required: "Password is required" })} />
                {errors.password && <div>{errors.password.message}</div>}

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    )
}

export default Login