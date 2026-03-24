import { Users, Clock, TrendingUp, AlertCircle, ArrowRight, type LucideIcon } from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import { recentActivity, members, workTasks } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AdminDashboardProps {
  navigate: NavigateFn;
}

const statusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status === 'Approved') return 'secondary';
  if (status === 'Rejected') return 'destructive';
  if (status === 'Pending') return 'outline';
  return 'default';
};

const AdminDashboard = ({ navigate }: AdminDashboardProps) => {
  const totalMembers = members.length;
  const pendingRequests = workTasks.filter((t) => t.status === 'Open' || t.status === 'In Progress').length;
  const retirementApps = workTasks.filter((t) => t.requestType === 'Retirement').length;
  const contributionErrors = workTasks.filter((t) => t.requestType === 'Contribution Upload' && t.status !== 'Resolved').length;

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Fiscal Year 2024–2025 &middot; As of October 2024</p>
        </div>
        <Button onClick={() => navigate('members')} size="sm">
          <Users size={14} className="mr-1.5" /> View All Members
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <SummaryCard
          color="bg-portal-blue"
          title="Total Members"
          value={totalMembers.toLocaleString()}
          icon={Users}
          subtitle="8 Active Plans"
          onClick={() => navigate('members')}
        />
        <SummaryCard
          color="bg-portal-orange"
          title="Pending Requests"
          value={pendingRequests.toString()}
          icon={Clock}
          subtitle="Across all types"
          onClick={() => navigate('work-queue')}
        />
        <SummaryCard
          color="bg-portal-teal"
          title="Retirement Apps"
          value={retirementApps.toString()}
          icon={TrendingUp}
          subtitle="2 approved this month"
          onClick={() => navigate('retirement-benefits')}
        />
        <SummaryCard
          color="bg-portal-red"
          title="Contribution Errors"
          value={contributionErrors.toString()}
          icon={AlertCircle}
          subtitle="Require attention"
          onClick={() => navigate('employers')}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded border border-border p-4 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-portal-blue text-portal-blue hover:bg-portal-blue hover:text-white"
            onClick={() => navigate('members')}
          >
            <ArrowRight size={14} className="mr-1.5" /> Apply for Refund
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-portal-teal text-portal-teal hover:bg-portal-teal hover:text-white"
            onClick={() => navigate('retirement-benefits')}
          >
            <ArrowRight size={14} className="mr-1.5" /> Start Retirement Application
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-portal-green text-portal-green hover:bg-portal-green hover:text-white"
            onClick={() => navigate('employers')}
          >
            <ArrowRight size={14} className="mr-1.5" /> Upload Contribution File
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded border border-border">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
          <button
            onClick={() => navigate('work-queue')}
            className="text-xs text-portal-blue hover:underline flex items-center gap-1"
          >
            View Work Queue <ArrowRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
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
                        if (row.memberId.startsWith('M')) {
                          navigate('member-profile', row.memberId);
                        } else {
                          navigate('employers');
                        }
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
    </div>
  );
};

interface SummaryCardProps {
  color: string;
  title: string;
  value: string;
  icon: LucideIcon;
  subtitle: string;
  onClick: () => void;
}

const SummaryCard = ({ color, title, value, icon: Icon, subtitle, onClick }: SummaryCardProps) => (
  <div
    className={`${color} text-primary-foreground rounded cursor-pointer hover:opacity-90 transition-opacity`}
    onClick={onClick}
  >
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <Icon size={24} className="opacity-80" />
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs opacity-75 mt-0.5">{subtitle}</div>
    </div>
    <div className="px-4 py-2 bg-black/15 text-xs font-medium">
      Click to view &rarr;
    </div>
  </div>
);

export default AdminDashboard;
