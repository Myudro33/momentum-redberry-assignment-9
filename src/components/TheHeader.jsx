import React from 'react'
import logo from '../assets/momentum-logo.png'
import TheButton from './TheButton'
import { useNavigate } from 'react-router-dom'
const TheHeader = ({setModal}) => {
  const navigate= useNavigate()
  return (
    <div className='w-screen bg-white shadow-md z-50 h-24 px-[7.5rem] py-[1.9rem] fixed flex justify-between items-center'>
      <img className='cursor-pointer' onClick={()=>navigate('/')} src={logo} alt="logo" />
      <div className='grid gap-5 grid-cols-2'>
        <TheButton onClick={()=>{
          localStorage.clear()
          setModal(true)
          navigate('/')
        }} text='თანამშრომლის შექმნა' />
        <TheButton onClick={()=>navigate('/task')} solid text='+ შექმენი ახალი დავალება' />
      </div>
    </div>
  )
}

export default TheHeader
