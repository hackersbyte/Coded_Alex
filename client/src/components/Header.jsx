import { Button, Navbar, TextInput, Avatar, Dropdown } from 'flowbite-react';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { menu, close } from "../assets";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("");

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
        sm:text-xl font-semibold dark:text-white mr-5' >
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
      <Button className='w-12 h-10 lg:hidden ' color='gray' pill>
        < AiOutlineSearch />
      </Button>
      {isMobile ? (
        <>
          <div className='flex flex-1 justify-end items-center'>
            <div className='mr-4'>
              <Button
                className='w-12 h-10'
                color='gray'
                pill
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === 'light' ? <FaSun /> : <FaMoon />}
              </Button>
            </div>
            <div>
              {currentUser ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className='block text-sm'> @{currentUser.username}</span>
                    <span className='block text-xs text-gray-400'>
                      {currentUser.email}
                    </span>
                  </Dropdown.Header>
                  <Link to="/dashboard?tab=dash">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                  <Link to="/dashboard?tab=profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item >Log out</Dropdown.Item>
                </Dropdown>
              ) : (
                <Link to='signin'>
                  <Button gradientDuoTone='purpleToBlue' outline >Sign In</Button>
                </Link>
              )}
            </div>
            <div className='ml-4'>
              <img
                src={toggle ? close : menu}
                alt='menu'
                className='w-[28px] h-[28px] object-contain'
                onClick={() => setToggle(!toggle)}
              />
            </div>
          </div>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl app__navbar`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? "text-blue-600" : "text-gray-300")}
                onClick={() => {
                  setToggle(!toggle);
                  setActive("Home");
                }}
              >
                Home
              </NavLink>
              <NavLink
                to='/about'
                className={({ isActive }) => (isActive ? "text-blue-600" : "text-gray-300")}
                onClick={() => {
                  setToggle(!toggle);
                  setActive("About");
                }}
              >
                About
              </NavLink>
              <NavLink
                to='/works'
                className={({ isActive }) => (isActive ? "text-blue-600" : "text-gray-300")}
                onClick={() => {
                  setToggle(!toggle);
                  setActive("Works");
                }}
              >
                Projects
              </NavLink>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Navbar.Collapse>
            <div className='flex gap-2 md:order-2'>
              <Button
                className='w-12 h-10 hidden sm:inline'
                color='gray'
                pill
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === 'light' ? <FaSun /> : <FaMoon />}
              </Button>
              {currentUser ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                  }
                >
                  <Dropdown.Header>
                    <span className='block text-sm'> @{currentUser.username}</span>
                    <span className='block text-xs text-gray-400'>
                      {currentUser.email}
                    </span>
                  </Dropdown.Header>
                  <Link to="/dashboard?tab=dash">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                  <Link to="/dashboard?tab=profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item >Log out</Dropdown.Item>
                </Dropdown>
              ) : (
                <Link to='signin'>
                  <Button gradientDuoTone='purpleToBlue' outline >Sign In</Button>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
}




