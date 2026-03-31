import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import myIcon from "../assets/icons/my-icon.png";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Name is required"
  }),
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
  confirmpassword: z.string()
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords did'nt match",
  path: ["confirmpassword"]
});



function Register() {
    const navigate = useNavigate();
    const { control, 
           handleSubmit,
           formState: { errors }} = useForm({
               resolver: zodResolver(formSchema),
                 defaultValues: {
                 username: "",
                 email: "",
                 password: "",
                 confirmpassword: ""
             }
         })
         const onSubmit = async (data) => {
           try {
              await axios.post('http://localhost:5000/createuser', data);
              navigate('/login')
           } catch (error) {
             if (error.response) {
              alert(error.response.data.message)
             } else {
              alert('something went wrong');
             }
             console.error(error)
           }
         }
  return (
     
    <>
      <img src={myIcon} className='w-5 h-5 mt-10 ml-15' onClick={()=>navigate("/")} />
       <div className='w-full min-h-screen flex items-start justify-center'>
        <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
          <CardAction>
            <Link to='/login' className="hover:underline" >Log In</Link>
          </CardAction>
        </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <FieldGroup>
                        <Field>
                          <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                            <div>
                            <Input
                            placeholder="Your Name"
                            {...field}
                            />
                            {errors.username && (
                              <p className="text-red-500 text-sm">
                            {errors.username.message}
                              </p>
                              )}
                              </div>
                                )}
                              />
                        </Field>
                        <Field>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                            <div>
                            <Input
                            type='email'
                            placeholder="Enter Your Email"
                            {...field}
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm">
                            {errors.email.message}
                              </p>
                              )}
                              </div>
                                )}
                              />
                        </Field>  
                        <Field>
                          <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                            <div>
                            <Input
                            type='password'
                            placeholder="Enter Your Password"
                            className="caret-black"
                            {...field}
                            />
                            {errors.password && (
                              <p className="text-red-500 text-sm">
                            {errors.password.message}
                              </p>
                              )}
                              </div>
                                )}
                              />
                        </Field>                     
                        <Field>
                          <Controller
                            name="confirmpassword"
                            control={control}
                            render={({ field }) => (
                            <div>
                            <Input
                            type='password'
                            placeholder="Enter your Password Again"
                            {...field}
                            />
                            {errors.confirmpassword && (
                              <p className="text-red-500 text-sm">
                            {errors.confirmpassword.message}
                              </p>
                              )}
                              </div>
                                )}
                              />
                        </Field>                     
                    </FieldGroup>
                  </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  ) 
}

export default Register