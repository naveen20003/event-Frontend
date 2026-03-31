import React from "react";
import { Link } from "react-router-dom";
import { SidebarTrigger, SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";




function AdminNav() {
  const navigate = useNavigate();
  const Logout = () => {
     localStorage.removeItem('token');
     navigate('/')
  }
  return (
     <header className="w-full h-14 flex items-center justify-between border-b bg-white px-6">
        <SidebarProvider>
          
          {/* Left side */}
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          
          </SidebarProvider>
          {/* Right side */}
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link to="/profile" className="hover:text-blue-500">
              
            </Link>

            <Button onClick={() => Logout()} className="hover:text-red-500"> 
              Logout
            </Button>
          </div>

    </header>
    

    
  )
}

export default AdminNav;