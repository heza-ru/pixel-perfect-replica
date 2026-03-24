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
    <header className="bg-portal-header text-primary-foreground h-[45px] flex items-center px-4 gap-3">
      {/* Brand */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <img src="/neospin-new.png" alt="Neospin" className="h-6 w-auto" />
        <span className="text-portal-red text-sm">|</span>
        <span className="text-portal-red text-sm">Administration Portal</span>
      </div>

      {/* Global Search */}
      <div className="relative ml-4 flex-shrink-0">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[hsl(0,0%,50%)]" />
        <input
          type="text"
          placeholder="Search members, tasks..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className="bg-[hsl(0,0%,28%)] text-primary-foreground placeholder-[hsl(0,0%,50%)] border border-[hsl(0,0%,35%)] rounded pl-7 pr-3 py-1 text-xs w-56 focus:outline-none focus:border-portal-blue"
        />
      </div>

      <div className="flex-1" />

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex items-center justify-center w-9 h-9 rounded-sm hover:bg-[hsl(0,0%,30%)] transition-colors"
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 bg-portal-red text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-11 w-80 bg-white rounded shadow-xl border border-border z-50 text-foreground">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <span className="font-semibold text-sm">Notifications</span>
              <span className="text-xs text-portal-blue cursor-pointer hover:underline">Mark all read</span>
            </div>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`px-4 py-3 border-b hover:bg-muted cursor-pointer ${n.unread ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start gap-2">
                  {n.unread && <div className="w-2 h-2 rounded-full bg-portal-blue mt-1.5 flex-shrink-0" />}
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
          <button className="flex items-center gap-1.5 px-2 py-1 rounded-sm hover:bg-[hsl(0,0%,30%)] transition-colors">
            <div className="w-6 h-6 rounded-full bg-portal-blue flex items-center justify-center text-[10px] font-bold">
              JA
            </div>
            <span className="text-xs font-medium">Jessica Adams</span>
            <ChevronDown size={12} className="text-[hsl(0,0%,60%)]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold">Jessica Adams</p>
            <p className="text-xs text-muted-foreground">System Administrator</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <User size={14} className="mr-2" /> My Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings size={14} className="mr-2" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive">
            <LogOut size={14} className="mr-2" /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Colored icon buttons — original style */}
      <div className="flex items-center gap-1 ml-2">
        <HeaderButton color="bg-portal-green" onClick={() => navigate('dashboard')}><Home size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-orange" onClick={() => {}}><Edit size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-blue" onClick={() => {}}><User size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-purple" onClick={() => {}}><Lock size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-magenta" onClick={() => {}}><Volume2 size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-red" onClick={() => {}}><LogOut size={16} /></HeaderButton>
      </div>
    </header>
  );
};

const HeaderButton = ({ color, children, onClick }: { color: string; children: React.ReactNode; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`${color} text-primary-foreground w-9 h-9 flex items-center justify-center rounded-sm hover:opacity-80`}
  >
    {children}
  </button>
);

export default AdminHeader;
