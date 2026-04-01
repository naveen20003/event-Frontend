import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import 
{ 
  ChartContainer,
  ChartLegend,
  ChartLegendContent, 
} from "@/components/ui/chart"


import { Field, FieldLabel } from "@/components/ui/field"

import { Progress } from "@/components/ui/progress"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
//import { useNavigate } from 'react-router-dom';
import 
{ 
  Card,
  CardHeader,
  CardContent
} 
from '@/components/ui/card';

import EventIcon from '@/components/icons/eventmanagment';



function Dashboard() {
const [Event, setEvent] = useState([]);
const [Task, setTask] = useState([]);
const [Guest, setGuest] = useState([]);
const [Budget, setBudget] = useState([]);
// const navigate = useNavigate();
useEffect(() => {
  const fetchEvents = async () => {
     try {
      const token = localStorage.getItem('token')
      const readevents = await axios.get(`https://event-planner-backend-mu.vercel.app/api/events/readevents`,{
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      setEvent(readevents.data)
     } catch (error) {
       console.error(error)
     }     
  }
  fetchEvents();
}, [])

useEffect(() => {
  const fetchTasks = async () => {
       try {
        const token = localStorage.getItem('token')
        const readtasks = await axios.get(`https://event-planner-backend-mu.vercel.app/api/tasks/readtask`,{
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        setTask(readtasks.data)
       } catch (error) {
         console.error(error)
       }
    }
  fetchTasks();         
}, [])

useEffect(() => {
  const fetchGuests = async () => {
      try {
        const token = localStorage.getItem('token')
         const readguests = await axios.get('https://event-planner-backend-mu.vercel.app/api/guests',{
           headers: {
            Authorization: `bearer ${token}`
           }
         });
         setGuest(readguests.data)
      } catch (error) {
         console.error(error)
      }
  }
  fetchGuests();
}, [])

useEffect(() => {
 const fetchbudget = async () => {
   try {
      const token = localStorage.getItem('token')
      const readbudget = await axios.get('https://event-planner-backend-mu.vercel.app/api/budgets', {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      setBudget(readbudget.data)
   } catch (error) {
    
   }
 }
 fetchbudget();
}, [])

const chartConfig = {
  budgets: {
    label: "budget",
    color: "#042366",
  },
  spent: {
    label: "spent",
    color: "#1e49a5",
  },
  remaining: {
    label: "remaining",
    color: "#6487b3",
  },
}
 
const completedtask = Task.filter(t => t.taskstatus === 'completed').length;

const tasklength = Task.length;

const taskprogress = tasklength === 0 ? 0 : Math.round((completedtask / tasklength )* 100);

{/*{Event.map((e)=>{
   console.log(e.eventname)
})*/}

{/*const totalbudget = Budget.reduce((total, b)=> total + b.budgets,0);*/}

  return (
    <>
    <div className='grid flex grid-cols-1 gap-4 mb-3 sm:grid-cols-3'>
        <Card className='bg-gray-100 text-black shadow-md'>                    
          <CardHeader className='justify-center'>
              Total Events
          </CardHeader>
          <CardContent className='flex justify-center'>
             <div className='text-6xl flex items-center gap-2'>
                <EventIcon/> {Event.length}
             </div>
             {/*Event.map((e)=>(
               <div key={e._id}>
                     {e.eventname}
               </div>
             ))*/}
           </CardContent>
        </Card>
        <Card className='bg-gray-100 text-black shadows shadow-lg'>                    
          <CardHeader className='justify-center'>
                Pending Tasks
          </CardHeader>
          <CardContent className='flex justify-center'>
             <div className='text-6xl'>
              {completedtask}/{tasklength}
             </div>
           </CardContent>
        </Card>     
        <Card className='bg-gray-100 text-black shadow-lg'>                    
          <CardHeader className='justify-center'>
                Guests
          </CardHeader>
          <ScrollArea className='h-20'>
          <CardContent className='flex justify-center'>
             <div className='text-6xl'>
              {Guest.length}
             </div>
           </CardContent>
           <ScrollBar orientation="vertical" />
         </ScrollArea>  
        </Card>
    </div>
        <Separator className='invisible sm:visible'/>  
     <div className='grid flex grid-cols-1 sm:grid-cols-3 mt-5'>   
        <ScrollArea className='sm:col-span-2 border bg-gray-100 shadow-lg'>
          <ChartContainer config={chartConfig} className="min-h-[200px]">
            <BarChart data={Budget}>
              <XAxis dataKey='category'
                     tick={false}/>
              <YAxis />
              <Tooltip /> 
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="budgets" fill="var(--color-budgets)" radius={4} />
              <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
              <Bar dataKey="remaining" fill="var(--color-remaining)" radius={4} />
            </BarChart>
          </ChartContainer>
          <ScrollBar orientation="horizontal" />
         </ScrollArea>
     </div>
     <div className='mt-5 h-[300px] grid grid-cols-1 gap-3 md:grid-cols-4'>
          <div className='h-full border p-5 flex justify-center items-center md:col-span-2 shadow-lg bg-gray-100'>
            <Field >
                <FieldLabel className='flex w-full justify-start'>Tasks Progress Bar</FieldLabel>
                <FieldLabel className='flex w-full justify-end'>{taskprogress}%</FieldLabel>
              <Progress value={taskprogress}  />
            </Field>
          </div>
        <div className='sm:col-span-2 border shadow-lg'>
           <h1 >naveen</h1>
        </div>
     </div>
    </>
  )
}

export default Dashboard;
