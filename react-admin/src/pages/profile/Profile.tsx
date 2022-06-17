import React, {Dispatch, FC} from "react"
import {connect} from "react-redux"
import Wrapper from "../../components/Wrapper"
import AccountInformationForm from "./AccountInformationForm"
import ChangePasswordForm from "./ChangePasswordForm"
import {User} from "../../models/user"
import {setUser} from "../../redux/actions/setUserAction"

interface ProfileProps {
    user: User
    setUser: (u: User) => void
}

const Profile: FC<ProfileProps> = ({user, setUser}) => {

    return (
        <Wrapper>
            <h3>Account Information</h3>
            <AccountInformationForm user={user} setUser={setUser}/>
            <h3 className="mt-4">Change Password</h3>
            <ChangePasswordForm/>
        </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)