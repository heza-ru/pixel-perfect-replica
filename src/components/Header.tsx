import { Home, Edit, User, Lock, Volume2, LogOut } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-portal-header text-primary-foreground flex items-center justify-between px-4 h-[45px]">
      {/* Left: Brand */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg tracking-wide">NEOSPIN</span>
        <span className="text-portal-red text-sm">|</span>
        <span className="text-portal-red text-sm">Member Service Portal</span>
      </div>

      {/* Right: Icon buttons */}
      <div className="flex items-center gap-1">
        <HeaderButton color="bg-portal-green"><Home size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-orange"><Edit size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-blue"><User size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-purple"><Lock size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-magenta"><Volume2 size={16} /></HeaderButton>
        <HeaderButton color="bg-portal-red"><LogOut size={16} /></HeaderButton>
      </div>
    </div>
  );
};

const HeaderButton = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <button className={`${color} text-primary-foreground w-9 h-9 flex items-center justify-center rounded-sm hover:opacity-80`}>
    {children}
  </button>
);

export default Header;
