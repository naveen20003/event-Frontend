import React from 'react';
import { RouterProvider } from "react-router-dom";
import AppRouter from "../router/router";








{/*function Layout() {
    const location = useLocation();

    const hideHeader = 
    location.pathname === '/login' || 
    location.pathname ==='/register' || 
    location.pathname === '/dashboard' ||
    location.pathname === '/createvent' ||
    location.pathname === '/eventmanagment' ||
    location.pathname === '/taskmanagment' ||
    location.pathname === '/guestmanagment' ||
    location.pathname === '/budgeting' ||
    location.pathname === '/share' ||
    location.pathname === '/createguest' ||
    location.pathname === '/createtask' ||
    location.pathname === '/createbudget' ||
    location.pathname.startsWith('/editevent/') ||
    location.pathname.startsWith('/editguest/') ||
    location.pathname.startsWith('/edittask/') ||
    location.pathname.startsWith('/editbudget/');
*/}



function App() {
      return <RouterProvider router={AppRouter} />;
       
   }

export default App;



