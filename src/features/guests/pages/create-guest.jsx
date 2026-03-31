import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

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

import { Input } from "@/components/ui/input"



const formSchema = z.object({
  guestname: z.string().min(2, {
    message: "Guest Name is required"
  }),
  guestemail: z.string().min(1, {
    message: "Guest Email is required",
  }),
  status: z.string().min(1, {
    message: "Status is required"
  }),
  guestphone: z.coerce
      .number().min(1, {
   message: "Guest Phone Number is required"
 }),
  

})

function CreateGuest() {
  const navigate = useNavigate();
     const { control, 
            handleSubmit,
             formState: { errors }} = useForm({
                resolver: zodResolver(formSchema),
                    defaultValues: {
                    guestname: "",
                    guestemail: "",
                    guestphone: "",
                    status: ""
                   }
      })

     const onSubmit = async (data) => {
       try {
        const token = localStorage.getItem("token");
         await axios.post("http://localhost:5000/api/guests", data,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
          navigate('/guestmanagment')
        } catch (error) {
          console.error(error);
        }
    }
    
  return (
          <div className='w-full min-h-screen bg-white flex items-start justify-center md:justify-start'>
            <div className='border w-full max-w-md bg-white text-black p-5 rounded-md'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Add Guest</FieldLegend>
                            <FieldDescription>
                                Every Field Is Required                       
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <Controller
                                        name="guestname"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                placeholder="Guest Name"
                                                {...field}
                                            />

                                            {errors.guestname && (
                                                <p className="text-red-500 text-sm">
                                                {errors.guestname.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>
                                <Field>                           
                                    <Controller
                                        name="guestemail"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                type="email"
                                                placeholder="Guest Email"
                                                {...field}
                                            />

                                            {errors.guestemail && (
                                                <p className="text-red-500 text-sm">
                                                {errors.guestemail.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>  
                                <Field>
                                    <Controller
                                        name="guestphone"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                            type="number"
                                                placeholder="Guest Phone"
                                                {...field}
                                            />

                                            {errors.guestphone && (
                                                <p className="text-red-500 text-sm">
                                                {errors.guestphone.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>                      
                                <Field>
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                            
                                                placeholder="Status"
                                                {...field}
                                            />

                                            {errors.status && (
                                                <p className="text-red-500 text-sm">
                                                {errors.status.message}
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
                            <Button onClick={()=> navigate('/guestmanagment')} variant="outline" type="button" className='text-black'>
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
          </div>
  )
}

export default CreateGuest;