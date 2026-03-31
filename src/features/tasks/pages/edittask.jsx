import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
} from "@/components/ui/field"

import 
{
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectValue
} 
from '@/components/ui/select'

import { Input } from "@/components/ui/input"



const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required"
  }),
  deadline: z.string().min(1, {
    message: "Deadline is required",
  }),
  task: z.string().min(1, {
    message: "Task is required"
  }),
  taskstatus: z.string().min(1, {
     message: "Status is required"
 }),
  

})


function EditTask() {
    const { id } = useParams();
    console.log("Event ID from URL:", id);
    const navigate = useNavigate();
            const { control, 
                     handleSubmit,
                     reset,
                      formState: { errors }} = useForm({
                         resolver: zodResolver(formSchema),
                             defaultValues: {
                             name: "",
                             deadline: "",
                             task: "",
                             taskstatus: ""
                            }
               })
   
            
    useEffect(() => {
        const fetchTasks =  async ()=> {
        try {
            const token = localStorage.getItem("token");
            const ridtask = await axios.get(`http://localhost:5000/api/tasks/${id}`,
                    {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    });
            reset(ridtask.data)
        } catch (error) {
            console.error(error)
        }
    }

    fetchTasks();
    }, [id,reset])
 

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/tasks/${id}`,data,
                    {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    });
            navigate('/taskmanagment')
        } catch (error) {
            console.error(error)
        }
    }

  return (
     <div className='w-full min-h-screen flex items-start justify-center md:justify-start'>
               <div className='border w-full max-w-md p-2 text-black rounded-md'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <FieldSet>
                                <FieldLegend>Edit Task</FieldLegend>
                                <FieldDescription>
                                    If You Want To Change Any Of The Fields Feel Free TO change It.                      
                                </FieldDescription>
                                <FieldGroup>
                                    <Field>
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
    
                                                <Input
                                                    placeholder="Assignee Name"
                                                    {...field}
                                                />
    
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm">
                                                    {errors.name.message}
                                                    </p>
                                                )}
    
                                                </div>
                                            )}
                                            />
                                    </Field>
                                    <Field>                           
                                        <Controller
                                            name="deadline"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
    
                                                <Input
                                                    type='date'
                                                    placeholder="Deadline"
                                                    {...field}
                                                />
    
                                                {errors.deadline && (
                                                    <p className="text-red-500 text-sm">
                                                    {errors.deadline.message}
                                                    </p>
                                                )}
    
                                                </div>
                                            )}
                                            />
                                    </Field>  
                                    <Field>
                                        <Controller
                                            name="task"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
    
                                                <Input
                                                    placeholder="Task"
                                                    {...field}
                                                />
    
                                                {errors.task && (
                                                    <p className="text-red-500 text-sm">
                                                    {errors.task.message}
                                                    </p>
                                                )}
    
                                                </div>
                                            )}
                                            />
                                    </Field>                      
                                    <Field>
                                        <Controller
                                            name="taskstatus"
                                            control={control}
                                            render={({ field }) => (
                                                 <div>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder='Task Status'/>
                                                        </SelectTrigger>
                                                        <SelectContent >
                                                            <SelectGroup>
                                                                <SelectItem value="Problem occured">Problem occured</SelectItem>
                                                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                                                <SelectItem value="completed">Completed</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>                                                
                                                    </Select>

                                            {errors.taskstatus && (
                                                <p className="text-red-500 text-sm">
                                                {errors.taskstatus.message}
                                                </p>
                                            )}

                                            </div>
                                            )}
                                            />
                                    </Field>                      
                                </FieldGroup>
                            </FieldSet>
                            <Field orientation="horizontal">
                                <Button variant='ghost' type="submit">Submit</Button>
                                <Button onClick={()=> navigate('/taskmanagment')} variant="outline" type="button" className='text-black'>
                                    Cancel
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
               </div>
     </div>
  )
}

export default EditTask;