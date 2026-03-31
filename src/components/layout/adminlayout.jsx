//import { useState } from "react"
import {  SidebarProvider } from "@/components/ui/sidebar";
import  SidebarLayout  from "./sidebarlayout";


function AdminLayout() {
  return (
  <SidebarProvider>
    <SidebarLayout/>
  </SidebarProvider>
  )
}

export default AdminLayout;