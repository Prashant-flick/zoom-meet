"use client"

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallBtn = () => {
  const call = useCall();
  const router = useRouter()

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id

  if(!isMeetingOwner) return null;
  
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        call.endCall();
        router.push('/');
      }}
      className='bg-red-500'
    >
      End Call for Everyone
    </Button>
  )
}

export default EndCallBtn