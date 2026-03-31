import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
function EditGuest() {
   const navigate = useNavigate();
   const { id } = useParams();
  console.log("Event ID from URL:", id);
   const { control, 
               handleSubmit,
               reset,
                formState: { errors }} = useForm({
                   resolver: zodResolver(formSchema),
                       defaultValues: {
                       guestname: "",
                       guestemail: "",
                       guestphone: "",
                       status: ""
                      }
         })

    useEffect(() => {
      const fetchGuests =  async () => {
        try{
        const token = localStorage.getItem("token");
        const gres = await axios.get(`http://localhost:5000/api/guests/${id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
        reset(gres.data)
        } catch (error) {
          console.error(error)
        }
    }
     fetchGuests();

    }, [id,reset])
    

    const onSubmit = async (data) => {
      const token = localStorage.getItem("token");
       await axios.put(`http://localhost:5000/api/guests/${id}`,data,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
      navigate("/guestmanagment");

    }


  return (
          <div className='w-full min-h-screen flex items-start justify-center md:justify-start'>
            <div className='border w-full max-w-md p-2 text-black rounded-md'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Edit Guest</FieldLegend>
                            <FieldDescription>
                                If You Want To Change Any Of The Fields Feel Free TO change It.                       
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

export default EditGuest;