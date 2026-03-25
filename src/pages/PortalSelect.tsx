import { Link } from 'react-router-dom';
import { Users, Building2, Shield } from 'lucide-react';

const portals = [
  {
    id: 'mss',
    title: 'MSS',
    subtitle: 'Member Self Service',
    description: 'Access your pension account, view contribution history, request estimates, and manage your retirement applications.',
    icon: Users,
    href: '/mss/login',
    color: 'bg-portal-blue',
    hoverBorder: 'hover:border-portal-blue',
  },
  {
    id: 'esers',
    title: 'eSERS',
    subtitle: 'Employer Self Service',
    description: 'Submit payroll contributions, manage employee enrollment, upload files, and view agency statements.',
    icon: Building2,
    href: '/esers/login',
    color: 'bg-portal-green',
    hoverBorder: 'hover:border-portal-green',
  },
  {
    id: 'admin',
    title: 'SMART Admin',
    subtitle: 'Administration Portal',
    description: 'Full system administration: member management, employer oversight, work queue, and reporting tools.',
    icon: Shield,
    href: '/admin',
    color: 'bg-portal-purple',
    hoverBorder: 'hover:border-portal-purple',
  },
];

const PortalSelect = () => {
  return (
    <div
      id="portal-select-page"
      className="min-h-screen bg-[hsl(0,0%,95%)] flex flex-col items-center justify-center px-4"
    >
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <img src="/neospin-new.png" alt="Neospin logo" className="h-12 w-auto mb-3" />
        <p className="text-sm text-muted-foreground tracking-wide uppercase font-semibold">
          Pension Administration System
        </p>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-light text-foreground mb-2 text-center">
        Select Your Portal
      </h1>
      <p className="text-sm text-muted-foreground mb-10 text-center max-w-md">
        Choose the portal that matches your role to access the appropriate services and tools.
      </p>

      {/* Portal cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {portals.map((portal) => (
          <Link
            key={portal.id}
            to={portal.href}
            id={`portal-card-${portal.id}`}
            aria-label={`Go to ${portal.title} — ${portal.subtitle}`}
            className={`bg-white rounded-lg shadow-sm border-2 border-transparent ${portal.hoverBorder} transition-all hover:shadow-md flex flex-col overflow-hidden group no-underline`}
          >
            {/* Card header stripe */}
            <div className={`${portal.color} px-5 py-4 flex items-center gap-3`}>
              <portal.icon size={24} className="text-white" aria-hidden="true" />
              <div>
                <div className="text-white font-bold text-lg leading-tight">{portal.title}</div>
                <div className="text-white/80 text-xs">{portal.subtitle}</div>
              </div>
            </div>

            {/* Card body */}
            <div className="px-5 py-4 flex-1">
              <p className="text-sm text-muted-foreground leading-relaxed">{portal.description}</p>
            </div>

            {/* Card footer */}
            <div className="px-5 py-3 border-t bg-[hsl(0,0%,98%)] flex items-center justify-end">
              <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                Access Portal →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Neospin — All rights reserved.
      </p>
    </div>
  );
};

export default PortalSelect;
