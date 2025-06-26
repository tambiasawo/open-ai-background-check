import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="shadow-sm text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="">
          <div className="flex flex-col md:flex-row items-center justify-between md:justify-start md:space-x-2">
             <Image
              src={'/logo.png'}
              alt="logo"
              width="160"
              height={100}
              className="w-[80px] h-[80px]"
            />
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-[#293074]">
                  AI Intelligent Background Verification
              </h1>
             <p className="text-sm text-[#293074] hidden md:block">
                Save money and time by getting instant background verification of your prospect
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
