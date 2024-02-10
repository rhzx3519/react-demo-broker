import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Home/Main";
import SignInSide from "./SignInSide";
import Blog from "./Blog/Blog";
import Facebook from "./facebook/Facebook";
import Gallery from "./gallery/Gallery";
import Home from "./pages/Home";
import SearchAppBar from "./components/AppBar";

function App() {
    const [user, setUser] = useState(null)


  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/signin" element={<SignInSide setUser={setUser}/>} />
              <Route path="/main" element={<Main user={user} setUser={setUser} />} />
              {/*<Route path='/home' element={<Home />} />*/}
              <Route path='/blog' element={<Blog />} />
              <Route path='/facebook' element={<Facebook />} />
              {/*<Route path='/' element={<Gallery user={user} setUser={setUser} />} />*/}
              <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
