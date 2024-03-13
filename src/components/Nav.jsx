'use client';
import React from 'react'
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';

function Nav() {
    const {user, isLoaded} = useUser();
  return (
    <header>
        <nav className='flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-r-0 border-l-0 border-b-gray-600'>
            <div className='flex lg:flex-1'>
                <a  href="/">Credit Football Fantasy</a>
            </div>
            <div>
            {
                isLoaded && user &&  
                <div className='flex items-center'>
                    <Link className='m-2' href="/dashboard">Dashboard</Link>
                    {user.primaryEmailAddress=='pvsalunkhe2003@gmail.com'? <Link className='m-2' href='/admin'>Admin</Link> : <p>Welcome!</p>}
                    <p className='m-2'>{user.fullName}</p>
                    <UserButton className='m-2' afterSignOutUrl='/'/>
                </div>
            }
            {
                !isLoaded && <Link className='m-2' href="/dashboard">Dashboard</Link>
            }
            </div>
        </nav>
    </header>
  )
}

export default Nav