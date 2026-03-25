import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, ArrowLeft, Plus, X, ArrowRight, Settings } from 'lucide-react';

const ESERSHeader = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div id="esers-header-wrapper" className="flex-shrink-0">
      {/* Main header bar */}
      <header
        id="esers-app-header"
        role="banner"
        className="bg-[hsl(0,0%,13%)] text-white h-[46px] flex items-center px-3 gap-3"
      >
        {/* Hamburger + "Powered by Neospin" branding */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            id="esers-hamburger-btn"
            aria-label="Toggle navigation menu"
            className="text-white hover:opacity-80"
          >
            <Menu size={19} aria-hidden="true" />
          </button>
          {/* Gear icon + POWERED BY + NEOSPIN */}
          <div className="flex items-center gap-1.5">
            <Settings size={18} className="text-[hsl(82,52%,50%)]" aria-hidden="true" />
            <div className="flex flex-col leading-none">
              <span className="text-[7px] text-[hsl(0,0%,52%)] uppercase tracking-widest font-medium">
                POWERED BY
              </span>
              <img src="/neospin-new.png" alt="Neospin logo" className="h-[15px] w-auto mt-0.5" />
            </div>
          </div>
        </div>

        {/* Center title */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-white font-semibold text-[13px] tracking-wide">
            Employer Self Service Portal
          </span>
        </div>

        {/* Welcome / user dropdown — bordered box */}
        <div className="relative flex-shrink-0">
          <button
            id="esers-user-dropdown-btn"
            aria-label="User menu — Welcome, 084000 - Betty White"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 border border-[hsl(0,0%,45%)] rounded px-3 py-1 hover:border-[hsl(0,0%,65%)] transition-colors text-[12px]"
          >
            <ArrowLeft size={12} className="text-[hsl(0,0%,65%)]" aria-hidden="true" />
            <span className="text-white">Welcome, 084000 - Betty White</span>
            <ChevronDown size={12} className="text-[hsl(0,0%,60%)]" aria-hidden="true" />
          </button>

          {dropdownOpen && (
            <div
              id="esers-user-dropdown-panel"
              role="menu"
              aria-label="User options"
              className="absolute right-0 top-[38px] w-48 bg-white rounded shadow-xl border border-border z-50 text-foreground text-sm"
            >
              <button
                role="menuitem"
                className="w-full text-left px-4 py-2.5 hover:bg-muted text-sm"
                onClick={() => { setDropdownOpen(false); navigate('/esers/dashboard'); }}
                aria-label="Go to dashboard"
              >
                Dashboard
              </button>
              <button
                role="menuitem"
                className="w-full text-left px-4 py-2.5 hover:bg-muted text-sm"
                onClick={() => {}}
                aria-label="My profile"
              >
                My Profile
              </button>
              <div className="border-t" />
              <button
                role="menuitem"
                className="w-full text-left px-4 py-2.5 hover:bg-muted text-sm text-destructive"
                onClick={() => { setDropdownOpen(false); navigate('/esers/login'); }}
                aria-label="Sign out"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Tab / breadcrumb bar — matches screenshot "+ Home 72 × ← →" */}
      <div
        id="esers-tab-bar"
        role="navigation"
        aria-label="Tab navigation"
        className="bg-[hsl(0,0%,88%)] border-b border-[hsl(0,0%,76%)] flex items-center px-2 h-[28px] gap-0.5 text-[11px]"
      >
        {/* Add tab button */}
        <button
          id="esers-tab-add-btn"
          aria-label="Add new tab"
          className="text-[hsl(0,0%,40%)] hover:text-foreground px-1.5 py-0.5"
        >
          <Plus size={13} aria-hidden="true" />
        </button>

        {/* Home tab — active white tab */}
        <div
          id="esers-tab-home"
          role="tab"
          aria-selected="true"
          className="flex items-center gap-1.5 bg-white border-x border-t border-[hsl(0,0%,74%)] rounded-t-sm px-3 h-full text-[11px] font-medium text-foreground relative -mb-px"
        >
          <span>Home</span>
          <span
            id="esers-tab-home-count"
            aria-label="72 items"
            className="bg-portal-red text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5"
          >
            72
          </span>
          <button aria-label="Close Home tab" className="text-[hsl(0,0%,50%)] hover:text-foreground ml-0.5">
            <X size={10} aria-hidden="true" />
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Nav arrows */}
        <div className="flex items-center text-[hsl(0,0%,42%)]">
          <button aria-label="Navigate back" className="px-1.5 hover:text-foreground">
            <ArrowLeft size={12} aria-hidden="true" />
          </button>
          <button aria-label="Navigate forward" className="px-1.5 hover:text-foreground">
            <ArrowRight size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ESERSHeader;
