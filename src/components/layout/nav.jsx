import React from "react";
import { Link } from "react-router-dom";

function HeaderBar() {
    
  return (
            <div  className="w-full h-20 sticky top-0 z-20 bg-gray-100 flex items-center justify-between">
            <Link to='/' className="px-10 text-xl md:text-3xl">event planner</Link>
          <div className="gap-5 text-xl flex items-center justify-end">
              <Link to="/contact" className="hover:text-blue-500">Contact</Link>
              <Link to="/login" className="hover:text-blue-500">Login</Link>
              <Link to="/register" className="hover:text-blue-500">Register</Link>
            
           </div>
          </div>
        
    

    
  )
}

export default HeaderBar;