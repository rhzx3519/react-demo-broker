import React from "react";
import './Header.css'
import gLogo from '../../Assets/Images/g_logo.png'
import searchIcon from '../../Assets/Images/free-search-icon-2903-thumb.png'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = (props) => {
    const { user, setUser } = props
    const navigate = useNavigate()

    const onButtonClick = () => {
        if (user) {
            localStorage.removeItem('user')
            setUser(null)
            navigate('/login')
        }
    }

   return <div className="header">
       <div className="left">
           <img src={gLogo} className="App-logo"/>
           BROKER
       </div>
       <div id="mid">
           <div>HOME</div>
           <div>QUOTE</div>
           <div>NEWS</div>
           <div>SELECTED</div>
           <div>
               <input type="text" className="searchInput" placeholder="search" />
               <img src={searchIcon} className="searchIcon"/>
           </div>
       </div>
       <div className="right">
           {user && <a href="_blank">{user.nickname}</a>}
           {user && <label onClick={onButtonClick}>Logout</label>}
       </div>
   </div>
}

export default Header