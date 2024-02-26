/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import {Link, useNavigate }  from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice'
import OAuth from '../components/OAuth';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' >
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-500 
            via-indigo-600 to-pink-600  rounded-lg text-white'>
              Coded Alex
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email'/>
              <TextInput 
                type="email"
                placeholder='Email address'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div >
              <Label value='Your Password'/>
              <TextInput
                type={showPassword ? 'text' : 'password'}
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
               {isMobile ? (
                <button
                  type='button'
                  className='text-gray-500 cursor-pointer right-3 top-2/4 absolute -translate-x-3/4 -translate-y-3/4'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <RiEyeCloseFill size='20' /> : <RiEyeFill size='20' />}
                </button>
              ) : (
                <button
                  type='button'
                  className='text-sm text-gray-500 cursor-pointer'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'} Password
                </button>
              )}
              </div>
            <Button gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner  size='md'/>
                  <span className='pl-3'>Loading...</span>
                </>
              )
            : (
              'Sign In'
            )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an account?</span>
            <Link to='/signup' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
      
    </div>
  )
}


