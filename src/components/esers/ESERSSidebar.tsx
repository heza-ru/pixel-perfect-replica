import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  LayoutDashboard,
  Building2,
  Users,
  ChevronDown,
  ChevronLeft,
  FileSpreadsheet,
  Upload,
  FileClock,
  Mail,
  Phone,
  Banknote,
  UserPlus,
  GitBranch,
  Calendar,
  BarChart3,
  FileText,
  Landmark,
} from 'lucide-react';

// eSERS olive-green sidebar theme (matches screenshot)
const SIDEBAR_BG  = 'bg-[hsl(82,25%,26%)]';
const SECTION_BG  = 'bg-[hsl(82,52%,37%)]';    // bright grass-green for section headers
const SUB_BG      = 'bg-[hsl(82,25%,20%)]';
const ITEM_ACTIVE = 'bg-[hsl(82,52%,37%)] text-white font-semibold';
const ITEM_IDLE   = 'text-[hsl(0,0%,82%)] hover:bg-[hsl(82,25%,34%)] hover:text-white';

const ESERSSidebar = () => {
  const location = useLocation();
  const [orgOpen, setOrgOpen] = useState(true);
  const [payrollOpen, setPayrollOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-[7px] text-[11.5px] w-full cursor-pointer transition-colors ${
      isActive(path) ? ITEM_ACTIVE : ITEM_IDLE
    }`;

  return (
    <nav
      id="esers-app-sidebar"
      role="navigation"
      aria-label="eSERS navigation"
      className={`w-[205px] min-h-full ${SIDEBAR_BG} text-white flex flex-col text-[12px] flex-shrink-0`}
    >
      {/* Alert and Messages */}
      <div
        id="esers-sidebar-alerts"
        className={`flex items-center gap-2 px-4 py-[9px] border-b border-[hsl(82,25%,32%)] ${ITEM_IDLE} cursor-pointer`}
        role="button"
        aria-label="Alert and Messages — 72 unread"
        tabIndex={0}
      >
        <Bell size={13} aria-hidden="true" />
        <span className="flex-1 text-[11.5px]">Alert and Messages</span>
        <span
          id="esers-alerts-badge"
          aria-label="72 unread messages"
          className="bg-portal-red text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
        >
          72
        </span>
      </div>

      {/* Dashboard */}
      <Link
        to="/esers/dashboard"
        id="esers-nav-dashboard"
        aria-label="Dashboard"
        aria-current={isActive('/esers/dashboard') ? 'page' : undefined}
        className={linkClass('/esers/dashboard')}
      >
        <LayoutDashboard size={13} aria-hidden="true" />
        <span>Dashboard</span>
      </Link>

      {/* Organization Information — bright green header */}
      <div id="esers-sidebar-org">
        <button
          id="esers-sidebar-org-toggle"
          aria-label="Toggle Organization Information section"
          aria-expanded={orgOpen}
          onClick={() => setOrgOpen(!orgOpen)}
          className={`w-full flex items-center gap-2 px-4 py-[8px] text-[11.5px] font-semibold text-white transition-colors ${SECTION_BG}`}
        >
          <Building2 size={13} aria-hidden="true" />
          <span className="flex-1 text-left">Organization Information</span>
          <ChevronLeft size={13} aria-hidden="true" className={`transition-transform ${orgOpen ? '-rotate-90' : ''}`} />
        </button>

        {orgOpen && (
          <div id="esers-sidebar-org-items" className={SUB_BG}>
            <Link to="/esers/organization" id="esers-nav-org-maintenance" aria-label="Organization Maintenance" aria-current={isActive('/esers/organization') ? 'page' : undefined} className={linkClass('/esers/organization')}>
              <Building2 size={11} aria-hidden="true" /><span>Organization Maintenance</span>
            </Link>
            <Link to="/esers/contacts" id="esers-nav-contacts" aria-label="Contacts" aria-current={isActive('/esers/contacts') ? 'page' : undefined} className={linkClass('/esers/contacts')}>
              <Phone size={11} aria-hidden="true" /><span>Contacts</span>
            </Link>
            <Link to="/esers/bank" id="esers-nav-bank" aria-label="Bank" aria-current={isActive('/esers/bank') ? 'page' : undefined} className={linkClass('/esers/bank')}>
              <Banknote size={11} aria-hidden="true" /><span>Bank</span>
            </Link>
            <Link to="/esers/employees" id="esers-nav-employees" aria-label="Employees" aria-current={isActive('/esers/employees') ? 'page' : undefined} className={linkClass('/esers/employees')}>
              <Users size={11} aria-hidden="true" /><span>Employees</span>
            </Link>
            <Link to="/esers/enrollment" id="esers-nav-enrollment" aria-label="Enrollment Request" aria-current={isActive('/esers/enrollment') ? 'page' : undefined} className={linkClass('/esers/enrollment')}>
              <UserPlus size={11} aria-hidden="true" /><span>Enrollment Request</span>
            </Link>
            <Link to="/esers/employment-change" id="esers-nav-emp-change" aria-label="Employment Change Request" aria-current={isActive('/esers/employment-change') ? 'page' : undefined} className={linkClass('/esers/employment-change')}>
              <GitBranch size={11} aria-hidden="true" /><span>Employment Change Request</span>
            </Link>
            <Link to="/esers/employment-change-file" id="esers-nav-emp-change-file" aria-label="Employment Change Request File" aria-current={isActive('/esers/employment-change-file') ? 'page' : undefined} className={linkClass('/esers/employment-change-file')}>
              <FileText size={11} aria-hidden="true" /><span>Employment Change Request File</span>
            </Link>
            <Link to="/esers/meetings" id="esers-nav-meetings" aria-label="Meetings / Conferences" aria-current={isActive('/esers/meetings') ? 'page' : undefined} className={linkClass('/esers/meetings')}>
              <Calendar size={11} aria-hidden="true" /><span>Meetings / Conferences</span>
            </Link>
          </div>
        )}
      </div>

      {/* Payroll Reports — bright green header */}
      <div id="esers-sidebar-payroll">
        <button
          id="esers-sidebar-payroll-toggle"
          aria-label="Toggle Payroll Reports section"
          aria-expanded={payrollOpen}
          onClick={() => setPayrollOpen(!payrollOpen)}
          className={`w-full flex items-center gap-2 px-4 py-[8px] text-[11.5px] font-semibold text-white transition-colors ${SECTION_BG}`}
        >
          <BarChart3 size={13} aria-hidden="true" />
          <span className="flex-1 text-left">Payroll Reports</span>
          <ChevronLeft size={13} aria-hidden="true" className={`transition-transform ${payrollOpen ? '-rotate-90' : ''}`} />
        </button>

        {payrollOpen && (
          <div id="esers-sidebar-payroll-items" className={SUB_BG}>
            <Link to="/esers/payroll-header" id="esers-nav-payroll-header" aria-label="Payroll Header" aria-current={isActive('/esers/payroll-header') ? 'page' : undefined} className={linkClass('/esers/payroll-header')}>
              <FileSpreadsheet size={11} aria-hidden="true" /><span>Payroll Header</span>
            </Link>
            <Link to="/esers/payroll-details" id="esers-nav-payroll-details" aria-label="Payroll Details" aria-current={isActive('/esers/payroll-details') ? 'page' : undefined} className={linkClass('/esers/payroll-details')}>
              <FileText size={11} aria-hidden="true" /><span>Payroll Details</span>
            </Link>
            <Link to="/esers/payroll-remittances" id="esers-nav-payroll-remittances" aria-label="Payroll Remittances" aria-current={isActive('/esers/payroll-remittances') ? 'page' : undefined} className={linkClass('/esers/payroll-remittances')}>
              <Landmark size={11} aria-hidden="true" /><span>Payroll Remittances</span>
            </Link>
            <Link to="/esers/agency-statement" id="esers-nav-agency-statement" aria-label="Agency Statement" aria-current={isActive('/esers/agency-statement') ? 'page' : undefined} className={linkClass('/esers/agency-statement')}>
              <Mail size={11} aria-hidden="true" /><span>Agency Statement</span>
            </Link>
            <Link to="/esers/upload" id="esers-nav-upload" aria-label="Upload Files" aria-current={isActive('/esers/upload') ? 'page' : undefined} className={linkClass('/esers/upload')}>
              <Upload size={11} aria-hidden="true" /><span>Upload Files</span>
            </Link>
            <Link to="/esers/processed-files" id="esers-nav-processed-files" aria-label="Processed Files" aria-current={isActive('/esers/processed-files') ? 'page' : undefined} className={linkClass('/esers/processed-files')}>
              <FileClock size={11} aria-hidden="true" /><span>Processed Files</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ESERSSidebar;
