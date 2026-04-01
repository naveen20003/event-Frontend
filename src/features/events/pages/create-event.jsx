import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
//react 
import { useForm, Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


// shadcn components
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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
import { Checkbox } from '@/components/ui/checkbox';




const formSchema = z.object({
  eventname: z.string().min(2, {
    message: "Event Name is required"
  }),
  eventdate: z.string().min(1, {
    message: "Event Date is required",
  }),
   eventtime: z.string().min(1, {
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
   guestcount: z.string().min(1, {
    message: "guest count is required"
  }),
   eventsettings: z.string().min(1, {
    message: "event settings is required"
   })
});


function CreateEvent() {

const [Guests, setGuests] = useState([])

const navigate = useNavigate();
  const { control, 
        handleSubmit,
         formState: { errors }} = useForm({
            resolver: zodResolver(formSchema),
                defaultValues: {
                eventname: "",
                eventdate: "",
                eventtime: "",
                venue: "",
                eventtype: "",
                eventtheme: "",
                guestcount: "",
                eventsettings: "",
                }
  })

useEffect( ()  =>  {
  const fetchGuest = async() => {
    try {
      const token = localStorage.getItem('token')
      const readguest = await axios.get('https://event-planner-backend-mu.vercel.app/api/guests', {
        headers: {
            Authorization: `bearer ${token}`
        }
      });
      setGuests(readguest.data)
   } catch (error) {
     console.error(error)
   }
   }
   fetchGuest();
}, [])

  //create event
  const onSubmit = async (data) => {
     try {
    const token = localStorage.getItem("token");
     await axios.post("https://event-planner-backend-mu.vercel.app/api/events", data,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
    navigate('/eventmanagment')
  } catch (error) {
    console.error(error);
  }
   }

   // render the form
  return (
    
          <div className='w-full min-h-screen bg-white flex items-start justify-center md:justify-start'>
            <div className='border w-full max-w-md bg-white text-black p-5 rounded-md'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Create Event</FieldLegend>
                            <FieldDescription>
                                Every Field Is Required                       
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <Controller
                                        name="eventname"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                placeholder="Event Name"
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
                                        name="eventdate"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                type="date"
                                                placeholder="Event Date"
                                                {...field}
                                            />

                                            {errors.eventdate && (
                                                <p className="text-red-500 text-sm">
                                                {errors.eventdate.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>  
                                <Field>
                                    <Controller
                                        name="eventtime"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                            type="time"
                                                placeholder="Event Time"
                                                {...field}
                                            />

                                            {errors.eventtime && (
                                                <p className="text-red-500 text-sm">
                                                {errors.eventtime.message}
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
                              {/*
                                <FieldLabel className='ml-1 w-full text-zinc-500 border rounded-md'>Select Guests...</FieldLabel>
                               <ScrollArea>
                                <Field>
                                    <Controller
                                    name="guests" // ✅ array field
                                    control={control}
                                    defaultValue={[]} // important
                                    render={({ field }) => {
                                        const { value = [], onChange } = field;

                                        const handleCheckboxChange = (guestId) => {
                                        if (value.includes(guestId)) {
                                            onChange(value.filter((id) => id !== guestId));
                                        } else {
                                            onChange([...value, guestId]);
                                        }
                                        };

                                        return (
                                        <div className="space-y-2">
                                            {Guests.map((g) => (
                                            <div key={g._id} className="flex items-center gap-2">
                                                <Checkbox
                                                checked={value.includes(g._id)}
                                                onCheckedChange={() => handleCheckboxChange(g._id)}
                                                />
                                                <span className='text-zinc-500'>{g.guestname}</span>
                                            </div>
                                            ))}

                                            {errors.guests && (
                                            <p className="text-red-500 text-sm">
                                                {errors.guests.message}
                                            </p>
                                            )}
                                        </div>
                                        );
                                    }}
                                    />
                                </Field>
                                <ScrollBar orientation="vertical" />
                                </ScrollArea> 
                                */}
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

export default CreateEvent;
