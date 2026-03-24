import { useState } from 'react';
import { NavPage, NavigateFn } from '@/types/navigation';
import AdminHeader from '@/components/pension/AdminHeader';
import AdminSidebar from '@/components/pension/AdminSidebar';
import AdminDashboard from '@/components/pension/AdminDashboard';
import MemberPortal from '@/components/pension/MemberPortal';
import MemberProfile from '@/components/pension/MemberProfile';
import RefundFlow from '@/components/pension/RefundFlow';
import RetirementFlow from '@/components/pension/RetirementFlow';
import EmployerPortal from '@/components/pension/EmployerPortal';
import WorkQueue from '@/components/pension/WorkQueue';
import Reports from '@/components/pension/Reports';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<NavPage>('dashboard');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('M001');

  const navigate: NavigateFn = (page: NavPage, memberId?: string) => {
    setCurrentPage(page);
    if (memberId) setSelectedMemberId(memberId);
    // Scroll to top on navigation
    window.scrollTo({ top: 0 });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard navigate={navigate} />;
      case 'members':
        return <MemberPortal navigate={navigate} />;
      case 'retirement-benefits':
        return <MemberPortal navigate={navigate} filterType="retirement" />;
      case 'member-profile':
        return <MemberProfile memberId={selectedMemberId} navigate={navigate} />;
      case 'refund-flow':
        return <RefundFlow memberId={selectedMemberId} navigate={navigate} />;
      case 'retirement-flow':
        return <RetirementFlow memberId={selectedMemberId} navigate={navigate} />;
      case 'employers':
        return <EmployerPortal navigate={navigate} />;
      case 'work-queue':
        return <WorkQueue navigate={navigate} />;
      case 'reports':
        return <Reports />;
      default:
        return <AdminDashboard navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader navigate={navigate} />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar currentPage={currentPage} navigate={navigate} />
        <main className="flex-1 overflow-auto bg-[hsl(0,0%,96%)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
