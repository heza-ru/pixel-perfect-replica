import { Home, FileText, CheckSquare, ClipboardList, DollarSign, FileEdit, ArrowUpDown, File, ListTodo, User, Mail, ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [yourAccountOpen, setYourAccountOpen] = useState(true);
  const [relatedTaskOpen, setRelatedTaskOpen] = useState(false);
  const [myProfileOpen, setMyProfileOpen] = useState(false);

  return (
    <div className="w-[200px] min-h-screen bg-portal-sidebar text-primary-foreground flex flex-col text-[13px]">
      {/* Alerts & Messages */}
      <div className="flex items-center gap-2 px-4 py-3 hover:bg-portal-sidebar-active cursor-pointer border-b border-[hsl(0,0%,30%)]">
        <Mail size={16} />
        <span>Alerts & Messages</span>
        <span className="ml-auto bg-portal-red text-primary-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">1</span>
      </div>

      {/* Your Account */}
      <div>
        <div
          className="flex items-center gap-2 px-4 py-3 bg-portal-sidebar-active cursor-pointer"
          onClick={() => setYourAccountOpen(!yourAccountOpen)}
        >
          <User size={16} />
          <span className="font-semibold">Your Account</span>
          <ChevronDown size={14} className={`ml-auto transition-transform ${yourAccountOpen ? '' : '-rotate-90'}`} />
        </div>
        {yourAccountOpen && (
          <div className="bg-[hsl(0,0%,26%)]">
            <SidebarItem icon={<Home size={14} />} label="Home" active />
            <SidebarItem icon={<FileText size={14} />} label="Employment Info" />
            <SidebarItem icon={<CheckSquare size={14} />} label="Plan" />
            <SidebarItem icon={<ClipboardList size={14} />} label="Service Purchase Contract" />
            <SidebarItem icon={<DollarSign size={14} />} label="Benefit Estimate" />
            <SidebarItem icon={<FileEdit size={14} />} label="Refund Application" />
            <SidebarItem icon={<ArrowUpDown size={14} />} label="Retirement Application" />
            <SidebarItem icon={<File size={14} />} label="Annual Statement" />
          </div>
        )}
      </div>

      {/* Related Task */}
      <div
        className="flex items-center gap-2 px-4 py-3 hover:bg-portal-sidebar-active cursor-pointer border-t border-[hsl(0,0%,30%)]"
        onClick={() => setRelatedTaskOpen(!relatedTaskOpen)}
      >
        <ListTodo size={16} />
        <span>Related Task</span>
        <ChevronLeft size={14} className="ml-auto" />
      </div>

      {/* My Profile */}
      <div
        className="flex items-center gap-2 px-4 py-3 hover:bg-portal-sidebar-active cursor-pointer border-t border-[hsl(0,0%,30%)]"
        onClick={() => setMyProfileOpen(!myProfileOpen)}
      >
        <User size={16} />
        <span>My Profile</span>
        <ChevronLeft size={14} className="ml-auto" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div className={`flex items-center gap-2 px-6 py-2 cursor-pointer hover:bg-[hsl(0,0%,30%)] ${active ? 'text-primary-foreground' : 'text-[hsl(0,0%,70%)]'}`}>
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
