import React, { useState } from 'react'
import HeaderBar from "../layout/nav";
import { Outlet, useLocation } from "react-router-dom"
import AiChatSupport from '../layout/AiChatBot/pages/aichatbot';


function AppLayout() {
const location = useLocation();

  return (
    <>
     <HeaderBar />
     <Outlet />
     {!location.pathname.startsWith('/support') &&
     <AiChatSupport /> }
    </>
  )
}

export default AppLayout;