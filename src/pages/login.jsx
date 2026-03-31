import React from "react";
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
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
});


function Login() {
    const navigate = useNavigate();

    const { control, 
               handleSubmit,
               formState: { errors }} = useForm({
                   resolver: zodResolver(formSchema),
                     defaultValues: {
                     email: "",
                     password: "",
                 }
             });
             const onSubmit = async (data) => {
              try {
                        const response = await axios.post('http://localhost:5000/api/users/login', data);
                        localStorage.setItem("token", response.data.token);
                        localStorage.getItem("token")
                        console.log(response.data)
                  alert(`your email ${response.data.user.email} and username ${response.data.user.username}`)
                  navigate('/dashboard')
              } catch (error) {
                 if (error.response) {
                    alert(error.response.data.message);
                 }
                 console.error(error);
              }
             }
  return (
          <>
                <img src={myIcon} className='w-5 h-5 mt-10 ml-15' onClick={()=>navigate("/")} />
                 <div className='w-full min-h-screen flex items-start justify-center'>
                  <Card className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle>Log In To Your account</CardTitle>
                    <CardDescription>
                      Enter your email and password below to login to your account
                    </CardDescription>
                    <CardAction>
                      <Link to='/register' className="hover:underline" >Sign Up</Link>
                    </CardAction>
                  </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <CardContent>
                          <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                              <FieldGroup>                                  
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
                              </FieldGroup>
                            </div>
                          </div>
                      </CardContent>
                      <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                          Log In
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </div>
              </>
  );
}

export default Login;