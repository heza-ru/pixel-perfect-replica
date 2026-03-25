import { useNavigate } from 'react-router-dom';
import { Home, Edit, User, Lock, Volume2, LogOut } from 'lucide-react';

const MSSHeader = () => {
  const navigate = useNavigate();

  return (
    <header
      id="mss-app-header"
      role="banner"
      className="bg-portal-header text-primary-foreground h-[45px] flex items-center px-4 gap-3 flex-shrink-0"
    >
      {/* Brand */}
      <div id="mss-brand-logo" className="flex items-center gap-2 flex-shrink-0">
        <img src="/neospin-new.png" alt="Neospin logo" className="h-6 w-auto" />
        <span className="text-white font-bold text-sm">NEOSPIN</span>
        <span className="text-portal-red text-sm" aria-hidden="true">|</span>
        <span className="text-portal-red text-sm">Member Service Portal</span>
      </div>

      <div className="flex-1" />

      {/* Colored icon buttons */}
      <div
        id="mss-header-quick-actions"
        role="toolbar"
        aria-label="Quick action buttons"
        className="flex items-center gap-1"
      >
        <HeaderButton
          id="mss-header-btn-home"
          aria-label="Go to MSS Dashboard"
          color="bg-portal-green"
          onClick={() => navigate('/mss/dashboard')}
        >
          <Home size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton
          id="mss-header-btn-edit"
          aria-label="Edit"
          color="bg-portal-orange"
          onClick={() => {}}
        >
          <Edit size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton
          id="mss-header-btn-user"
          aria-label="User profile"
          color="bg-portal-blue"
          onClick={() => {}}
        >
          <User size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton
          id="mss-header-btn-lock"
          aria-label="Security settings"
          color="bg-portal-purple"
          onClick={() => {}}
        >
          <Lock size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton
          id="mss-header-btn-volume"
          aria-label="Notifications"
          color="bg-portal-magenta"
          onClick={() => {}}
        >
          <Volume2 size={16} aria-hidden="true" />
        </HeaderButton>
        <HeaderButton
          id="mss-header-btn-logout"
          aria-label="Sign out — return to login"
          color="bg-portal-red"
          onClick={() => navigate('/mss/login')}
        >
          <LogOut size={16} aria-hidden="true" />
        </HeaderButton>
      </div>
    </header>
  );
};

const HeaderButton = ({
  id,
  color,
  children,
  onClick,
  'aria-label': ariaLabel,
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

export default MSSHeader;
