import { DarkThemeToggle } from 'flowbite-react'
import React from 'react'
import SignInForm from '../components/SignInForm'

const SignIn: React.FC = () => {
  return (
    <div className='m-10 p-10 max-w-6xl dark:bg-gray-700'>
        <DarkThemeToggle />
        <SignInForm/>
    </div>
  )
}

export default SignIn