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
    <div className="flex-1 bg-[hsl(0,0%,96%)] overflow-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl font-light text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="border border-portal-red text-portal-red px-4 py-1 rounded text-sm">
            Admin: <span className="font-bold">Jessica Adams</span>
          </div>
          <Settings size={24} className="text-muted-foreground cursor-pointer" />
        </div>
      </div>

      {/* Breadcrumb bar */}
      <div className="mx-6 bg-[hsl(0,0%,92%)] px-4 py-2 flex items-center gap-2 rounded-sm mb-4">
        <span className="text-sm font-semibold text-foreground">Dashboard</span>
        <button className="w-7 h-7 bg-portal-blue text-primary-foreground rounded-full flex items-center justify-center"><ArrowLeft size={14} /></button>
        <button className="w-7 h-7 bg-portal-green text-primary-foreground rounded-full flex items-center justify-center"><ArrowRight size={14} /></button>
        <button
          onClick={() => navigate('members')}
          className="w-7 h-7 bg-portal-orange text-primary-foreground rounded-full flex items-center justify-center"
        >
          <UserPlus size={14} />
        </button>
        <button className="w-7 h-7 bg-portal-red text-primary-foreground rounded-full flex items-center justify-center"><X size={14} /></button>
      </div>

      {/* Welcome text */}
      <div className="mx-6 mb-4 text-sm text-foreground leading-relaxed">
        Welcome to the Neospin Pension Administration Portal. This portal allows administrators to manage member records, process retirement and refund applications, oversee employer contribution uploads, and monitor system-wide activity. Use the navigation on the left to access each module.
      </div>

      {/* Dashboard Cards - Row 1 */}
      <div className="mx-6 grid grid-cols-3 gap-4 mb-4">
        <DashboardCard
          color="bg-portal-blue" title="Total Members" Icon={Users}
          value={totalMembers} onClick={() => navigate('members')}
        />
        <DashboardCard
          color="bg-portal-orange" title="Pending Requests" Icon={Clock}
          value={pendingRequests} onClick={() => navigate('work-queue')}
        />
        <DashboardCard
          color="bg-portal-teal" title="Retirement Apps" Icon={TrendingUp}
          value={retirementApps} onClick={() => navigate('retirement-benefits')}
        />
      </div>

      {/* Dashboard Cards - Row 2 */}
      <div className="mx-6 grid grid-cols-3 gap-4 mb-6">
        <DashboardCard
          color="bg-portal-red" title="Contribution Errors" Icon={AlertCircle}
          value={contributionErrors} onClick={() => navigate('employers')}
        />
        <DashboardCard
          color="bg-portal-green" title="Apply for Refund" Icon={Users}
          value={null} onClick={() => navigate('members')}
        />
        <DashboardCard
          color="bg-portal-purple" title="Upload Contributions" Icon={TrendingUp}
          value={null} onClick={() => navigate('employers')}
        />
      </div>

      {/* Bottom section */}
      <div className="mx-6 grid grid-cols-3 gap-4 mb-6">
        {/* Recent Activity */}
        <div className="col-span-1 bg-card rounded shadow-sm border">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="text-sm font-semibold text-foreground">Request Status</span>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4 mb-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-portal-orange inline-block" /> Pending</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-portal-green inline-block" /> Resolved</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  <Cell fill="hsl(36, 100%, 50%)" />
                  <Cell fill="hsl(145, 63%, 42%)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-xs text-foreground mt-2 text-center">
              Total Open Tasks: {pendingRequests}
            </div>
          </div>
        </div>

        {/* Contribution trend */}
        <div className="col-span-2 bg-card rounded shadow-sm border">
          <div className="px-4 py-3 border-b">
            <span className="text-sm font-semibold text-foreground">Monthly Contribution Totals</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2 text-xs justify-end">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-portal-blue inline-block" /> Total Contributions</span>
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
      <div className="mx-6 mb-6 bg-card rounded shadow-sm border">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="text-sm font-semibold text-foreground">Recent Activity</span>
          <button
            onClick={() => navigate('work-queue')}
            className="text-xs text-portal-blue hover:underline"
          >
            View Work Queue →
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Member / Entity</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Request Type</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((row, i) => (
              <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium">{row.memberName}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Button
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
  color, title, Icon, value, onClick,
}: {
  color: string;
  title: string;
  Icon: LucideIcon;
  value: number | null;
  onClick: () => void;
}) => (
  <div
    className={`${color} text-primary-foreground rounded-sm relative overflow-hidden h-[105px] flex flex-col justify-between cursor-pointer hover:opacity-90`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between p-3 flex-1">
      <Icon size={36} className="opacity-80" />
      <div className="text-right">
        {value !== null && <div className="text-2xl font-bold leading-none">{value}</div>}
        <span className="text-base font-bold">{title}</span>
      </div>
    </div>
    <div className="flex items-center justify-between px-3 py-1.5 bg-[rgba(0,0,0,0.15)]">
      <span className="text-xs font-semibold flex items-center gap-1 cursor-pointer hover:underline">
        <Eye size={12} /> VIEW MORE
      </span>
      <Settings size={14} className="opacity-70 cursor-pointer" />
    </div>
  </div>
);

export default AdminDashboard;
