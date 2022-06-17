import {Dispatch, FC, ReactNode, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {connect} from "react-redux"
import axios from "axios"
import Menu from "./Menu"
import Nav from "./Nav"
import {User} from "../models/user"
import {setUser} from "../redux/actions/setUserAction"

type WraperProps = {
    setUser: (u: User) => void
    children: ReactNode
}

const Wrapper:FC<WraperProps> = ({children, setUser}) => {

    let navigate = useNavigate()

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get("user")
                    setUser(new User(data.id, data.first_name, data.middle_name, data.last_name, data.email, data.role))
                } catch (e) {
                    navigate("/login")
                }
            }
        )()
    }, [])
    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu/>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
