import { Outlet } from 'react-router-dom';
import ESERSHeader from '@/components/esers/ESERSHeader';
import ESERSSidebar from '@/components/esers/ESERSSidebar';

const ESERSLayout = () => {
  return (
    <div id="esers-layout" className="min-h-screen flex flex-col">
      <ESERSHeader />
      <div className="flex flex-1 overflow-hidden">
        <ESERSSidebar />
        <main id="esers-main-content" className="flex-1 overflow-auto bg-[hsl(0,0%,94%)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ESERSLayout;
