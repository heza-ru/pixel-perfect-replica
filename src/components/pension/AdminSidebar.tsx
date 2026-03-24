import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Building2,
  ClipboardList,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { NavPage, NavigateFn } from '@/types/navigation';

interface NavItem {
  key: NavPage;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'members', label: 'Member Portal', icon: Users },
  { key: 'retirement-benefits', label: 'Retirement & Benefits', icon: TrendingUp },
  { key: 'employers', label: 'Employer Portal', icon: Building2 },
  { key: 'work-queue', label: 'Work Queue', icon: ClipboardList, badge: 7 },
  { key: 'reports', label: 'Reports', icon: BarChart3 },
];

const ACTIVE_PAGES: Record<NavPage, NavPage> = {
  'dashboard': 'dashboard',
  'members': 'members',
  'member-profile': 'members',
  'refund-flow': 'members',
  'retirement-flow': 'retirement-benefits',
  'retirement-benefits': 'retirement-benefits',
  'employers': 'employers',
  'work-queue': 'work-queue',
  'reports': 'reports',
};

interface AdminSidebarProps {
  currentPage: NavPage;
  navigate: NavigateFn;
}

const AdminSidebar = ({ currentPage, navigate }: AdminSidebarProps) => {
  const activeKey = ACTIVE_PAGES[currentPage] ?? currentPage;

  return (
    <nav className="w-[220px] min-h-full bg-portal-sidebar text-primary-foreground flex flex-col text-[13px] flex-shrink-0">
      {/* App section label */}
      <div className="px-4 py-3 text-[10px] uppercase tracking-widest text-[hsl(0,0%,50%)] font-semibold border-b border-[hsl(0,0%,28%)]">
        Administration
      </div>

      <div className="flex-1 py-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-portal-sidebar-active text-primary-foreground font-semibold'
                  : 'text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,30%)] hover:text-primary-foreground'
              }`}
            >
              <item.icon size={16} className="flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && (
                <span className="bg-portal-red text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[hsl(0,0%,28%)] px-4 py-3">
        <div className="text-[10px] text-[hsl(0,0%,45%)]">PensionPro v4.2.1</div>
        <div className="text-[10px] text-[hsl(0,0%,45%)]">Fiscal Year: 2024-2025</div>
      </div>
    </nav>
  );
};

export default AdminSidebar;
