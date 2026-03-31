import React,{ useEffect, useState} from 'react'
import { Outlet } from "react-router-dom"

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import axios from 'axios';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import Share from '@/features/share/pages/share';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarProvider, 
  SidebarTrigger,
  
} from "@/components/ui/sidebar"
import AiChatSupport from './AiChatBot/pages/aichatbot';
 


import DashboardIcon from '../icons/dashboardicon';
import EventIcon from '../icons/eventmanagment';

import TaskIcon from '../icons/tasksIcon';
import GuestIcon from '../icons/guestIcon';
import BudgetIcon from '../icons/budgeticon';


function SidebarLayout() {
  const navigate = useNavigate();

 // const [users, setusers] = useState([])


 {/*    useEffect(() => {
      const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token')
           const res = await axios.get(`http://localhost:5000/users`,{
            headers: {
                Authorization:  `bearer ${token}`
            }
           })
           setusers(res.data) 
        } catch (error) {
            console.error(error)
        }
      }
      fetchUser();
    }, [])
    

   // console.log(users)
    const onClickId = () => {
       users.map((u)=> {
        if(u.email === 'rawansrilanka17@gmail.com'){
          const id = u._id
          navigate(`/profile/${id}`)
        }
       })
    }
*/}
  const Logout = () => {
     localStorage.removeItem('token');
     navigate('/')
  }
  return ( 
     <SidebarProvider>
        
      {/* Sidebar */}
      <Sidebar >
        <SidebarHeader className='flex justify-center h-16 border-b'>
          <div className='text-[20px] flex justify-between'>
            Event Planner
            <SidebarTrigger className='md:hidden' />
          </div>
          
        </SidebarHeader>
        <SidebarContent>
           <SidebarGroup>
            <div className='grid flex h-1/2 md:h-full justify-start ml-5 items-center text-[15px] gap-5'>
            <Link to="/dashboard" className='flex gap-2'>
              <DashboardIcon/>
              <span className='flex items-center'> Dashboard </span>
            </Link>
            <Link to="/eventmanagment" className='flex gap-2'>
               <EventIcon/>
               <span className='flex items-center'> EventManagment </span>
            </Link>
            <Link to="/taskmanagment" className='flex gap-2'>
               <TaskIcon />
               <span className='flex items-center'> TaskManagment </span>
            </Link>
            <Link to="/guestmanagment" className='flex gap-2'>
               <GuestIcon />
               <span className='flex items-center'> GuestManagment </span>
            </Link>
            <Link to="/Budgeting"className='flex gap-2'>
               <BudgetIcon />
               <span className='flex items-center'> BudgetManagment </span>
            </Link>
            <Share/>
            </div>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          Footer
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>

        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white outline-b flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          
          {/* Right side */}
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
              <div className='pt-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick= {()=>navigate('/profile')} className="hover:text-blue-500">Profile</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem variant="destructive" onClick={() => Logout()}>Log out</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
          </div>
        </header>

        {/* THIS is where pages render */}
        <div className="p-6">
          <Outlet />
        </div>

      <AiChatSupport />
      </SidebarInset>

    </SidebarProvider>  
  )
}

export default SidebarLayout;