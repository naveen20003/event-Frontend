import React from "react";
import { Link } from "react-router-dom";

function HeaderBar() {
    
  return (
            <div className="w-full h-20 sticky top-0 z-50 bg-gray-100/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-10 shadow-sm">
                  {/* Logo Section */}
                  <div>
                    <Link to='/' className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 block whitespace-nowrap">
                      event planner
                    </Link>
                  </div>
                
                  {/* Navigation Links Section */}
                  <div className="gap-3 sm:gap-6 text-sm sm:text-base md:text-lg flex items-center justify-end font-medium text-gray-700">
                    <Link to="/contact" className="hover:text-blue-600 transition-colors">
                      Contact
                    </Link>
                    <Link to="/login" className="hover:text-blue-600 transition-colors">
                      Login
                    </Link>
                    <Link to="/register" className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm text-xs sm:text-sm">
                      Register
                    </Link>                
                  </div>
              </div>
        
    

    
  )
}

export default HeaderBar;
