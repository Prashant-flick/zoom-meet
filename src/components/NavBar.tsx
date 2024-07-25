import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav
      className='flex justify-between fixed z-50 w-full bg-dark-1
      px-6 py-4 lg:px-10'
    >
      <Link
        href="/"
        className='flex items-center gap-1'
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
    </nav>
  )
}

export default NavBar
