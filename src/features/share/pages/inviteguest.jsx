import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShareIcon  } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




function InviteGuest() {
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [urls, setUrls] = useState([]);


  useEffect(() => {
     const CodeGenrate =  async () => {
      try {
         const token = localStorage.getItem('token')
         const res = await axios.get(`http://localhost:5000/invitations/${id}`,{
          headers: {
            Authorization: `bearer ${token}`
          }
         });
         console.log(res.data)
         setData(res.data)
      } catch (error) {
         console.error(error)
      }
     }
     CodeGenrate();
  }, [id])
  

useEffect(() => {
  const generated = Data.map(
    (d) => `http://localhost:3001/eventmanagment/${d.invitecode}`
  );
  setUrls(generated);
}, [Data]);
  

  return (
    <Dialog>
      <DialogTrigger className='ml-1 flex gap-2'>
        <ShareIcon className='w-4'/>
        <Label>Share</Label>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            {urls.map((url,i)=>{
             return(<Input
              id="link"
              key={i._id}
              value={ url }
              readOnly
            />
             )
            })}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InviteGuest;