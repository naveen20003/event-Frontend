import React, { useEffect, useState } from "react";
import AppleLogo from '@/assets/icons/applelogo.png';
import { useForm, useFormState } from "react-hook-form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Profile () {
    const [userspp, setuserspp] = useState({})
    const { register,
           handleSubmit,
           setValue,
           control,
           formState: { errors },
           } = useForm({
                defaultValues: {
                username: "username",
                },
            })
    useEffect(() => {
      const fetchUsers = async () =>{
         try {
            const token =  localStorage.getItem('token')
            const res = await axios.get(`https://event-planner-backend-mu.vercel.app/api/users/profile`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            setuserspp(res.data)

            setValue("username", res.data.username)
            setValue("email", res.data.email)
         } catch (error) {
            console.error(error)
         }
      }
      fetchUsers();
    }, [])
    
    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`https://event-planner-backend-mu.vercel.app/api/users/profile`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data)
            alert(res.data.message)
            setuserspp(res.data)
         } catch (error) {
            console.error(error);
         }
    }
    

 
    return(
        <>
        <div className="w-full flex justify-center mb-20">
            <div className="w-20 h-20">
              <img className="w-full h-full object-cover" src={AppleLogo} alt="" />
            </div>
        </div>
        <div className="grid grid-cols-1 gap-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label className='ml-3 text-md'>your Name</Label>
            <Input {...register("username", {required:true})}/>
            <Label className='ml-3 text-md'>your Email</Label>
            <Input  {...register("email", {required:true})}/>
            <div className="mt-4">
            <Button onClick={()=> Child()} type='submit'>Update</Button>
            </div>
          </form>
        </div>
        </>
        
    )
}

export default Profile;
