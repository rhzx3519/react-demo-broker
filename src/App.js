import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login"
import Main from "./home/Main";

function App() {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState("")

  useEffect(() => {
    // Fetch the user email and token from local storage
    const localUser = JSON.parse(localStorage.getItem("user"))
    if (!localUser || !localUser.token) {
        setLoggedIn(false)
        setUser(null)
      return
    }

    fetch(`${process.env.REACT_APP_AUTH_SERVER_BASE_URL}/v1/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localUser.token
      },
    }).then(r => {
        if (r.status == 200) {
            setLoggedIn(true)
            setEmail(localUser.email || "")
            setUser(localUser)
            return
        }
    })
  }, [])

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home user={user} setUser={setUser} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/main" element={<Main user={user} setUser={setUser} />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
