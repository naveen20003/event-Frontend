import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


{/*onClick={()=>navigate('/dashboard')}*/}

function AiChatSupport() {
  const navigate = useNavigate();
  //const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-full sticky bottom-0 flex justify-end items-end">
        <Avatar size="lg" className='mr-2 mb-15 absolute' onClick={()=>navigate('/support')}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
         
        <AvatarFallback>CN</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
    </div>
  )
}

export default AiChatSupport;