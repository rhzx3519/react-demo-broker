import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./app/userSlice";
import User from "./entity/User";

const Login = (props) => {
    const [ email, setEmail ] = useState("admin@gmail.com")
    const [ password, setPassword ] = useState("123456")
    const [ emailError, setEmailError ] = useState("");
    const [ passwordError, setPasswordError ] = useState("")

    const navigate = useNavigate()

    function loginCall() {
        fetch(`${process.env.REACT_APP_AUTH_SERVER_BASE_URL}/v1/login`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        }).then(r => {
                if (r.status != 200) {
                    window.alert(r.status)
                    return
                }
                return r.json()
            })
            .then(r => {
                localStorage.setItem("user", JSON.stringify(r.data))
                props.setUser(r.data)

                navigate("/main")
            })
    }

    const onButtonClick = () => {
        setEmailError("")
        setPasswordError("")

        // Validation code
        if (email == "") {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email!")
            return
        }

        if ("" == password) {
            setPasswordError("Please enter your password")
            return
        }

        if (password.length < 6) {
            setPasswordError("The password must be 6 characters or longer")
            return
        }

        // Authentication calls
        loginCall()
    }


    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />

        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder={"Enter your email here"}
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"}
            />
            <label className={"errorLabel"}>{emailError}</label>
        </div>
        <br />

        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder={"Enter your password here"}
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"}
            />
            <label className={"errorLabel"}>{passwordError}</label>
        </div>
        <br />

        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type={"button"}
                onClick={onButtonClick}
                value={"Log in"}
            />
        </div>
    </div>
}

export default Login;