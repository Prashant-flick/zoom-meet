"use client"

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setisSetupComplete } : {setisSetupComplete: (value: boolean) => void}) => {
  const [isMicCamOn, setisMicCamOn] = useState(false)

  const call = useCall();

  if(!call){
    throw new Error('usecall must be used within StreamCall component')
  }

  useEffect(() => {
    if(isMicCamOn){
      call?.camera.disable()
      call?.microphone.disable()
    }else{
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [isMicCamOn, call?.camera, call?.microphone])

  return (
    <div
      className='flex justify-center items-center h-screen w-full flex-col gap-3 text-white'
    >
      <h1
        className='text-2xl font-bold'
      >Setup</h1>
        <VideoPreview className=''/>
      <div
        className='flex-center gap-3 h-16'
      >
        <label className='flex-center gap-2 font-medium'>
          <input 
            type="checkbox"
            checked={isMicCamOn}
            onChange={(e) => {setisMicCamOn(e.target.checked)}}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className='rounded-md bg-green-500 px-4 py-2.5'
        onClick={() => {
          call.join();

          setisSetupComplete(true)
        }}
      >
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
