import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Home/Main";
import Home from "./Home/Home";
import SignInSide from "./SignInSide";

function App() {
    const [user, setUser] = useState(null)



  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<SignInSide setUser={setUser}/>} />
              <Route path="/main" element={<Main user={user} setUser={setUser} />} />
              <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
