import axios from 'axios';
import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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


function CreateTask() {
  const navigate = useNavigate()
     const { control, 
                 handleSubmit,
                  formState: { errors }} = useForm({
                     resolver: zodResolver(formSchema),
                         defaultValues: {
                         name: "",
                         deadline: "",
                         task: "",
                         taskstatus: ""
                        }
           })
  
const onSubmit = async (data) => {
   try{
    const token = localStorage.getItem("token");
     axios.post(`http://localhost:5000/api/tasks`,data,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
     navigate('/taskmanagment')
   } catch(error) {
    console.error(error)
   }
}


  return (
          <div className='w-full min-h-screen bg-white flex items-start justify-center md:justify-start'>
            <div className='border w-full max-w-md bg-white text-black p-5 rounded-md'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Create Task</FieldLegend>
                            <FieldDescription>
                                Every Field Is Required                       
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
                                            <Select onValueChange={field.onChange} defaultValues={field.value}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder='Status'/>
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

export default CreateTask;