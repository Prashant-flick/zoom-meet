import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const NavBar = () => {
  return (
    <nav
      className='flex-between fixed z-50 w-full bg-dark-1
      px-6 py-3 lg:px-10'
    >
      <Link
        href="/"
        className='flex-center gap-1'
      >
        <Image 
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt='Xoom Logo'
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold max-sm:hidden'>Xoom</p>
      </Link>

      <div
        className='flex-between'
      >
        <SignedIn>
          <UserButton/>
        </SignedIn>
        
        <MobileNav />
      </div>
    </nav>
  )
}

export default NavBar
