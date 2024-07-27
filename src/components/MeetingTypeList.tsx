"use client"

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'

const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | "">("")
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })
  const [callDetails, setcallDetails] = useState<Call>()
  const { toast } = useToast()

  const createMeeting = async() => {
    if(!client || !user) return;

    try {
      if(!values.dateTime){
        toast({
          title: "Please select a date and time",
        })
        return;
      } 

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if(!call) throw new Error('Failed to create call')

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setcallDetails(call);

      if(!values.description){
        router.push(`/meeting/${call.id}`)
      }

      toast({
        title: "Meeting Created",
      })
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create Meeting",
      })
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section
      className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'
    >
      <HomeCard 
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-orange-1"
      />
      <HomeCard 
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invite link"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-blue-1"
      />
      <HomeCard 
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-purple-1"
      />
      <HomeCard 
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-yellow-1"
      />

      {!callDetails ?
        (<MeetingModal 
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState("")}
          title="Create Meeting"
          className="text-center"
          buttonText="Schedule Meeting"
          handleClick={createMeeting}
        >
          <div
            className='flex flex-col gap-2.5'
          >
            <label
              className='text-base text-normal leading-[22px] text-sky-200'
            >
              Add a description
            </label>
            <Textarea 
              className='border-none bg-dark-3'
              onChange={(e) => {
                setvalues({...values, description: e.target.value})
              }}
            />
          </div>
          <div
            className='flex w-full flex-col gap-2.5'
          >
            <label
              className='text-base text-normal leading-[22px] text-sky-200'
            >
              Select Data and Time
            </label>
            <ReactDatePicker 
              selected={values.dateTime}
              onChange={(date) => setvalues({...values, dateTime: date!})}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMM d, yyyy h:mm aa"
              className='w-full rounded bg-dark-3 p-2 focus:outline-none'
            />
          </div>
        </MeetingModal>)
        :
        (<MeetingModal 
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState("")}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          buttonIcon='/icons/copy.svg'
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({title: 'Link Copied'})
          }}
        />)
      }

      <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState("")}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList
