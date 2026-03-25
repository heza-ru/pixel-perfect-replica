import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail,
  ChevronDown,
  ChevronRight,
  Home,
  Briefcase,
  FileText,
  ShoppingCart,
  Calculator,
  RefreshCw,
  Award,
  BookOpen,
  User,
  ListTodo,
} from 'lucide-react';

const MSSSidebar = () => {
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `flex items-center gap-2.5 px-4 py-2.5 text-[12px] cursor-pointer transition-colors w-full ${
      isActive(path)
        ? 'bg-portal-sidebar-active text-primary-foreground font-semibold'
        : 'text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,30%)] hover:text-primary-foreground'
    }`;

  return (
    <nav
      id="mss-app-sidebar"
      role="navigation"
      aria-label="MSS navigation"
      className="w-[200px] min-h-full bg-portal-sidebar text-primary-foreground flex flex-col text-[12px] flex-shrink-0"
    >
      {/* Alerts & Messages */}
      <div
        id="mss-sidebar-alerts"
        className="flex items-center gap-2.5 px-4 py-3 border-b border-[hsl(0,0%,28%)] text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,30%)] cursor-pointer"
        role="button"
        aria-label="Alerts and Messages — 1 unread"
        tabIndex={0}
      >
        <Mail size={14} aria-hidden="true" />
        <span className="flex-1">Alerts &amp; Messages</span>
        <span
          id="mss-alerts-badge"
          aria-label="1 unread message"
          className="bg-portal-red text-primary-foreground text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
        >
          1
        </span>
      </div>

      {/* Your Account collapsible */}
      <div id="mss-sidebar-your-account">
        <button
          id="mss-sidebar-your-account-toggle"
          aria-label="Toggle Your Account section"
          aria-expanded={accountOpen}
          onClick={() => setAccountOpen(!accountOpen)}
          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] transition-colors ${
            accountOpen
              ? 'bg-portal-sidebar-active text-primary-foreground font-semibold'
              : 'text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,30%)] hover:text-primary-foreground'
          }`}
        >
          <User size={14} aria-hidden="true" />
          <span className="flex-1 text-left">Your Account</span>
          {accountOpen ? (
            <ChevronDown size={13} aria-hidden="true" />
          ) : (
            <ChevronRight size={13} aria-hidden="true" />
          )}
        </button>

        {accountOpen && (
          <div id="mss-sidebar-your-account-items" className="bg-[hsl(0,0%,18%)]">
            <Link
              to="/mss/dashboard"
              id="mss-nav-dashboard"
              aria-label="Home — Dashboard"
              aria-current={isActive('/mss/dashboard') ? 'page' : undefined}
              className={navLinkClass('/mss/dashboard')}
            >
              <Home size={13} aria-hidden="true" />
              <span>Home</span>
            </Link>
            <Link
              to="/mss/employment-info"
              id="mss-nav-employment"
              aria-label="Employment Info"
              aria-current={isActive('/mss/employment-info') ? 'page' : undefined}
              className={navLinkClass('/mss/employment-info')}
            >
              <Briefcase size={13} aria-hidden="true" />
              <span>Employment Info</span>
            </Link>
            <Link
              to="/mss/plan"
              id="mss-nav-plan"
              aria-label="Plan"
              aria-current={isActive('/mss/plan') ? 'page' : undefined}
              className={navLinkClass('/mss/plan')}
            >
              <FileText size={13} aria-hidden="true" />
              <span>Plan</span>
            </Link>
            <Link
              to="/mss/service-purchase"
              id="mss-nav-service-purchase"
              aria-label="Service Purchase Contract"
              aria-current={isActive('/mss/service-purchase') ? 'page' : undefined}
              className={navLinkClass('/mss/service-purchase')}
            >
              <ShoppingCart size={13} aria-hidden="true" />
              <span>Service Purchase Contract</span>
            </Link>
            <Link
              to="/mss/benefit-estimate"
              id="mss-nav-benefit-estimate"
              aria-label="Benefit Estimate"
              aria-current={isActive('/mss/benefit-estimate') ? 'page' : undefined}
              className={navLinkClass('/mss/benefit-estimate')}
            >
              <Calculator size={13} aria-hidden="true" />
              <span>Benefit Estimate</span>
            </Link>
            <Link
              to="/mss/refund"
              id="mss-nav-refund"
              aria-label="Refund Application"
              aria-current={isActive('/mss/refund') ? 'page' : undefined}
              className={navLinkClass('/mss/refund')}
            >
              <RefreshCw size={13} aria-hidden="true" />
              <span>Refund Application</span>
            </Link>
            <Link
              to="/mss/retirement"
              id="mss-nav-retirement"
              aria-label="Retirement Application"
              aria-current={isActive('/mss/retirement') ? 'page' : undefined}
              className={navLinkClass('/mss/retirement')}
            >
              <Award size={13} aria-hidden="true" />
              <span>Retirement Application</span>
            </Link>
            <Link
              to="/mss/annual-statement"
              id="mss-nav-annual-statement"
              aria-label="Annual Statement"
              aria-current={isActive('/mss/annual-statement') ? 'page' : undefined}
              className={navLinkClass('/mss/annual-statement')}
            >
              <BookOpen size={13} aria-hidden="true" />
              <span>Annual Statement</span>
            </Link>
          </div>
        )}
      </div>

      {/* Related Task */}
      <div
        id="mss-sidebar-related-task"
        className="flex items-center gap-2.5 px-4 py-2.5 text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,30%)] cursor-pointer border-t border-[hsl(0,0%,28%)]"
        role="button"
        tabIndex={0}
        aria-label="Related Task"
      >
        <ListTodo size={14} aria-hidden="true" />
        <span className="flex-1">Related Task</span>
        <ChevronRight size={13} aria-hidden="true" />
      </div>

      {/* My Profile */}
      <div
        id="mss-sidebar-my-profile"
        className="flex items-center gap-2.5 px-4 py-2.5 text-[hsl(0,0%,70%)] hover:bg-[hsl(0,0%,30%)] cursor-pointer border-t border-[hsl(0,0%,28%)]"
        role="button"
        tabIndex={0}
        aria-label="My Profile"
      >
        <User size={14} aria-hidden="true" />
        <span className="flex-1">My Profile</span>
        <ChevronRight size={13} aria-hidden="true" />
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-[hsl(0,0%,28%)] px-4 py-3">
        <div className="text-[10px] text-[hsl(0,0%,45%)]">Neospin v4.2.1</div>
        <div className="text-[10px] text-[hsl(0,0%,45%)]">MSS Portal</div>
      </div>
    </nav>
  );
};

export default MSSSidebar;
