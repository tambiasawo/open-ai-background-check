import React from "react";

const Header: React.FC = () => {
  return (
    <header className="shadow-sm text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="">
          <div className="flex items-center justify-between md:justify-start md:space-x-2">
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-[#293074]">
                  AI Intelligent Background Verification
              </h1>
        
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
