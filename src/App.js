import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login"
import Main from "./home/Main";
import SignInSide from "./SignInSide";

function App() {
    const [user, setUser] = useState(null)



  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
              {/*<Route path="/" element={<Home user={user} setUser={setUser} />} />*/}
              {/*<Route path="/login" element={<Login setUser={setUser} />} />*/}
              <Route path="/main" element={<Main user={user} setUser={setUser} />} />
              <Route path="/" element={<SignInSide setUser={setUser}/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
