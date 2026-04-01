import React,{ useState,useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

import { Button } from "@/components/ui/button"


function TaskManagment() {
 const [Tasks, setTasks] = useState([])

 const [search, setSearch] = useState('')
 const [sort, setsort] = useState('')
 const [Searchdata, setSearchdata] = useState([])
 const navigate = useNavigate()
 
const readTasks = ( async ()=>{
   try{
    const token = localStorage.getItem("token");
   const rtasks = await axios.get('https://event-planner-backend-mu.vercel.app/api/tasks',
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
   setTasks(rtasks.data)
   } catch(error) {
    console.error(error)
   }
})

useEffect(() => {
 readTasks();
}, [])

const deleteTask = ((id)=>{
  try{
  const token = localStorage.getItem('token');
   axios.delete(`https://event-planner-backend-mu.vercel.app/api/tasks/${id}`,
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  )
  alert('Task deleted successfully')
  readTasks();
  } catch(error) {
    console.error(error);
  }
})

useEffect(() => {
  const searchandsort = async ()=>{
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`https://event-planner-backend-mu.vercel.app/api/tasks?search=${search}&sort=${sort}`,{
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      if( Searchdata )
        {console.log(res.data)} else console.log('not found')
      setSearchdata(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  searchandsort();
}, [search, sort])

if (Searchdata.length === 0) {
  console.log('not found')
} else ('data found')


  return (
    <div className="w-full overflow-x-auto min-h-screen bg-white text-black">
      {/* Add Event Button */}
      <div className='flex justify-end'>
                    <Select value={sort} onValueChange={setsort}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {/* 3. Ensure each SelectItem has a unique string 'value' prop */}
                          <SelectItem value="new_task">new task</SelectItem>
                          <SelectItem value="old_task">old task</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
              </div>
      <Button variant='secondary'>
        <Link to="/createtask">
          ➕ Add Task
        </Link>
      </Button>
      <div className='mb-3 mt-3'>
            <Input type='text' value={search} onChange={(e) => setSearch(e.target.value)}  className='placeholder:text-[15px]' placeholder='Search Here...'/> 
      </div>
      {/* Events Table */}
    {Searchdata.length === 0 ? 
        (<p className='text-red-800 min-h-screen flex justify-center p-30'>no data found :</p>) 
        :
      <Table>
        <TableCaption>Tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Assignee Name</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Searchdata.map((s) => (
            <TableRow key={s._id}>
              <TableCell className="font-medium">{s.name}</TableCell>
              <TableCell>{s.deadline}</TableCell>
              <TableCell>{s.task}</TableCell>
              <TableCell>{s.taskstatus}</TableCell>
              <TableCell className="text-right">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline"><MenuIcon /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=> navigate(`/edittask/${s._id}`)}>
                          <EditIcon />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShareIcon />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={() => deleteTask(s._id)}>
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
     }
    </div>
  )
}

export default TaskManagment
