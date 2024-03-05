import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./deprecated/brokerdraft/Main";
import SignInSide from "./broker/SignInSide";
import Blog from "./examples/Blog/Blog";
import Facebook from "./examples/facebook/Facebook";
import Home from "./home/Home";
import Broker from "./broker/Broker";
import Discord from "./discord/Discord";
import { Verify } from "./API/AuthAPI";
import Dashboard from "./dashboard/Dashboard";

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Fetch the user email and token from local storage
        const localUser = JSON.parse(localStorage.getItem("user"))
        if (!localUser || !localUser.token) {
            setUser(null)
            return
        }

        (async function(){
            const status= await Verify(localUser.token)
            if (status === 200) {
                setUser(localUser)
                return
            }
        })()

    }, [])

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home user={user} setUser={setUser} />} />
              <Route path="/signin" element={<SignInSide setUser={setUser}/>} />
              <Route path="/main" element={<Main user={user} setUser={setUser} />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/facebook' element={<Facebook />} />
              <Route path='/brok' element={<Broker user={user} setUser={setUser}/>} />
              <Route path='/chatroom' element={<Discord user={user} setUser={setUser}/>} />
              <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
