import axios from 'axios';
import React,{ useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm,Controller } from 'react-hook-form';


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
  category: z.string().min(2, {
    message: "Category is required"
  }),
  budgets: z.coerce
      .number().min(1, {
    message: "Budget is required",
  }),
  spent: z.coerce
      .number().min(1, {
    message: "Status is required"
  }),
  remaining: z.coerce
      .number().min(1, {
   message: "Guest Phone Number is required"
 }),
  

})



function UpdateBudget() {
  const navigate = useNavigate();
  const { id } = useParams();
     const { control, 
                      handleSubmit,
                      reset,
                       formState: { errors }} = useForm({
                          resolver: zodResolver(formSchema),
                              defaultValues: {
                              category: "",
                              budgets: "",
                              spent: "",
                              remaining: ""
                             }
                })

     useEffect(() => {
       const fetchBudgets = async () =>{
        try {
            const  token = localStorage.getItem('token')
            const updbudget = await axios.get(`http://localhost:5000/api/budgets/${id}`,
                {
                    headers: {
                        Authorization: ` bearer ${token}`
                    }
                }
            )
            reset(updbudget.data)
        } catch (error) {
            console.error(error)
        }}
       fetchBudgets();
     }, [id,reset])
     
     

     const onSubmit = async (data) => {
       try {
        const token = localStorage.getItem('token')
         await axios.put(`http://localhost:5000/api/budgets/${id}`, data,
            {
                headers: {
                    Authorization: `bearer ${token}`
                }
            }
         );
         navigate('/budgeting')
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
                                      <FieldLegend>Edit Budget</FieldLegend>
                                      <FieldDescription>
                                          If You Want To Change Any Of The Fields Feel Free TO change It.                       
                                      </FieldDescription>
                                      <FieldGroup>
                                          <Field>
                                              <Controller
                                                  name="category"
                                                  control={control}
                                                  render={({ field }) => (
                                                      <div>
          
                                                      <Input
                                                          placeholder="Category"
                                                          {...field}
                                                      />
          
                                                      {errors.category && (
                                                          <p className="text-red-500 text-sm">
                                                          {errors.category.message}
                                                          </p>
                                                      )}
          
                                                      </div>
                                                  )}
                                                  />
                                          </Field>
                                          <Field>                           
                                              <Controller
                                                  name="budgets"
                                                  control={control}
                                                  render={({ field }) => (
                                                      <div>
          
                                                      <Input
                                                          type="number"
                                                          placeholder="Budgets"
                                                          {...field}
                                                      />
          
                                                      {errors.budgets && (
                                                          <p className="text-red-500 text-sm">
                                                          {errors.budgets.message}
                                                          </p>
                                                      )}
          
                                                      </div>
                                                  )}
                                                  />
                                          </Field>  
                                          <Field>
                                              <Controller
                                                  name="spent"
                                                  control={control}
                                                  render={({ field }) => (
                                                      <div>
          
                                                      <Input
                                                      type="number"
                                                          placeholder="Spent"
                                                          {...field}
                                                      />
          
                                                      {errors.spent && (
                                                          <p className="text-red-500 text-sm">
                                                          {errors.spent.message}
                                                          </p>
                                                      )}
          
                                                      </div>
                                                  )}
                                                  />
                                          </Field>                      
                                          <Field>
                                              <Controller
                                                  name="remaining"
                                                  control={control}
                                                  render={({ field }) => (
                                                      <div>
          
                                                      <Input
                                                      
                                                          placeholder="Remaining"
                                                          {...field}
                                                      />
          
                                                      {errors.remaining && (
                                                          <p className="text-red-500 text-sm">
                                                          {errors.remaining.message}
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
                                      <Button onClick={()=> navigate('/budgeting')} variant="outline" type="button" className='text-black'>
                                          Cancel
                                      </Button>
                                  </Field>
                              </FieldGroup>
                          </form>
                      </div>
          </div>
  )
}

export default UpdateBudget;