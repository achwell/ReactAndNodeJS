import React, {FC} from "react"
import {connect} from "react-redux"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import {User} from "../models/user";

interface NavProps {
    user: User
}

const Nav: FC<NavProps> = ({user}) => {
    let navigate = useNavigate()

    const logout = async () => {
        await axios.post('logout', {})
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#/">Company name</a>
            <ul className="my-2 my-md-0 mr-md-3">
                {user.id &&
                    <li><Link to="/profile" className="p-2 text-white text-decoration-none">{user.name}</Link></li>}
                {user.id &&
                    <li><a tabIndex={0} className="p-2 text-white text-decoration-none" onClick={logout}>Sign out</a>
                    </li>}
                {!user.id && <li><Link to="/login" className="p-2 text-white text-decoration-none">Sign in</Link></li>}
            </ul>
        </nav>
    )
}
const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Nav)