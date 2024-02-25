import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import { useMediaQuery } from 'react-responsive';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      {!isMobile && (
        <div className="md:w-40 sd:hidden">
          <DashSidebar />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Profile */}
        {tab === 'profile' && <DashProfile />}
      </div>
    </div>
  );
};

export default Dashboard;





