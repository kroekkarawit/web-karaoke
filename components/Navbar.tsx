import React from "react";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="flex justify-between pt-2 pl-2 md:pt-8 md:pl-10 md:pr-10  align-middle">
      <div className="flex justify-start">
        <div className="w-6 h-6 mr-4 hidden md:flex">
        <Image
          src="/assets/images/logo.png"
          width={100}
          height={100}
          alt="logo"
        />
        </div>
        
        <div className="text-lg font-semibold text-[#161618]">WEB-KARAOKE</div>
      </div>

      <div className="text-lg font-semibold text-[#161618] hidden md:flex">Contact Us</div>
      <div className="w-6 h-6 mr-4 md:hidden flex">
        <Image
          src="/assets/icons/menu-burger.svg"
          width={100}
          height={100}
          alt="logo"
        />
        </div>
    </div>
  );
};

export default Navbar;
