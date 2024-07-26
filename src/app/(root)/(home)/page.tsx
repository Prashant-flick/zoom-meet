import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})
  const date = (new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  })).format(now);

  

  return (
    <section
      className='flex size-full flex-col gap-10 text-white'
    >
      <div 
        className='h-[250px] w-full rounded-[20px] bg-hero bg-cover'
      >
        <div className='flex justify-between h-full flex-col max-md:px-5 max-md-py-8 lg:p-11 px-6 py-8'>
          <h2
            className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'
          >Upcoming Meeting</h2>
          <div
            className='flex flex-col gap-2'
          >
            <div
              className='h-full w-full flex bottom-0 gap-2'
            >
              <h1 className='text-3xl font-extrabold lg:text-5xl'>
                <span className='text-3xl lg:text-4xl mr-2'>{time.split(' ')[0]}</span>
                <span className='text-lg lg:text-xl'>{time.split(' ')[1]}</span>
              </h1>
            </div>
            
            <p
              className='text-lg font-medium text-sky-200 lg:text-2xl'
            >
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
