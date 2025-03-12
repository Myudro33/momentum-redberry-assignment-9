import React from 'react'
import logo from '../assets/momentum-logo.png'
import TheButton from './TheButton'
const TheHeader = () => {
  return (
    <div className='w-screen h-24 px-[7.5rem] py-[1.9rem] fixed flex justify-between items-center'>
      <img src={logo} alt="logo" />
      <div className='grid gap-5 grid-cols-2'>
        <TheButton  text='თანამშრომლის შექმნა' />
        <TheButton solid text='+ შექმენი ახალი დავალება' />
      </div>
    </div>
  )
}

export default TheHeader
