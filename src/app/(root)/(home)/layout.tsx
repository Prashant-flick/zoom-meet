import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "XOOM",
  description: "Video calling platform",
  icons: {
    icon: '/icons/logo.svg'
  }
};


const HomeLayout = ({children} : {children: ReactNode}) => {
  return (
    <main className='relative'>
      <NavBar />

      <div className='flex'>
        <SideBar />

        <section
            className="flex flex-1 min-h-screen flex-col px-6 pt-24 pb-6 max-md:pb-14 sm:px-14"
        >
            <div className='w-full'>
                {children}
            </div>
        </section>
      </div>
    </main>
  )
}

export default HomeLayout
