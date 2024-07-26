'use client'

import { sideBarLinks } from '@/Constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {
  const pathname = usePathname();

  return (
    <section
      className='flex sticky left-0 top-0 w-fit h-screen flex-col justify-between 
      bg-dark-1 p-6 pt-24 text-white max-sm:hidden lg:w-[264px]'
    >
      <div
        className='flex flex-1 flex-col gap-4'
      >
        {sideBarLinks.map((link) => {
          let isActive = (pathname === link.route || pathname.startsWith(`${link.route}/`));

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn('flex gap-4 items-center p-4 rounded-lg justify-start h-12', {
                'bg-blue-1': isActive
              })}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={20}
                height={20}
              />
              <p className='text-lg font-semibold max-lg:hidden'>
                {link.label}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default SideBar
