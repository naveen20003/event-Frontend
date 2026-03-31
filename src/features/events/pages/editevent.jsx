import React,{useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// shadcn components
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
  eventname: z.string().min(2, {
    message: "Event Name is required"
  }),
  date: z.string().min(2, {
    message: "Event Date is required"
  }),
   time: z.string().min(1, {
    message: "Event Time is required"
  }),
   venue: z.string().min(1, {
    message: "Venue is required"
  }),
   eventtype: z.string().min(1, {
    message: "event type is required"
  }),
   eventtheme: z.string().min(1, {
    message: "event theme is required"
  }),
    eventsettings: z.string().min(1, {
    message: "event settings is required"
  }),
  guestcount: z.coerce
    .number()
    .min(1, "Guest Number is required"),
})

function EditEvent() {
  const {id} = useParams();
  console.log("Event ID from URL:", id);
  const navigate = useNavigate();
  const { control, 
          handleSubmit,
          reset,
           formState: { errors }} = useForm({
              resolver: zodResolver(formSchema),
                  defaultValues: {
                  eventname: "",
                  date:"",
                  time: "",
                  venue: "",
                  eventtype: "",
                  eventtheme: "",
                  guestcount: "",
                  eventsettings: ""
  
                  }
              })



 useEffect(() => {
      const fetchEvents = async () =>{
          try{
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/api/events/${id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            reset(res.data)
          } catch (error) {
              console.error('error fetching event',error)
          }
        };
        fetchEvents();
  }, [id,reset]);

  const onSubmit = async (data) => {
     try{
        const token = localStorage.getItem("token");
       await axios.put(`http://localhost:5000/api/events/${id}`,data,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
       navigate("/eventmanagment");
     } catch(error) {
       console.error('error in editing', error)
     }
    
  }
  


  return (
              <div className='w-full min-h-screen  flex items-start justify-center md:justify-start'>
            <div className='border w-full max-w-md p-2 text-black rounded-md'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Edit Event</FieldLegend>
                            <FieldDescription>
                                If You Want To Change Any Of The Fields Feel Free TO change It.                    
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <Controller
                                        name="eventname"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                placeholder="eventname"
                                                {...field}
                                            />

                                            {errors.eventname && (
                                                <p className="text-red-500 text-sm">
                                                {errors.eventname.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>
                                <Field>                           
                                   <Controller
                                        name="date"
                                        control={control}
                                        render={({ field }) => (
                                          <div>  
                                             <Input
                                              type='date'
                                              {...field}
                                             />
                                            {errors.date && (
                                                <p className="text-red-500 text-sm">
                                                {errors.date.message}
                                                </p>
                                            )}
                                         </div>
                                      )}/>
                               </Field>  
                                <Field>
                                    <Controller
                                        name="time"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                            type="time"
                                                placeholder="Event Time"
                                                {...field}
                                            />

                                            {errors.time && (
                                                <p className="text-red-500 text-sm">
                                                {errors.time.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>                      
                                <Field>
                                    <Controller
                                        name="venue"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input                                            
                                                placeholder="Venue"
                                                {...field}
                                            />

                                            {errors.venue && (
                                                <p className="text-red-500 text-sm">
                                                {errors.venue.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>                      
                                <Field>
                                    <Controller
                                        name="eventtype"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                placeholder="Event Type"
                                                {...field}
                                            />

                                            {errors.eventtype && (
                                                <p className="text-red-500 text-sm">
                                                {errors.eventtype.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>                      
                                <Field>
                                    <Controller
                                        name="eventtheme"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                placeholder="Event Theme"
                                                {...field}
                                            />

                                            {errors.eventtheme && (
                                                <p className="text-red-500 text-sm">
                                                {errors.eventtheme.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>                      
                                <Field>
                                    <Controller
                                        name="guestcount"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                type='number'
                                                placeholder="Guest Count"
                                                {...field}
                                            />

                                            {errors.guestcount && (
                                                <p className="text-red-500 text-sm">
                                                {errors.guestcount.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>                      
                                <Field>
                                    <Controller
                                        name="eventsettings"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                placeholder="Event Settings"
                                                {...field}
                                            />

                                            {errors.eventsettings && (
                                                <p className="text-red-500 text-sm">
                                                {errors.eventsettings.message}
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
                            <Button onClick={()=> navigate('/eventmanagment')} variant="outline" type="button" className='text-black'>
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
          </div>
  )
}

export default EditEvent;
    
