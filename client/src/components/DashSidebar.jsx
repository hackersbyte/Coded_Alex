import { Sidebar, Tooltip } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Detect mobile devices

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility state
  };

  const tooltipContent = isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar';
  

        
  return (
    <>
    
    {isMobile && (
        <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
        <button
        className={`absolute top-1/2 transform -translate-y-1/2 left-2 bg-gray-500 text-white p-2 rounded-full
        ${
            isSidebarOpen ? 'left-40' : 'left-2'
          }`}
        onClick={toggleSidebar}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        {isSidebarOpen ? (
            <HiOutlineChevronLeft size={24} />
        ) : (
            <HiOutlineChevronRight size={24} />
        )}
        </button>
        {isHovered && (
            <div 
                className={`absolute top-1/2 transform -translate-y-1/2 ml-2 p-1 bg-gray-700 text-white rounded
                ${isSidebarOpen ? 'left-40' : 'left-12'}`}
            >
                {tooltipContent}
            </div>
        )}
        </div>
    )}

    <Sidebar
        className={`w-full h-screen ${
            isMobile && !isSidebarOpen ? 'w-0 overflow-hidden' : 'w-40 overflow-auto'
        }`}
        >
    
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                {/* {currentUser ( */}
                    <Link to='/dashboard?tab=dash'>
                        <Sidebar.Item 
                            active={tab === 'dash' || !tab} 
                            icon={HiChartPie}
                        >
                            Dashboard
                        </Sidebar.Item>
                    </Link>
                {/* )} */}
                <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item
                        active={tab === 'profile'}
                        icon={HiUser}
                        label={currentUser.isAdmin ? 'Admin' : 'User'}
                        labelColor='dark'
                    >
                        Profile
                    </Sidebar.Item>
                </Link>
                {/* {currentUser.isAdmin && ( */}
                    <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item
                         active={tab === 'posts'}
                         icon={HiDocumentText}
                         as='div'
                        >
                            Posts
                        </Sidebar.Item>
                    </Link>
                {/* // )} */}
                <>
                    <Link to='/dashboard?tab=users'>
                        <Sidebar.Item
                         active={tab === 'users'}
                         icon={HiOutlineUserGroup}
                         as='div'
                        >
                            Users
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=comments'>
                        <Sidebar.Item
                         active={tab === 'comments'}
                         icon={HiAnnotation}
                         as='div'
                        >
                            Comments
                        </Sidebar.Item>
                    </Link>
                </>
                <Sidebar.Item
                 icon={HiArrowSmRight}
                 className='cursor-pointer'
                 onClick={handleSignout}
                >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
      
    </Sidebar>

    </>
  )
}



