import React from 'react'
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/applayout";
import AdminLayout from "../components/layout/adminlayout";
import ProtectedRoute from "../components/ui/protectedroute";

import  Contact  from "../pages/contact";
import  Home  from "../pages/home";
import  NotFound  from "../pages/notfound";
import Login from '../pages/login'
import Register from '../pages/register'

import Dashboard from "../features/dashboard/pages/dashboard";
import EventManagment from "../features/events/pages/EventManagment";
import TaskManagment from "../features/tasks/pages/TaskManagment";
import GuestManagment from "../features/guests/pages/guest-managment";
import Budgeting from "../features/budget/pages/Budegting";
import Share from "../features/share/pages/share";
import CreatGuest from '../features/guests/pages/create-guest';
import CreateEvent from '../features/events/pages/create-event';
import CreatTask from '../features/tasks/pages/create-task';
import CreatBudget from '../features/budget/pages/create-budget';
import EditEvent from '../features/events/pages/editevent';
import EditGuest from '../features/guests/pages/editguest';
import EditTask from '../features/tasks/pages/edittask';
import EditBudget from '../features/budget/pages/editbudget';
import InviteGuest from '../features/share/pages/inviteguest';
import Venue from '../features/venue/venue';
import SupportPage from '@/components/layout/AiChatBot/pages/supportpage';
import Profile from '@/features/dashboard/pages/profile';

  
     
 const AppRouter = createBrowserRouter([
    {
      element: <AppLayout/>,
         children:[
             { path: "/", element: <Home /> },
             { path: "/contact", element: <Contact /> },
             { path: "/login", element: <Login /> },
             { path: "/register", element: <Register /> },
             { path: "/support", element: <SupportPage /> }
                
          ]
    }, 
      { 
        element: 
                <ProtectedRoute>
                <AdminLayout/>
                </ProtectedRoute>,
        children:[
            {
                path: '/dashboard', 
                element: 
                    <Dashboard /> 
                },
            {path:
                 '/eventmanagment', 
                 element:
                 <EventManagment />
                },
            {path: 
                '/taskmanagment', 
                element:
                <TaskManagment />
            },
            {path: 
                '/guestmanagment', 
                element:
                 <GuestManagment />
            },
            {path: 
                '/budgeting', 
                element:
                 <Budgeting />
            },
            {path: 
                '/createevent', 
                element:
                 <CreateEvent />
            },
            {path: 
                '/editevent/:id', 
                element:
                 <EditEvent />
            },
            {path: 
                '/createtask', 
                element:
                 <CreatTask />
            },
            {path: 
                '/edittask/:id', 
                element:
                 <EditTask />
            },
            {path: 
                '/createbudget', 
                element:
                 <CreatBudget />
            },
            {path: 
                '/editbudget/:id', 
                element:
                 <EditBudget />
            },
            {path: 
                '/createguest', 
                element:
                 <CreatGuest />
            },
            {path: 
                '/editguest/:id', 
                element:
                 <EditGuest />
            },
            {path: 
                '/share', 
                element:
                 <Share />
            },
            {path: 
                '/inviteguest/:id', 
                element:
                 <InviteGuest />
            },
            {path: 
                '/venue', 
                element:
                 <Venue />
            },
            {path: 
                '/profile', 
                element:
                 <Profile />
            },
        ]
     },
        { path: "*", element: <NotFound /> }

    ]);
     
  


export default AppRouter;