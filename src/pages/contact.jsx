import React, { useRef } from "react";
import emailjs from '@emailjs/browser';

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

import myIcon from '../assets/icons/my-icon.png';
import { useNavigate } from "react-router-dom";

import 
{
 Field,
 FieldDescription,
 FieldGroup,
 FieldSet,
 FieldLegend
} 
from '@/components/ui/field'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

const FormSchema = z.object({
    user_name: z.string().min(1, {
    message: 'Name is required!'
  }),

  user_email: z.string().min(1, {
    message: 'Email is required!'
  }),
  title: z.string().min(1, {
    message: 'subject is required!'
  }),

  message: z.string().min(1, {
    message: 'Description is required!'
  })
});



function Contact() {
  const navigate = useNavigate();
  const form = useRef();

  const sendEmail = (data) => {
   // console.log(data)
    emailjs
      .sendForm('service_fu1d5qt', 'template_x17t1i7', form.current, {
        publicKey: 't6SrslDXKHijCvXMj',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        //   
        //   navigate('/')
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
     
   const 
   {
    control,
    handleSubmit,
    formState : { errors, isDirty, isReady }} = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
      user_name: '',
      user_email:'',
      title:'',
      message:'' 
      } 
    }
    );

  return (
    <>
          <img src={myIcon} className='w-5 h-5 mt-10 ml-15 invisible md:visible' onClick={()=>navigate("/")} />
          <div className='w-full min-h-screen bg-white mt-5 flex items-start justify-center'>
            <div className='border w-full max-w-md bg-white text-black p-5 rounded-md'>
                <form ref={form} onSubmit={handleSubmit(sendEmail)}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Contact Us</FieldLegend>
                            <FieldDescription>
                                we reply your email in 24 hours                       
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <Controller
                                        name="user_name"
                                        control={control}
                                        render={({ field }) => (
                                            <div>
                                            <Input
                                               text = 'text'
                                                placeholder="Your Name"
                                                name="user_name"
                                                {...field}
                                                />
                                            {errors.user_name && (
                                                <p className="text-red-500 text-sm">
                                                {errors.user_name.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>
                                <Field>                           
                                    <Controller
                                        name="user_email"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                type='email'
                                                placeholder="Email"
                                                name="user_email"
                                                {...field}
                                            />
                                            <FieldDescription>
                                              put your email where we reply to you
                                            </FieldDescription>

                                            {errors.user_email && (
                                                <p className="text-red-500 text-sm">
                                                {errors.user_email.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>  
                                <Field>                           
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                type='text'
                                                placeholder="Subject"
                                                name="title"
                                                {...field}
                                            />
                                            <FieldDescription>
                                              please describe what this is about?
                                            </FieldDescription>

                                            {errors.title && (
                                                <p className="text-red-500 text-sm">
                                                {errors.title.message}
                                                </p>
                                            )}

                                            </div>
                                        )}
                                        />
                                </Field>  
                                <Field>
                                    <Controller
                                        name="message"
                                        control={control}
                                        render={({ field }) => (
                                            <div>

                                            <Input
                                                placeholder="Description"
                                                name="message"
                                                {...field}
                                            />
                                            <FieldDescription>
                                              enter your thoughts
                                            </FieldDescription>

                                            {errors.message && (
                                                <p className="text-red-500 text-sm">
                                                {errors.message.message}
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
                            <Button onClick={()=> navigate('/')} variant="outline" type="button" className='text-black'>
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
          </div>
    </>
 );
}



export default Contact;