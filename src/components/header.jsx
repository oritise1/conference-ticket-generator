import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.svg";
import LogoText from "../assets/logoText.svg";
import Forward from "../assets/forwardArrow.svg";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleHome = () =>{
    navigate("/");
  }
  return (
    <div className="headerWrapper">
      <header className="header">
        <div className="logo" onClick={handleHome}>
          <img src={Logo} alt="Componay Logo" />
          <img src={LogoText} alt="Componay Logo Text" />
          {/* <span>ticz</span> */}
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-tickets" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                My Tickets
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-project" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                About Project
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/my-tickets">
        <button className="btnHeader">
          <span>MY TICKETS</span>
          <img src={Forward} alt="forward arrow" />
        </button>
        </NavLink>
      </header>
    </div>
  );
};

export default Header;
