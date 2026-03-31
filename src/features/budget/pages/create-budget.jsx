import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

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


function CreateBudget() {
  const navigate = useNavigate();
     const { control, 
                 handleSubmit,
                  formState: { errors }} = useForm({
                     resolver: zodResolver(formSchema),
                         defaultValues: {
                         category: "",
                         budgets: "",
                         spent: "",
                         remaining: ""
                        }
           })
     

     const onSubmit = async (data) => {
       try {
         const token = localStorage.getItem('token')
         await axios.post('http://localhost:5000/api/budgets', data,
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
          <div className='w-full min-h-screen bg-white flex items-start justify-center md:justify-start'>
                      <div className='border w-full max-w-md bg-white text-black p-5 rounded-md'>
                          <form onSubmit={handleSubmit(onSubmit)}>
                              <FieldGroup>
                                  <FieldSet>
                                      <FieldLegend>Create Budget</FieldLegend>
                                      <FieldDescription>
                                          Every Field Is Required                       
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

export default CreateBudget;