import { Button, Navbar, TextInput, Avatar, Dropdown } from 'flowbite-react';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa';
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { menu, close } from "../assets";
import { HiUser,  
  HiDocumentText, 
  HiOutlineUserGroup, 
  HiAnnotation, 
  HiChartPie, 
  } from 'react-icons/hi';
import GradientDefs from './GradientDefs';
import { signoutSuccess } from '../redux/user/userSlice';
export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [toggle, setToggle, setTab] = useState(false);
  const [active, setActive] = useState("");
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  

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

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  


  return (
    <>
    <GradientDefs />
    <Navbar className='border-b-2 bg-transparent sm:px-16 px-6'>
        {/* Dashboard Mobile Menu to replace the Sidebar */}
        {isMobile && currentUser && currentUser.isAdmin && location.pathname.includes('/dashboard') && (
          <>
            <div className='mr-4'>
              {dashboardMenuOpen ? (
                <HiX
                  className='w-[28px] h-[28px] object-contain cursor-pointer'
                  style={{ fill: 'url(#Gradient1)' }}
                  onClick={() => setDashboardMenuOpen(false)}
                />
              ) : (
                <HiMenuAlt1
                  className='w-[28px] h-[28px] object-contain cursor-pointer'
                  style={{ fill: 'url(#Gradient1)' }}
                  onClick={() => setDashboardMenuOpen(true)}
                />
              )}
            </div>
            <div
              className={`${
                dashboardMenuOpen ? "flex" : "hidden"
              } p-6 absolute top-20 left-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl app__navbar`}
            >
              {/* Dashboard menu items */}
              <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                <Link
                  to='/dashboard?tab=dash'
                  onClick={() => {
                    setDashboardMenuOpen(false);
                    setTab("dash");
                  }}
                >
                  <div className="p-2 flex items-center">
                    <HiChartPie className="mr-2" />
                    Dashboard
                  </div>
                </Link>
                <Link 
                  to='/dashboard?tab=profile'
                  onClick={() => {
                    setDashboardMenuOpen(false)
                    setTab("profile")
                  }}
                  >
                  <div className="p-2 flex items-center">
                    <HiUser className="mr-2" />
                    Profile
                  </div>
                </Link>
                <Link to='/dashboard?tab=posts'
                  onClick={() => {
                    setDashboardMenuOpen(false)
                    setTab("posts")
                  }}
                >
                  <div className="p-2 flex items-center">
                    <HiDocumentText className="mr-2" />
                    Posts
                  </div>
                </Link>
                <Link to='/dashboard?tab=users'
                  onClick={() => {
                    setDashboardMenuOpen(false)
                    setTab("users")
                  }}
                >
                  <div className="p-2 flex items-center">
                    <HiOutlineUserGroup className="mr-2" />
                    Users
                  </div>
                </Link>
                <Link to='/dashboard?tab=comments'
                  onClick={() => {
                    setDashboardMenuOpen(false)
                    setTab("comments")
                  }}
                >
                  <div className="p-2 flex items-center">
                    <HiAnnotation className="mr-2" />
                    Comments
                  </div>
                </Link>
                <div className="p-2 cursor-pointer" onClick={handleSignout}>
                  {/* < HiArrowSmRight className='mr-2'/> */}
                  Sign Out
                </div>
              </ul>
              </div>
              </>
              )}

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
                  {currentUser && currentUser.isAdmin && (<Link to="/dashboard?tab=dash">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>)}
                  <Link to="/dashboard?tab=profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignout} >Log out</Dropdown.Item>
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
                className={({ isActive }) => (isActive ? "text-blue-600" : "text-black-300")}
                onClick={() => {
                  setToggle(!toggle);
                  setActive("Home");
                }}
              >
                Home
              </NavLink>
              <NavLink
                to='/about'
                className={({ isActive }) => (isActive ? "text-blue-600" : "text-black-300")}
                onClick={() => {
                  setToggle(!toggle);
                  setActive("About");
                }}
              >
                About
              </NavLink>
              <NavLink
                to='/works'
                className={({ isActive }) => (isActive ? "text-blue-600" : "text-black-300")}
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
                  {currentUser && currentUser.isAdmin && (<Link to="/dashboard?tab=dash">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>)}
                  <Link to="/dashboard?tab=profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignout}>Log out</Dropdown.Item>
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
  </>
  );
}




