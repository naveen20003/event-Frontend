import React,{ useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from'axios'

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

function GuestManagment() {
  const [Guests, setGuests] = useState([])
  const navigate = useNavigate();


  const readGuest = ( async () => {
    try{
      const token = localStorage.getItem("token");
    const res = await axios.get('http://localhost:5000/api/guests',
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
    setGuests(res.data)
    } catch(error) {
      console.error(error)
    }
  })

  useEffect(() => {
   readGuest();
  }, [])

  const deleteGuest = ( async (id)=>{
     try{
      const token = localStorage.getItem("token");
      const deletedguest = await axios.delete(`http://localhost:5000/api/guests/${id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
      alert('guest deleted successfully')
      readGuest();
     } catch (error) {
        console.error(error)
     }
  })
  

  return (
    <div className="w-full overflow-x-auto min-h-screen bg-white text-black">
      {/* Add Event Button */}
      <Button variant='secondary'>
        <Link to="/createguest" >
          ➕ Add Guest
        </Link>
      </Button>

      {/* Events Table */}
      <Table >
        <TableCaption>Guests</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Guest Name</TableHead>
            <TableHead>Guest Email</TableHead>
            <TableHead>Guest Phone</TableHead>
            <TableHead>Satus</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Guests.map((g) => (
            <TableRow key={g._id}>
              <TableCell className="font-medium">{g.guestname}</TableCell>
              <TableCell>{g.guestemail}</TableCell>
              <TableCell>{g.guestphone}</TableCell>
              <TableCell>{g.status}</TableCell>
              <TableCell className="text-right">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline"><MenuIcon /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=> navigate(`/editguest/${g._id}`)}>
                          <EditIcon />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShareIcon />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={() => deleteGuest(g._id)}>
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
  );
}

export default GuestManagment;