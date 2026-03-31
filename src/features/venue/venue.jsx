import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function Venue() {
    const [Search, setSearch] = useState([]);

   const url = 'https://api.makcorps.com/city';
    const params = {
        cityid: '60763',
        pagination: '0',
        cur: 'USD',
        rooms: '1',
        adults: '2',
        checkin: '2023-12-25',
        checkout: '2023-12-26',
        api_key: '69c2822aa13ba1b92c9aa96a'
    };
    useEffect(() => {
       const fetchVenue = async  () => {
        try {
            const res = await axios.get(url,{params})
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
       }
       fetchVenue();
    }, [])
    

    console.log(Search)
  return (
    <div>
        <div className='flex justify-end'>
              <Select value='#' onValueChange='#'>
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
           <Link to="#">
             ➕ Add Event
           </Link>
         </Button>
         <div className='mb-3 mt-3'>
            <Input type='text' value={Search}  onChange={(e) => setSearch(e.target.value)}  className='placeholder:text-[15px]' placeholder='Search Here...'/> 
         </div>
    </div>
  )
}

export default Venue;