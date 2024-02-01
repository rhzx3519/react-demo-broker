import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./app/userSlice";

const Home = (props) => {
    const { user } = props
    const navigate = useNavigate()

    const onButtonClick = () => {
        if (user) {
            localStorage.removeItem('user')
            props.setUser(null)
        } else {
            navigate('/login')
        }
    }


    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
        </div>
        <div className={"buttonContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={user ? "Log out" : "Log in"}/>
            {user &&
                <div>
                    Your email address is {user.email}
                </div>}
        </div>
    </div>
}

export default Home