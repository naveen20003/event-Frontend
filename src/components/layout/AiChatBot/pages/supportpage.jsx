import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";

import SendIcon from "@/components/icons/send";

function SupportPage({setOpen}) {

  console.log(setOpen)
  return (
    <div className="w-full min-h-screen">
      <iframe className="w-full min-h-screen border"
          src="https://app.thinkstack.ai/bot/index.html?chatbot_id=69bfe7889633dc0d6ece394e&type=inline"
        >
      </iframe>
    </div>
  )
}

export default SupportPage;
      {/* <div className="h-1/3">
        <div>ai text</div>
        <div className="h-full flex justify-end bg-gray-200">my text</div>       
       </div>
       <div className="w-full fixed bottom-0 left-0 bg-gray-200 rounded-full mb-4">
         <Textarea placeholder='type a message...'/>
       </div>
       <div>
          <Button className='fixed bottom-0 right-0 rounded-full mb-7 mr-2'><SendIcon /></Button>
       </div>*/}