import React from 'react';
import { TextGenerateEffect } from '../ui/Text_generator';
import { Link, useNavigate } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci"; 
import { useAuth } from '../../hooks/UseAuth'; // Import useAuth hook

const Navbar = () => {
  const auth = useAuth(); // Access auth context
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(); // Call the logout function to clear auth state
    navigate("/signin"); // Redirect to the signin page after logout
  };

  return (
    <header className='fixed left-0 right-0 w-full h-[9vh] bg-black/40 py-4 px-4 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between'>
        <aside className='flex items-center gap-[2px] p-5'>
            <TextGenerateEffect words={"Questor-Ai"} className={"mt-[-13px]"}/>
        </aside>
        
        {/* Middle Nav Links */}
        <nav className='absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block'>
            <ul className='flex items-center gap-4 list-none text-slate-300'>
                <li>
                    <Link to="#">Products</Link>
                </li>
                <li>
                    <Link to="#">Pricing</Link>
                </li>
                <li>
                    <Link to="#">Clients</Link>
                </li>
                <li>
                    <Link to="#">Resources</Link>
                </li>
                <li>
                    <Link to="#">Documentation</Link>
                </li>
                <li>
                    <Link to="#">Enterprise</Link>
                </li>
            </ul>
        </nav>

        {/* Right Side - Conditional Button */}
        <aside className='flex items-center gap-4'>
          {auth.user ? (
            // Show Logout button if the user is authenticated
            <button
              onClick={handleLogout}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Logout
              </span>
            </button>
          ) : (
            // Show Dashboard button if the user is not authenticated
            <Link to={"/dashboard"}>
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Dashboard
                </span>
              </button>
            </Link>
          )}
          <CiMenuBurger className='md:hidden' />
        </aside>
    </header>
  );
};

export default Navbar;
