import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Home/Main";
import SignInSide from "./broker/SignInSide";
import Blog from "./Blog/Blog";
import Facebook from "./facebook/Facebook";
import Gallery from "./gallery/Gallery";
import Home from "./pages/Home";
import SearchAppBar from "./components/AppBar";
import Broker from "./broker/Broker";
import Chatroom from "./chat/Chatroom";

function App() {
    const [user, setUser] = useState(null)

  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/signin" element={<SignInSide setUser={setUser}/>} />
              <Route path="/main" element={<Main user={user} setUser={setUser} />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/facebook' element={<Facebook />} />
              <Route path='/brok' element={<Broker user={user} setUser={setUser}/>} />
              <Route path='/chatroom' element={<Chatroom user={user} setUser={setUser}/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
