import { useNavigate } from 'react-router-dom';
import {
  Settings,
  ArrowLeft,
  ArrowRight,
  UserPlus,
  X,
  Eye,
  Briefcase,
  FileText,
  User,
  Calculator,
  ShoppingCart,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const contributionPieData = [
  { name: 'Non-Taxable (Member)', value: 148.28 },
  { name: 'Taxable Amount', value: 4674.86 },
];

const paymentHistoryData = [
  { year: '2010', amount: 4200 },
  { year: '2011', amount: 5100 },
  { year: '2012', amount: 5600 },
  { year: '2013', amount: 6200 },
  { year: '2014', amount: 6800 },
];

const MSSDashboard = () => {
  const navigate = useNavigate();

  return (
    <div id="mss-dashboard-page" data-testid="mss-dashboard-page" className="flex-1 bg-[hsl(0,0%,96%)] overflow-auto">

      {/* Top bar */}
      <div id="mss-dashboard-topbar" className="flex items-center justify-between px-6 py-4">
        <h1 id="mss-dashboard-title" className="text-3xl font-light text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div
            id="mss-member-badge"
            aria-label="Logged in as Patricia Marie Alvarez, Member ID 19254"
            className="border border-portal-red text-portal-red px-4 py-1 rounded text-sm"
          >
            Member ID : <span className="font-bold">19254 Patricia Marie Alvarez</span>
          </div>
          <button
            id="mss-dashboard-settings-btn"
            aria-label="Dashboard settings"
            onClick={() => {}}
          >
            <Settings size={24} className="text-muted-foreground cursor-pointer" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Breadcrumb bar */}
      <div
        id="mss-breadcrumb-bar"
        role="navigation"
        aria-label="Page actions"
        className="mx-6 bg-[hsl(0,0%,92%)] px-4 py-2 flex items-center gap-2 rounded-sm mb-4"
      >
        <span id="mss-breadcrumb-label" className="text-sm font-semibold text-foreground">Dashboard</span>
        <button
          id="mss-breadcrumb-back-btn"
          aria-label="Navigate back"
          onClick={() => navigate(-1)}
          className="w-7 h-7 bg-portal-blue text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80"
        >
          <ArrowLeft size={14} aria-hidden="true" />
        </button>
        <button
          id="mss-breadcrumb-forward-btn"
          aria-label="Navigate forward"
          onClick={() => navigate(1)}
          className="w-7 h-7 bg-portal-green text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80"
        >
          <ArrowRight size={14} aria-hidden="true" />
        </button>
        <button
          id="mss-breadcrumb-add-btn"
          aria-label="User plus"
          onClick={() => {}}
          className="w-7 h-7 bg-portal-orange text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80"
        >
          <UserPlus size={14} aria-hidden="true" />
        </button>
        <button
          id="mss-breadcrumb-close-btn"
          aria-label="Close"
          onClick={() => {}}
          className="w-7 h-7 bg-portal-red text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Welcome text */}
      <p id="mss-dashboard-welcome-text" className="mx-6 mb-4 text-sm text-foreground leading-relaxed">
        Welcome to the Agency Member Self Service (MSS) portal. This secure portal allows you to view your pension
        account details, manage your personal information, request benefit estimates, and submit applications for
        refunds or retirement. Use the navigation on the left to access each service.
      </p>

      {/* Row 1 cards */}
      <div id="mss-dashboard-cards-row-1" className="mx-6 grid grid-cols-3 gap-4 mb-4">
        <DashboardCard
          id="mss-card-employment"
          color="bg-portal-blue"
          title="Employment Info"
          Icon={Briefcase}
          onClick={() => navigate('/mss/employment-info')}
          aria-label="Employment Info — click to view employment details"
        />
        <DashboardCard
          id="mss-card-plans"
          color="bg-portal-green"
          title="Plans"
          Icon={FileText}
          onClick={() => navigate('/mss/plan')}
          aria-label="Plans — click to view your plan"
        />
        <DashboardCard
          id="mss-card-profile"
          color="bg-portal-purple"
          title="Personal Profile"
          Icon={User}
          onClick={() => {}}
          aria-label="Personal Profile"
        />
      </div>

      {/* Row 2 cards */}
      <div id="mss-dashboard-cards-row-2" className="mx-6 grid grid-cols-3 gap-4 mb-6">
        <DashboardCard
          id="mss-card-benefit-estimates"
          color="bg-portal-orange"
          title="Benefit Estimates"
          Icon={Calculator}
          onClick={() => navigate('/mss/benefit-estimate')}
          aria-label="Benefit Estimates — click to view"
        />
        <DashboardCard
          id="mss-card-service-purchase"
          color="bg-portal-red"
          title="Service Purchase Contracts"
          Icon={ShoppingCart}
          onClick={() => navigate('/mss/service-purchase')}
          aria-label="Service Purchase Contracts — click to view"
        />
        <DashboardCard
          id="mss-card-annual-statements"
          color="bg-portal-purple"
          title="Annual Statements"
          Icon={BookOpen}
          onClick={() => navigate('/mss/annual-statement')}
          aria-label="Annual Statements — click to view"
        />
      </div>

      {/* Bottom row — charts */}
      <div id="mss-dashboard-charts-row" className="mx-6 grid grid-cols-3 gap-4 mb-6">

        {/* Retirement Progress */}
        <div id="mss-chart-retirement-progress" className="bg-white rounded shadow-sm border p-4">
          <div className="text-sm font-semibold text-foreground mb-3">Retirement Progress</div>

          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress to Retirement Age</span>
              <span className="font-semibold text-portal-blue">56.67%</span>
            </div>
            <div
              className="w-full h-4 bg-[hsl(0,0%,90%)] rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={56.67}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Retirement progress 56.67%"
            >
              <div className="h-full bg-portal-blue rounded-full" style={{ width: '56.67%' }} />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <span>Current age</span>
              <span>70 year</span>
            </div>
          </div>

          {/* 6.67% label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-portal-orange" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">6.67% service milestone reached</span>
          </div>

          {/* Awaiting Document */}
          <div className="bg-[hsl(0,0%,96%)] rounded p-2 border">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              Awaiting Document
            </div>
            <div className="text-xs text-foreground">No pending documents</div>
          </div>
        </div>

        {/* Contribution Summary */}
        <div id="mss-chart-contribution-summary" className="bg-white rounded shadow-sm border p-4">
          <div className="text-sm font-semibold text-foreground mb-1">Contribution Summary</div>
          <div className="text-xs text-muted-foreground mb-3">Available Balance: $4,823.14</div>

          <div role="list" aria-label="Contribution chart legend" className="flex items-center gap-3 mb-2 text-xs">
            <span role="listitem" className="flex items-center gap-1">
              <span aria-hidden="true" className="w-3 h-3 rounded-full bg-portal-green inline-block" />
              Member ($148.28)
            </span>
            <span role="listitem" className="flex items-center gap-1">
              <span aria-hidden="true" className="w-3 h-3 rounded-full bg-portal-orange inline-block" />
              Taxable ($4,674.86)
            </span>
          </div>

          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={contributionPieData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
              >
                <Cell fill="hsl(145, 63%, 42%)" />
                <Cell fill="hsl(36, 100%, 50%)" />
              </Pie>
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment History Summary */}
        <div id="mss-chart-payment-history" className="bg-white rounded shadow-sm border p-4">
          <div className="text-sm font-semibold text-foreground mb-3">Payment History Summary</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={paymentHistoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Bar dataKey="amount" fill="hsl(145, 63%, 42%)" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({
  id,
  color,
  title,
  Icon,
  onClick,
  'aria-label': ariaLabel,
}: {
  id: string;
  color: string;
  title: string;
  Icon: LucideIcon;
  onClick: () => void;
  'aria-label': string;
}) => (
  <div
    id={id}
    role="button"
    tabIndex={0}
    aria-label={ariaLabel}
    data-testid={id}
    className={`${color} text-primary-foreground rounded-sm relative overflow-hidden h-[105px] flex flex-col justify-between cursor-pointer hover:opacity-90`}
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    <div className="flex items-center justify-between p-3 flex-1">
      <Icon size={36} className="opacity-80" aria-hidden="true" />
      <div className="text-right">
        <span className="text-base font-bold">{title}</span>
      </div>
    </div>
    <div className="flex items-center justify-between px-3 py-1.5 bg-[rgba(0,0,0,0.15)]">
      <span className="text-xs font-semibold flex items-center gap-1">
        <Eye size={12} aria-hidden="true" /> VIEW MORE
      </span>
      <Settings size={14} className="opacity-70" aria-hidden="true" />
    </div>
  </div>
);

export default MSSDashboard;
