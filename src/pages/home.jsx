import React from "react";
import { Button } from "@/components/ui/button";

import EventHome from '../assets/icons/eventhome.jpg'
import AppleLogo from '../assets/icons/applelogo.png'
import TataMotors from '../assets/icons/tatamotors.png'
import RedBull from '../assets/icons/redbull.png'
import TedX from '../assets/icons/tedx.png'

import 
{ Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} 
from '@/components/ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const CardData = 
[
  {
    id: 1,
    feature: 'feature 1',
    title:'🎉 Event Management',
    description: 'Plan and organize your events seamlessly from start to finish. Create events, set dates, choose locations, and manage all event details in one place for a smooth execution.',
  },
  {
    id: 2,
    feature: 'feature 2',
    title:'✅ Task Management',
    description: 'Stay on track with all your event-related tasks. Create, assign, and monitor tasks with deadlines to ensure nothing is missed during the planning process.',
   },
   {
    id: 3,
    feature: 'feature 3',
    title:'👥 Guest Management',
    description: 'Easily manage your guest list with RSVP tracking. Add guests, organize contact details, and keep track of attendance to ensure a well-coordinated event.',
   },
  {
    id: 4,
    feature: 'feature 4',
    title:'💰 Budgeting',
    description: 'Control your event expenses efficiently. Set budgets, track spending, and monitor costs in real-time to avoid overspending and stay within your financial plan.',
  }
]
const PricingCardData = 
[
  {
    id: 1,
    feature: '🟢 Basic Plan (Free / ₹0)',
    title:'Best for beginners & small events',
    li1: '🎉 Event Management (limited events)',
    li2: '✅ Task Management (basic tasks)',
    li3: '👥 Guest Management (up to 50 guests)',
    li4: '💰 Budget Tracking (simple overview)',
    li5: '📱 Basic dashboard UI',
    footer: '👉 Perfect for personal use or small functions'
  },
  {
    id: 2,
    feature: '🔵 Pro Plan (₹199 / month)',
    title:'For serious planners & growing events',
    li1: '🎉 Unlimited Events',
    li2: '✅ Advanced Task Management (deadlines + status tracking)',
    li3: '👥 Guest Management (up to 500 guests + RSVP tracking)',
    li4: '💰 Smart Budgeting (expense categories + insights)',
    li5: '📊 Analytics Dashboard',
    footer: '👉 Best for freelancers & event organizers'
   },
   {
    id: 3,
    feature: '🟣 Premium Plan (₹499 / month)',
    title:'For professionals & agencies',
    li1: '🎉 Unlimited Events + Team Collaboration',
    li2: '✅ Task Assignment (multi-user + roles)',
    li3: '👥 Unlimited Guests + advanced RSVP system',
    li4: '💰 Advanced Budgeting (reports + export)',
    li5: '📊 Full Analytics + Reports',
    footer: '👉 Built for agencies & large-scale events'
   },
]
const ReviewsCardData = 
[
  {
    id: 1,
    Image: {AppleLogo},
    Name: 'Rohit Sharma ⭐⭐⭐⭐⭐',
    review:' “This app made organizing my sister’s wedding so much easier. The event and guest management features are super smooth and saved me a lot of time.”',
  },
  {
    id: 2,
    Image: {TedX},
    Name: 'Priya Mehta ⭐⭐⭐⭐',
    review:' “I love how clean and simple the interface is. Task management helped me stay on track, and I didn’t miss a single deadline!”',
  },
  {
    id: 3,
    Image: {TataMotors},
    Name: 'Aman Verma ⭐⭐⭐⭐⭐',
    review:' “The budgeting feature is a lifesaver. I was able to track every expense and stay within budget for my event.”',
  },
  {
    id: 4,
    Image: {RedBull},
    Name: 'Rahul Jain ⭐⭐⭐⭐⭐',
    review:' “This feels like a premium app. Everything from planning to execution is handled in one place. Highly recommended!”',
  },
  {
    id: 5,
    Image: {AppleLogo},
    Name: 'Sneha Kapoor ⭐⭐⭐⭐⭐',
    review:' “Guest management with RSVP tracking is just perfect. It made coordination so much easier for my corporate event.”',
  },
  {
    id: 6,
    Image: {TedX},
    Name: 'Neha Gupta ⭐⭐⭐⭐⭐',
    review:' “The UI is beautiful and very easy to use. Even as a beginner, I could manage my event without any confusion.”',
  },
  
]

function Home() {
  return (
    <div className="sm:p-5 relative">
      <div className="w-full h-[700px] p-4 grid grid-cols-1 sm:grid-cols-2 sm:h-[500px] ">
        <div className="border bg-gray text-xm p-3 font-bold rounded-md text-gray-700 grid grid-cols-1 gap-10 shadow">
          <div className="w-full h-full flex justify-center items-center ml-4 sm:justify-start items-end mr-20 md:mr-40">
            Manage and plan your event like never before
          </div>
          <div className="flex justify-center items-start mr-17 gap-6 sm:justify-start">
            <Button variant="outline"  size="" className='border'>
              Log in
            </Button>
            <Button className='bg-sky-700'>
              Sign Up
            </Button>
          </div>
        </div>
        <div className="text-xm font-bold text-blue-600 outline-blue-500 shadow-lg overflow-hidden">
          <img src={EventHome} className="w-full h-full object-cover" />
        </div>
      </div>
       <div className="mt-10 mb-10 flex justify-center">
        What Features This App Offers?
       </div>
       <div className="w-full h-fit  p-5">
        <div className=" gap-5 p-5 shadow-lg grid grid-cols-1 sm:grid-cols-2">
          {CardData.map((c)=>(
            <Card  size="sm" key={c.id}>
              <CardHeader >
                <CardTitle>{c.feature}</CardTitle>
                <CardDescription>
                  {c.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {c.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
       </div>
       <div className="mt-10 mb-10 text-bold flex justify-center">
        Our Customers
       </div>
       <div className="w-full h-fit p-5 flex justify-center">
        <div className="overflow-hidden rounded-md gap-20 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
            <div>
              <img className="w-full h-full object-fill" src={AppleLogo}/>
            </div>
            <div>
              <img className="w-full h-full object-fill" src={TataMotors}/>
            </div>
            <div>
              <img className="w-full h-full object-fill" src={RedBull}/>
            </div>
            <div className="">
              <img className="w-full h-full object-fill" src={TedX}/>
            </div>
        </div>
       </div>
       <div className="mt-10 mb-10 flex justify-center">
           What Our Customers Says
       </div>
       <div className="w-full flex justify-center">
          <Carousel className="w-full max-w-md">
            
            <CarouselContent>
              {ReviewsCardData.map((r) => (
                <CarouselItem key={r.id}>
                  <div className="flex flex-col items-center text-center p-6 border rounded-xl shadow bg-white">
                    
                    {/* Profile Image */}
                    <img 
                      className="w-16 h-16 rounded-full object-cover mb-3" 
                      src={AppleLogo}
                    />

                    {/* Name */}
                    <p className="text-sm text-gray-500 mb-2">~ {r.Name}</p>

                    {/* Review */}
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {r.review}
                    </p>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />

          </Carousel>
       </div>
       <div className="mt-10 mb-10 flex justify-center">
           Pricing And Plans
       </div>
       <div className="w-full h-fit p-5">
        <div className=" gap-5 p-5 border grid shadow-lg grid-cols-1 sm:grid-cols-3">
          {PricingCardData.map((c)=>(
            <Card  size="sm" key={c.id}>
              <CardHeader >
                <CardTitle className='flex justify-center'>{c.feature}</CardTitle>
                <CardDescription>
                  {c.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ml-6 grid gap-3">
                    <li >
                      {c.li1}
                    </li>
                    <li >
                      {c.li2}
                    </li>
                    <li >
                      {c.li3}
                    </li>
                    <li >
                      {c.li4}
                    </li>
                    <li >
                      {c.li5}
                    </li>
                </div>
                <CardFooter>
                   {c.footer}
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
       </div>
       <div className="w-full h-min-screen absolute bg-gray-100 border-t shadow">
          <div className="p-5 flex justify-center">
             All @Copyright Reserved To Event Planner
          </div>
       </div>
   </div>
  );
}

export default Home;