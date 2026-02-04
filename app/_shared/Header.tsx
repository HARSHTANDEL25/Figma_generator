'use client'
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'


const Header = () => {
  const router = useRouter();
  const {user} = useUser();

  return (
    <div className=" bg-[#0F172A] w-full sticky top-0 z-50">
      <div className="flex justify-between items-center p-4 gap-4  max-w-[1440px] mx-auto">
        <div>
          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
            className="rounded-md"
          />
        </div>
        <div className="flex gap-7 items-center text-slate-300 font-medium text-lg">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
        
        {
          !user?
         <SignInButton  mode="modal">
          <button className="bg-[linear-gradient(90deg,_#1D91D0,_#8F37D7)] text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer">
            Get started
          </button>
         </SignInButton>
          :
          <UserButton  />
        }
      </div>
    </div>
  );
};

export default Header;
