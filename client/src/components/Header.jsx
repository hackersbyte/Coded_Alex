import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from  'react-icons/ai'
import {FaMoon}  from 'react-icons/fa'
import { useEffect, useState } from 'react';

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);

      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };

  return (
    <Navbar className='border-b-2 bg-transparent sm:px-16 px-6'>
        <Link to="/" className='self-center whitespace-nowrap text-sm
        sm:text-xl font-semibold dark:text-white' >
            <span className='px-3 py-1 bg-gradient-to-r from-blue-500 
            via-indigo-600 to-pink-600 rounded-lg text-white' >Coded Alex</span>
            Blog
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            < AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon/>
            </Button>
        <Link to='signin'>
            <Button gradientDuoTone='purpleToBlue'>Sign In</Button>
        </Link>
        <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'}>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/projects'} as={'div'}>
                <Link to='/projects'>Projects</Link>
            </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
