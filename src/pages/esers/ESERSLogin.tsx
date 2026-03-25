import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ESERSLogin = () => {
  const navigate = useNavigate();
  const [orgId, setOrgId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/esers/dashboard');
  };

  return (
    <div id="esers-login-page" className="min-h-screen flex flex-col bg-[hsl(0,0%,96%)]">

      {/* Top bar */}
      <div
        id="esers-login-topbar"
        className="bg-[hsl(120,18%,15%)] flex items-center justify-between px-6 py-3"
      >
        <div className="flex flex-col leading-none">
          <span className="text-[8px] text-[hsl(0,0%,55%)] uppercase tracking-widest font-medium">POWERED BY</span>
          <img src="/neospin-new.png" alt="Neospin logo" className="h-5 w-auto mt-0.5" />
        </div>
        <h1 className="text-base font-semibold text-white tracking-wide">Employer Self Service Portal</h1>
        <div className="w-10 h-10 rounded-full bg-portal-green flex items-center justify-center">
          <span className="text-white font-bold text-[10px] text-center leading-tight">eSERS</span>
        </div>
      </div>

      {/* Main content — split layout */}
      <div className="flex flex-1">

        {/* Left panel — hero */}
        <div
          id="esers-login-hero"
          className="hidden md:flex flex-col items-center justify-center flex-1 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(120,30%,30%) 0%, hsl(120,25%,22%) 50%, hsl(120,18%,14%) 100%)',
          }}
          aria-hidden="true"
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <g stroke="white" strokeWidth="1" fill="none">
                <circle cx="200" cy="200" r="80" strokeOpacity="0.6"/>
                <circle cx="200" cy="200" r="120" strokeOpacity="0.3"/>
                <circle cx="200" cy="200" r="160" strokeOpacity="0.2"/>
                <line x1="200" y1="40" x2="200" y2="360" strokeOpacity="0.2"/>
                <line x1="40" y1="200" x2="360" y2="200" strokeOpacity="0.2"/>
                <circle cx="200" cy="120" r="16" fill="white" fillOpacity="0.25"/>
                <circle cx="280" cy="200" r="12" fill="white" fillOpacity="0.25"/>
                <circle cx="200" cy="280" r="16" fill="white" fillOpacity="0.25"/>
                <circle cx="120" cy="200" r="12" fill="white" fillOpacity="0.25"/>
                <circle cx="140" cy="140" r="8" fill="white" fillOpacity="0.2"/>
                <circle cx="260" cy="140" r="8" fill="white" fillOpacity="0.2"/>
                <circle cx="260" cy="260" r="8" fill="white" fillOpacity="0.2"/>
                <circle cx="140" cy="260" r="8" fill="white" fillOpacity="0.2"/>
                <line x1="200" y1="120" x2="280" y2="200" strokeOpacity="0.3"/>
                <line x1="280" y1="200" x2="200" y2="280" strokeOpacity="0.3"/>
                <line x1="200" y1="280" x2="120" y2="200" strokeOpacity="0.3"/>
                <line x1="120" y1="200" x2="200" y2="120" strokeOpacity="0.3"/>
              </g>
              <circle cx="200" cy="200" r="40" fill="white" fillOpacity="0.15"/>
              {/* Building icon */}
              <rect x="185" y="188" width="30" height="22" fill="white" fillOpacity="0.6" rx="1"/>
              <rect x="193" y="198" width="6" height="12" fill="hsl(120,18%,15%)" fillOpacity="0.5" rx="1"/>
            </svg>
          </div>

          <div className="relative z-10 text-center px-8">
            <p className="text-white text-base font-semibold mb-2">Welcome to eSERS</p>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Employer Self Service portal for submitting payroll contributions,
              managing employee enrollments, and accessing agency statements.
            </p>
          </div>
        </div>

        {/* Right panel — sign in form */}
        <div
          id="esers-login-form-panel"
          className="flex flex-col items-center justify-center w-full md:w-[420px] flex-shrink-0 px-8 py-10 bg-white"
        >
          <h2 id="esers-login-heading" className="text-xl font-semibold text-foreground mb-6 self-start">
            Sign In
          </h2>

          <form id="esers-login-form" onSubmit={handleSignIn} noValidate className="w-full flex flex-col gap-4">
            <div>
              <label htmlFor="esers-org-id" className="block text-sm text-foreground mb-1">
                Organization ID
              </label>
              <Input
                id="esers-org-id"
                type="text"
                placeholder="e.g. 084000"
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                className="text-sm"
                aria-label="Organization ID"
              />
            </div>

            <div>
              <label htmlFor="esers-username" className="block text-sm text-foreground mb-1">
                Username
              </label>
              <Input
                id="esers-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-sm"
                aria-label="Username"
              />
            </div>

            <div>
              <label htmlFor="esers-password" className="block text-sm text-foreground mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  id="esers-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm pr-10"
                  aria-label="Password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
                </button>
              </div>
            </div>

            <Button
              id="esers-signin-btn"
              type="submit"
              className="w-full bg-[hsl(120,18%,15%)] hover:bg-[hsl(120,18%,22%)] text-white font-semibold"
              aria-label="Sign In to eSERS Portal"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-5 flex flex-col gap-2 w-full text-center">
            <a
              href="#"
              id="esers-forgot-password-link"
              className="text-sm text-portal-blue hover:underline"
              aria-label="Forgot password"
            >
              Forgot password?
            </a>
            <a
              href="#"
              id="esers-unlock-account-link"
              className="text-sm text-portal-blue hover:underline"
              aria-label="Unlock account"
            >
              Unlock account?
            </a>
            <a
              href="#"
              id="esers-contact-support-link"
              className="text-sm text-portal-blue hover:underline flex items-center justify-center gap-1"
              aria-label="Contact Support"
            >
              Contact Support ↗
            </a>
          </div>

          <div className="mt-8 pt-4 border-t w-full text-center">
            <p className="text-xs text-muted-foreground">
              School Employees Retirement System of Ohio<br />
              300 E. Broad Street, Suite 100, Columbus, OH 43215
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              <Link to="/" className="text-portal-blue hover:underline">
                ← Return to Portal Select
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESERSLogin;
