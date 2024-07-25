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
      bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'
    >
      <div
        className='flex flex-1 flex-col gap-6'
      >
        {sideBarLinks.map((link) => {
          let isActive = (pathname === link.route || pathname.startsWith(link.route));
          if(pathname!=='/' && link.route==='/'){
            isActive=false;
          }

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                'bg-blue-1': isActive
              })}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
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
