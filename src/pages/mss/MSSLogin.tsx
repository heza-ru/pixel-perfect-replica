import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MSSLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSigned, setKeepSigned] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/mss/dashboard');
  };

  return (
    <div id="mss-login-page" className="min-h-screen flex flex-col bg-[hsl(0,0%,96%)]">

      {/* Top bar — "My SERS Account" header */}
      <div
        id="mss-login-topbar"
        className="bg-white border-b border-[hsl(0,0%,85%)] flex items-center justify-between px-6 py-3"
      >
        {/* Account Login badge */}
        <div className="flex items-center gap-2">
          <div className="border-2 border-portal-blue rounded px-2 py-1 flex items-center gap-1.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H15" stroke="hsl(207,90%,54%)" strokeWidth="2" strokeLinecap="round"/>
              <polyline points="10 17 15 12 10 7" stroke="hsl(207,90%,54%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="15" y1="12" x2="3" y2="12" stroke="hsl(207,90%,54%)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-[11px] font-bold text-portal-blue uppercase tracking-wide leading-tight">
              ACCOUNT<br />LOGIN
            </span>
          </div>
        </div>

        {/* Center title */}
        <h1 className="text-xl font-bold text-foreground tracking-wide">My SERS Account</h1>

        {/* SERS logo placeholder */}
        <div className="w-10 h-10 rounded-full bg-portal-blue flex items-center justify-center">
          <span className="text-white font-bold text-xs">SERS</span>
        </div>
      </div>

      {/* Main content — split layout */}
      <div className="flex flex-1">

        {/* Left panel — hero image area */}
        <div
          id="mss-login-hero"
          className="hidden md:flex flex-col items-center justify-center flex-1 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(174,60%,55%) 0%, hsl(207,75%,50%) 50%, hsl(207,85%,38%) 100%)',
          }}
          aria-hidden="true"
        >
          {/* Decorative tech/network pattern */}
          <div className="absolute inset-0 opacity-20">
            {/* Circles and lines pattern */}
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
              {/* Person icon in center circle */}
              <circle cx="200" cy="200" r="40" fill="white" fillOpacity="0.2"/>
              <circle cx="200" cy="188" r="12" fill="white" fillOpacity="0.7"/>
              <path d="M174 224 Q200 212 226 224" stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.7"/>
            </svg>
          </div>

          <div className="relative z-10 text-center px-8">
            <p className="text-white text-base font-semibold mb-2">Welcome to Account Login</p>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Due to a recent upgrade and enhanced security features, all users will be required
              to re-register for Account Login.
            </p>
          </div>
        </div>

        {/* Right panel — sign in form */}
        <div
          id="mss-login-form-panel"
          className="flex flex-col items-center justify-center w-full md:w-[420px] flex-shrink-0 px-8 py-10 bg-white"
        >
          {/* Account Login badge (mobile) */}
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <div className="border-2 border-portal-blue rounded px-2 py-1">
              <span className="text-[11px] font-bold text-portal-blue uppercase tracking-wide">ACCOUNT LOGIN</span>
            </div>
          </div>

          <h2 id="mss-login-heading" className="text-xl font-semibold text-foreground mb-6 self-start">
            Sign In
          </h2>

          <form id="mss-login-form" onSubmit={handleLogin} noValidate className="w-full flex flex-col gap-4">
            <div>
              <label htmlFor="mss-username" className="block text-sm text-foreground mb-1">
                Username
              </label>
              <Input
                id="mss-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-sm"
                aria-label="Username"
              />
            </div>

            <div>
              <label htmlFor="mss-password" className="block text-sm text-foreground mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  id="mss-password"
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

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                id="mss-keep-signed"
                type="checkbox"
                checked={keepSigned}
                onChange={(e) => setKeepSigned(e.target.checked)}
                aria-label="Keep me signed in"
                className="rounded"
              />
              Keep me signed in
            </label>

            <Button
              id="mss-login-btn"
              type="submit"
              className="w-full bg-portal-blue hover:bg-portal-blue/90 text-white font-semibold"
              aria-label="Sign In to My SERS Account"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-5 flex flex-col gap-2 w-full text-center">
            <a
              href="#"
              id="mss-forgot-password-link"
              className="text-sm text-portal-blue hover:underline"
              aria-label="Forgot password"
            >
              Forgot password?
            </a>
            <a
              href="#"
              id="mss-unlock-account-link"
              className="text-sm text-portal-blue hover:underline"
              aria-label="Unlock account"
            >
              Unlock account?
            </a>
            <a
              href="#"
              id="mss-forgot-username-link"
              className="text-sm text-portal-blue hover:underline flex items-center justify-center gap-1"
              aria-label="Forgot Username"
            >
              Forgot Username? <span className="text-xs">↗</span>
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

export default MSSLogin;
