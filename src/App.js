import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login"
import Main from "./home/Main";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }

    fetch(`${process.env.REACT_APP_AUTH_SERVER_BASE_URL}/v1/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
      },
    }).then(r => {
        if (r.status == 200) {
            setLoggedIn(true)
            setEmail(user.email || "")
            return
        }
    })
  }, [])

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
              <Route path="/main" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
