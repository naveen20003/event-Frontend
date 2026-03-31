import React,{ useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InviteGuest from '@/features/share/pages/inviteguest';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
import { Input } from '@/components/ui/input';


function Eventmanagment() {
   const[events, setevents] = useState([])
   const navigate = useNavigate();


   const [loading, setloading] = useState(true);
   const [search, setSearch] = useState('');
   const [sort, setsort] = useState('');
   const [Searchdata, setSearchdata] = useState([]);
   
   
  useEffect(() => {
  readEvents();
  }, [])

  //read event
 const readEvents = async () =>{
      try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/events",
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
    setevents(response.data);
  } catch (error) {
    console.error(error);
  }
  }

 const deleteEvents = async (id) =>{
    try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/events/${id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
    alert('event deleted successfully')
    readEvents();
  } catch (error) {
    console.error(error);
  }
  }


  
useEffect(() => {
  const delay = setTimeout(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/events?search=${search}&sort=${sort}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        

        setSearchdata(res.data); // ✅ store data
      } catch (error) {
        console.error(error);
      } finally  {
        setloading(false)
      }
    };

    fetchData();
    
  }, 500); // ⏱ debounce

  return () => clearTimeout(delay); // ✅ cleanup
}, [search,sort]); 

if (loading) return <p>loading...</p>

console.log(sort);


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
                    <SelectItem value="newest_events">newest_events</SelectItem>
                    <SelectItem value="oldest_events">oldest_events</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
        </div>
         <Button variant='secondary'>
           <Link to="/createevent">
             ➕ Add Event
           </Link>
         </Button>
         <div className='mb-3 mt-3'>
            <Input type='text' value={search} onChange={(e) => setSearch(e.target.value)}  className='placeholder:text-[15px]' placeholder='Search Here...'/> 
         </div>
        
        
         {/* Events Table */}
         {Searchdata.length === 0 ? 
         <p className='text-red-800 min-h-screen flex justify-center p-30'>
          no data found 
          </p> : 
         <Table>
           <TableCaption>Events</TableCaption>
           <TableHeader>
             <TableRow>
               <TableHead className="w-[100px]">Event Name</TableHead>
               <TableHead>Date</TableHead>
               <TableHead>Time</TableHead>
               <TableHead>Venue</TableHead>
               <TableHead className="text-right">Actions</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
              {Searchdata.map((s) => (
               <TableRow key={s._id}>
                 <TableCell className="font-medium">{s.eventname}</TableCell>
                 <TableCell>{s.date}</TableCell>
                 <TableCell>{s.time}</TableCell>
                 <TableCell>{s.venue}</TableCell>
                 <TableCell className="text-right">
                   <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                            <Button variant="outline"><MenuIcon /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                             <DropdownMenuItem onClick={()=> navigate(`/editevent/${s._id}`)}>
                                  <EditIcon />
                                      Edit
                             </DropdownMenuItem>
                             <DropdownMenuItem onClick={()=> navigate(`/Inviteguest/${s._id}`)}>
                                  <ShareIcon />
                                      share
                             </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive" onClick={() => deleteEvents(s._id)}>
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

export default Eventmanagment;