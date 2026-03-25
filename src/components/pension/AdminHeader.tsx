import { useState } from 'react';
import { Bell, Search, ChevronDown, User, Settings, LogOut, Home, Edit, Lock, Volume2 } from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminHeaderProps {
  navigate: NavigateFn;
}

const AdminHeader = ({ navigate }: AdminHeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: '3 contribution upload errors require attention', time: '5 min ago', unread: true },
    { id: 2, text: 'Retirement application TSK-1042 needs review', time: '1 hr ago', unread: true },
    { id: 3, text: 'Refund for M. Garcia approved for processing', time: '2 hr ago', unread: false },
    { id: 4, text: 'New member enrollment: Lisa Wei Chen (M005)', time: '3 hr ago', unread: false },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      const q = searchValue.toLowerCase();
      if (q.includes('member') || q.includes('profile') || q.includes('m00')) {
        navigate('members');
      } else if (q.includes('task') || q.includes('queue') || q.includes('work')) {
        navigate('work-queue');
      } else if (q.includes('report')) {
        navigate('reports');
      } else if (q.includes('employer') || q.includes('upload')) {
        navigate('employers');
      } else {
        navigate('members');
      }
      setSearchValue('');
    }
  };

  return (
    <header id="app-header" role="banner" className="bg-portal-header text-primary-foreground h-[45px] flex items-center px-4 gap-3">
      {/* Brand */}
      <div id="brand-logo" className="flex items-center gap-2 flex-shrink-0">
        <img src="/neospin-new.png" alt="Neospin logo" className="h-6 w-auto" />
        <span className="text-portal-red text-sm" aria-hidden="true">|</span>
        <span className="text-portal-red text-sm">Administration Portal</span>
      </div>

      {/* Global Search */}
      <div id="global-search-wrapper" className="relative ml-4 flex-shrink-0">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[hsl(0,0%,50%)]" aria-hidden="true" />
        <input
          id="global-search-input"
          type="search"
          role="searchbox"
          aria-label="Search members, tasks, reports — press Enter to navigate"
          placeholder="Search members, tasks..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className="bg-[hsl(0,0%,28%)] text-primary-foreground placeholder-[hsl(0,0%,50%)] border border-[hsl(0,0%,35%)] rounded pl-7 pr-3 py-1 text-xs w-56 focus:outline-none focus:border-portal-blue"
        />
      </div>

      <div className="flex-1" />

      {/* Notifications */}
      <div id="notifications-wrapper" className="relative">
        <button
          id="notifications-btn"
          aria-label="Notifications — 2 unread"
          aria-haspopup="true"
          aria-expanded={showNotifications}
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex items-center justify-center w-9 h-9 rounded-sm hover:bg-[hsl(0,0%,30%)] transition-colors"
        >
          <Bell size={16} aria-hidden="true" />
          <span aria-hidden="true" className="absolute top-1 right-1 bg-portal-red text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>

        {showNotifications && (
          <div id="notifications-panel" role="dialog" aria-label="Notifications panel" className="absolute right-0 top-11 w-80 bg-white rounded shadow-xl border border-border z-50 text-foreground">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <span className="font-semibold text-sm">Notifications</span>
              <button
                id="notifications-mark-read-btn"
                aria-label="Mark all notifications as read"
                className="text-xs text-portal-blue cursor-pointer hover:underline"
              >
                Mark all read
              </button>
            </div>
            {notifications.map((n) => (
              <div
                key={n.id}
                id={`notification-item-${n.id}`}
                role="listitem"
                aria-label={`Notification: ${n.text}`}
                className={`px-4 py-3 border-b hover:bg-muted cursor-pointer ${n.unread ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start gap-2">
                  {n.unread && <div aria-label="Unread" className="w-2 h-2 rounded-full bg-portal-blue mt-1.5 flex-shrink-0" />}
                  {!n.unread && <div className="w-2 h-2 mt-1.5 flex-shrink-0" />}
                  <div>
                    <p className="text-xs leading-relaxed">{n.text}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="px-4 py-2 text-center">
              <button
                id="notifications-view-all-btn"
                aria-label="View all tasks in Work Queue"
                onClick={() => { navigate('work-queue'); setShowNotifications(false); }}
                className="text-xs text-portal-blue hover:underline"
              >
                View all in Work Queue
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id="user-profile-btn"
            aria-label="User profile menu — Jessica Adams, System Administrator"
            className="flex items-center gap-1.5 px-2 py-1 rounded-sm hover:bg-[hsl(0,0%,30%)] transition-colors"
          >
            <div id="user-avatar" aria-hidden="true" className="w-6 h-6 rounded-full bg-portal-blue flex items-center justify-center text-[10px] font-bold">
              JA
            </div>
            <span className="text-xs font-medium">Jessica Adams</span>
            <ChevronDown size={12} className="text-[hsl(0,0%,60%)]" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent id="user-profile-menu" align="end" className="w-48">
          <div id="user-profile-info" className="px-3 py-2">
            <p className="text-sm font-semibold">Jessica Adams</p>
            <p className="text-xs text-muted-foreground">System Administrator</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem id="user-menu-profile" aria-label="My profile" className="cursor-pointer">
            <User size={14} className="mr-2" aria-hidden="true" /> My Profile
          </DropdownMenuItem>
          <DropdownMenuItem id="user-menu-settings" aria-label="System settings" className="cursor-pointer">
            <Settings size={14} className="mr-2" aria-hidden="true" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem id="user-menu-logout" aria-label="Sign out of the portal" className="cursor-pointer text-destructive">
            <LogOut size={14} className="mr-2" aria-hidden="true" /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Colored icon buttons */}
      <div id="header-quick-actions" role="toolbar" aria-label="Quick action buttons" className="flex items-center gap-1 ml-2">
        <HeaderButton id="header-btn-home" aria-label="Go to Dashboard" color="bg-portal-green" onClick={() => navigate('dashboard')}>
          <Home size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton id="header-btn-members" aria-label="Go to Member Portal" color="bg-portal-orange" onClick={() => navigate('members')}>
          <Edit size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton id="header-btn-user" aria-label="Go to Member Portal" color="bg-portal-blue" onClick={() => navigate('members')}>
          <User size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton id="header-btn-reports" aria-label="Go to Reports" color="bg-portal-purple" onClick={() => navigate('reports')}>
          <Lock size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton id="header-btn-notifications" aria-label="Open notifications" color="bg-portal-magenta" onClick={() => setShowNotifications(!showNotifications)}>
          <Volume2 size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton id="header-btn-logout" aria-label="Sign out" color="bg-portal-red" onClick={() => {}}>
          <LogOut size={16} aria-hidden="true" />
        </HeaderButton>
      </div>
    </header>
  );
};

const HeaderButton = ({
  id, color, children, onClick, 'aria-label': ariaLabel,
}: {
  id: string;
  color: string;
  children: React.ReactNode;
  onClick: () => void;
  'aria-label': string;
}) => (
  <button
    id={id}
    aria-label={ariaLabel}
    onClick={onClick}
    className={`${color} text-primary-foreground w-9 h-9 flex items-center justify-center rounded-sm hover:opacity-80`}
  >
    {children}
  </button>
);

export default AdminHeader;
