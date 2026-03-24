import { useState } from 'react';
import { Bell, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
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
    <header className="bg-portal-header text-primary-foreground h-[56px] flex items-center px-6 gap-4 z-10 shadow-sm">
      {/* Brand */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <img src="/neospin-new.png" alt="Neospin" className="h-7 w-auto" />
        <span className="text-[hsl(0,0%,50%)] text-sm">|</span>
        <span className="text-[hsl(0,0%,65%)] text-sm font-normal">Administration Portal</span>
      </div>

      {/* Global Search */}
      <div className="relative ml-6 flex-shrink-0">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(0,0%,50%)]" />
        <input
          type="text"
          placeholder="Search members, tasks, reports..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className="bg-[hsl(0,0%,28%)] text-primary-foreground placeholder-[hsl(0,0%,50%)] border border-[hsl(0,0%,35%)] rounded pl-8 pr-4 py-1.5 text-sm w-72 focus:outline-none focus:border-portal-blue focus:bg-[hsl(0,0%,30%)]"
        />
      </div>

      <div className="flex-1" />

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex items-center justify-center w-9 h-9 rounded hover:bg-[hsl(0,0%,30%)] transition-colors"
        >
          <Bell size={18} />
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
          <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[hsl(0,0%,30%)] transition-colors">
            <div className="w-7 h-7 rounded-full bg-portal-blue flex items-center justify-center text-xs font-bold">
              JA
            </div>
            <span className="text-sm font-medium">Jessica Adams</span>
            <ChevronDown size={14} className="text-[hsl(0,0%,60%)]" />
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
    </header>
  );
};

export default AdminHeader;
