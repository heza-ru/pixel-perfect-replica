import {
  Settings, ArrowLeft, ArrowRight, UserPlus, X, Eye, ChevronDown,
  Users, Clock, TrendingUp, AlertCircle, type LucideIcon,
} from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import { recentActivity, members, workTasks } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Pending', value: 38 },
  { name: 'Resolved', value: 142 },
];

const barData = [
  { month: 'Jun', amount: 184500 },
  { month: 'Jul', amount: 198200 },
  { month: 'Aug', amount: 210400 },
  { month: 'Sep', amount: 195800 },
  { month: 'Oct', amount: 221100 },
];

const statusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status === 'Approved') return 'secondary';
  if (status === 'Rejected') return 'destructive';
  if (status === 'Pending') return 'outline';
  return 'default';
};

interface AdminDashboardProps {
  navigate: NavigateFn;
}

const AdminDashboard = ({ navigate }: AdminDashboardProps) => {
  const totalMembers = members.length;
  const pendingRequests = workTasks.filter((t) => t.status === 'Open' || t.status === 'In Progress').length;
  const retirementApps = workTasks.filter((t) => t.requestType === 'Retirement').length;
  const contributionErrors = workTasks.filter((t) => t.requestType === 'Contribution Upload' && t.status !== 'Resolved').length;

  return (
    <div id="dashboard-page" data-testid="dashboard-page" className="flex-1 bg-[hsl(0,0%,96%)] overflow-auto">

      {/* Top bar */}
      <div id="dashboard-topbar" className="flex items-center justify-between px-6 py-4">
        <h1 id="dashboard-title" className="text-3xl font-light text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div id="dashboard-admin-badge" aria-label="Logged in as Jessica Adams" className="border border-portal-red text-portal-red px-4 py-1 rounded text-sm">
            Admin: <span className="font-bold">Jessica Adams</span>
          </div>
          <button
            id="dashboard-settings-btn"
            aria-label="Dashboard settings"
            data-testid="dashboard-settings-btn"
            onClick={() => navigate('reports')}
          >
            <Settings size={24} className="text-muted-foreground cursor-pointer" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Breadcrumb bar */}
      <div id="breadcrumb-bar" role="navigation" aria-label="Page actions" className="mx-6 bg-[hsl(0,0%,92%)] px-4 py-2 flex items-center gap-2 rounded-sm mb-4">
        <span id="breadcrumb-label" className="text-sm font-semibold text-foreground">Dashboard</span>
        <button
          id="breadcrumb-back-btn"
          aria-label="Navigate back"
          onClick={() => navigate('members')}
          className="w-7 h-7 bg-portal-blue text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80"
        >
          <ArrowLeft size={14} aria-hidden="true" />
        </button>
        <button
          id="breadcrumb-forward-btn"
          aria-label="Navigate forward"
          onClick={() => navigate('work-queue')}
          className="w-7 h-7 bg-portal-green text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80"
        >
          <ArrowRight size={14} aria-hidden="true" />
        </button>
        <button
          id="breadcrumb-add-member-btn"
          aria-label="Add new member — go to Member Portal"
          onClick={() => navigate('members')}
          className="w-7 h-7 bg-portal-orange text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80"
        >
          <UserPlus size={14} aria-hidden="true" />
        </button>
        <button
          id="breadcrumb-close-btn"
          aria-label="Go to Employer Portal"
          onClick={() => navigate('employers')}
          className="w-7 h-7 bg-portal-red text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Welcome text */}
      <p id="dashboard-welcome-text" className="mx-6 mb-4 text-sm text-foreground leading-relaxed">
        Welcome to the Neospin Pension Administration Portal. This portal allows administrators to manage member records, process retirement and refund applications, oversee employer contribution uploads, and monitor system-wide activity. Use the navigation on the left to access each module.
      </p>

      {/* Dashboard Cards - Row 1 */}
      <div id="dashboard-cards-row-1" className="mx-6 grid grid-cols-3 gap-4 mb-4">
        <DashboardCard
          id="card-total-members"
          color="bg-portal-blue" title="Total Members" Icon={Users}
          value={totalMembers} onClick={() => navigate('members')}
          aria-label={`Total Members: ${totalMembers} — click to view all members`}
        />
        <DashboardCard
          id="card-pending-requests"
          color="bg-portal-orange" title="Pending Requests" Icon={Clock}
          value={pendingRequests} onClick={() => navigate('work-queue')}
          aria-label={`Pending Requests: ${pendingRequests} — click to view work queue`}
        />
        <DashboardCard
          id="card-retirement-apps"
          color="bg-portal-teal" title="Retirement Apps" Icon={TrendingUp}
          value={retirementApps} onClick={() => navigate('retirement-benefits')}
          aria-label={`Retirement Applications: ${retirementApps} — click to view retirement module`}
        />
      </div>

      {/* Dashboard Cards - Row 2 */}
      <div id="dashboard-cards-row-2" className="mx-6 grid grid-cols-3 gap-4 mb-6">
        <DashboardCard
          id="card-contribution-errors"
          color="bg-portal-red" title="Contribution Errors" Icon={AlertCircle}
          value={contributionErrors} onClick={() => navigate('employers')}
          aria-label={`Contribution Errors: ${contributionErrors} — click to view employer portal`}
        />
        <DashboardCard
          id="card-apply-refund"
          color="bg-portal-green" title="Apply for Refund" Icon={Users}
          value={null} onClick={() => navigate('members')}
          aria-label="Apply for Refund — click to go to Member Portal"
        />
        <DashboardCard
          id="card-upload-contributions"
          color="bg-portal-purple" title="Upload Contributions" Icon={TrendingUp}
          value={null} onClick={() => navigate('employers')}
          aria-label="Upload Contributions — click to go to Employer Portal"
        />
      </div>

      {/* Charts row */}
      <div id="dashboard-charts-row" className="mx-6 grid grid-cols-3 gap-4 mb-6">

        {/* Pie chart */}
        <div id="chart-request-status" data-testid="chart-request-status" className="col-span-1 bg-card rounded shadow-sm border">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="text-sm font-semibold text-foreground">Request Status</span>
            <button
              id="chart-request-status-expand-btn"
              aria-label="Expand Request Status chart"
              onClick={() => navigate('work-queue')}
            >
              <ChevronDown size={16} className="text-muted-foreground" aria-hidden="true" />
            </button>
          </div>
          <div className="p-4">
            <div role="list" aria-label="Chart legend" className="flex items-center gap-4 mb-2 text-xs">
              <span role="listitem" className="flex items-center gap-1"><span aria-hidden="true" className="w-3 h-3 rounded-full bg-portal-orange inline-block" /> Pending</span>
              <span role="listitem" className="flex items-center gap-1"><span aria-hidden="true" className="w-3 h-3 rounded-full bg-portal-green inline-block" /> Resolved</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  <Cell fill="hsl(36, 100%, 50%)" />
                  <Cell fill="hsl(145, 63%, 42%)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div id="chart-request-status-total" className="text-xs text-foreground mt-2 text-center">
              Total Open Tasks: {pendingRequests}
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div id="chart-monthly-contributions" data-testid="chart-monthly-contributions" className="col-span-2 bg-card rounded shadow-sm border">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Monthly Contribution Totals</span>
            <button
              id="chart-contributions-view-reports-btn"
              aria-label="View full contributions report"
              onClick={() => navigate('reports')}
              className="text-xs text-portal-blue hover:underline"
            >
              View Reports →
            </button>
          </div>
          <div className="p-4">
            <div role="list" aria-label="Chart legend" className="flex items-center gap-2 mb-2 text-xs justify-end">
              <span role="listitem" className="flex items-center gap-1"><span aria-hidden="true" className="w-3 h-3 rounded-full bg-portal-blue inline-block" /> Total Contributions</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Bar dataKey="amount" fill="hsl(207, 90%, 54%)" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div id="recent-activity-section" className="mx-6 mb-6 bg-card rounded shadow-sm border">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span id="recent-activity-title" className="text-sm font-semibold text-foreground">Recent Activity</span>
          <button
            id="recent-activity-view-all-btn"
            aria-label="View all tasks in Work Queue"
            onClick={() => navigate('work-queue')}
            className="text-xs text-portal-blue hover:underline"
          >
            View Work Queue →
          </button>
        </div>
        <table id="recent-activity-table" role="table" aria-label="Recent activity" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Member / Entity</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Request Type</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row, i) => (
              <tr
                key={i}
                id={`activity-row-${row.memberId}-${i}`}
                data-testid={`activity-row-${i}`}
                className="border-b hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{row.memberName}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Button
                    id={`activity-view-btn-${row.memberId}-${i}`}
                    aria-label={`View details for ${row.memberName}`}
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-portal-blue hover:text-portal-blue"
                    onClick={() => {
                      if (row.memberId.startsWith('M')) navigate('member-profile', row.memberId);
                      else navigate('employers');
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardCard = ({
  id, color, title, Icon, value, onClick, 'aria-label': ariaLabel,
}: {
  id: string;
  color: string;
  title: string;
  Icon: LucideIcon;
  value: number | null;
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
        {value !== null && <div className="text-2xl font-bold leading-none">{value}</div>}
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

export default AdminDashboard;
