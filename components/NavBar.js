import React, { useState, useContext } from "react";
import Link from "next/link";
// import styled from "styled-components";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SideBarData } from "./SideBarData";
// import { IconContext } from "react-icons/lib";
import SubMenu from "./SubMenu";
// import Sidebar from "./Sidebar";
import { AuthContext } from '../context/auth';


export default function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useContext(AuthContext);

  const showSidebar = () => {
  if (user)
    {setSidebar(!sidebar)}
  };

  return (
    <>
      {/* <IconContext.Provider value={{color:"red"}} > */}

      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand abs" >
            <FaIcons.FaBars onClick={showSidebar} />
          </a>
          <div className="navbar-collapse collapse" id="collapseNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link active">Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/login">
                  <a className="nav-link active" >
                    Login
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/Signup">
                  <a className="nav-link active">
                    Sign Up
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" >
          <li className="navbar-toggle" >
            <Link href="/" >
              <a className="menu-bars">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </a>
            </Link>
          </li>
          {SideBarData.map((item, index) => {
            return (
              <ul key={index} >
              <li className={item.cName} >
                <SubMenu item={item} />
              </li>
              </ul>
              //   <li key={index} className={item.cName}>
              //     <Link href={item.path}>
              //       <a href="#">
              //         {item.icon}
              //         <span>{item.title}</span>
              //       </a>
              //     </Link>

              //   </li>
            );
          })}
        </ul>
      </nav>
      {/* </IconContext.Provider> */}
    </>
  );
}
