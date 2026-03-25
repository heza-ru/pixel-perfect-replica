import { Outlet } from 'react-router-dom';
import MSSHeader from '@/components/mss/MSSHeader';
import MSSSidebar from '@/components/mss/MSSSidebar';

const MSSLayout = () => {
  return (
    <div id="mss-layout" className="min-h-screen flex flex-col">
      <MSSHeader />
      <div className="flex flex-1 overflow-hidden">
        <MSSSidebar />
        <main id="mss-main-content" className="flex-1 overflow-auto bg-[hsl(0,0%,96%)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MSSLayout;
