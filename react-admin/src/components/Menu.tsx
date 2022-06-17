import React from "react"
import {NavLink} from "react-router-dom";

const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className={({isActive}) => (isActive ? "nav-link active" : "nav-link")} to="/">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/users" className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            Users
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/roles" className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            Roles
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/products" className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            Projects
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/orders" className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}>
                            Orders
                        </NavLink>
                    </li>
                </ul>

            </div>
        </nav>
    )
}
export default Menu