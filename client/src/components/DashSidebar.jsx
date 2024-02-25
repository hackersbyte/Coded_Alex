import { Sidebar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { HiUser, 
    HiArrowSmRight, 
    HiDocumentText, 
    HiOutlineUserGroup, 
    HiAnnotation, 
    HiChartPie, 
    } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useMediaQuery } from 'react-responsive';


export default function DashSidebar({ visible, toggleSidebar }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  const [isHovered ] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

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

  return (
    <>

      <Sidebar className={`w-full h-screen ${isMobile ? 'w-0 overflow-hidden' : 'w-40 overflow-auto'}`}>


        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item active={tab === 'dash' || !tab} icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=profile'>
              <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark'>
                Profile
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText}>
                Posts
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup}>
                Users
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation}>
                Comments
              </Sidebar.Item>
            </Link>
            <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
