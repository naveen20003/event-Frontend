import axios from 'axios';
import React,{ useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  EditIcon,
  DeleteIcon,
  MenuIcon,
  ShareIcon
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"


function Budegting() {
  const [ Budget , setBudget] = useState([])
  const navigate = useNavigate();

  const readBudget = async () =>  {
     try {
       const token = localStorage.getItem('token')
       const rdedbudget = await axios.get('https://event-planner-backend-mu.vercel.app/api/budgets',
        {
          headers: {
            Authorization: `bearer ${token}`
          }
        }
       );
       setBudget(rdedbudget.data)
     } catch (error) {
       console.error(error)
     }
  }

  useEffect(() => {
   readBudget();
  }, [])

  const deleteBudget =   async (id)=>{
     try {
       const token = localStorage.getItem("token");
       const deletedbudget = await axios.delete(`https://event-planner-backend-mu.vercel.app/api/budgets/${id}`,
        {
          headers: {
            Authorization: `beareer ${token}`
          }
       });
       alert('budget deleted successfully')
       readBudget();
     } catch (error) {
       console.error(error)
     }
  }  
   
  
   
     return (
       <div className="w-full overflow-x-auto min-h-screen bg-white text-black">
         {/* Add Event Button */}
         <Button variant='secondary'>
           <Link to="/createbudget">
             ➕ Add Budget
           </Link>
         </Button>
   
         {/* Events Table */}
         <Table>
          <TableCaption>Budget</TableCaption>
           <TableHeader>
             <TableRow>
               <TableHead className="w-[100px]">category</TableHead>
               <TableHead >budget</TableHead>
               <TableHead >spent</TableHead>
               <TableHead >remaining</TableHead>
               <TableHead className="text-right">Actions</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {Budget.map((b) => (
               <TableRow key={b._id}>
                 <TableCell className="font-medium">{b.category}</TableCell>
                 <TableCell>{b.budgets}</TableCell>
                 <TableCell>{b.spent}</TableCell>
                 <TableCell>{b.remaining}</TableCell>
                 <TableCell className="text-right">
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline"><MenuIcon /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=> navigate(`/editbudget/${b._id}`)}>
                          <EditIcon />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShareIcon />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={() => deleteBudget(b._id)}>
                          <DeleteIcon />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </div>
  )
}

export default Budegting;
