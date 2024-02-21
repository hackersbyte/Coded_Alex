import React from 'react'
import { Link } from 'react-router-dom'
import { Label, TextInput, Button } from 'flowbite-react'


export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* left div */}
      <div className='flex-1'>
      <Link to="/" className='
        text-4xl font-bold dark:text-white' >
            <span className='px-3 py-1 bg-gradient-to-r from-blue-500 
            via-indigo-600 to-pink-600 rounded-lg text-white gap-5' >Coded Alex</span>
            Blog
        </Link>
        <p className='text-sm mt-5'>
          Don’t have an account? Sign up for free!
        </p>
      </div>
      {/* right div */}
      <div className='flex-1'>
        <form className='flex flex-col gap-7' >
          <div>
            < Label value='Your Username:'/>
            <TextInput type='text' placeholder='Username' id='username' />
          </div>
          <div>
            < Label value='Your Email:'/>
            <TextInput type='text' placeholder='Email' id='email' />
          </div>
          <div>
            < Label value='Your Password:'/>
            <TextInput type='text' placeholder='Password' id='password' />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit'> Sign Up</Button>
        </form>
      <div className='flex gap-2 text-sm mt-5'>
        <span>Have an account?</span>
        <Link to='/signin' className='text-blue-500'>
          Sign In
        </Link>
      </div>
      </div>
    </div>
    </div>
  )
}


