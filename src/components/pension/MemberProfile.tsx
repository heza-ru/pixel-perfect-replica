import { ArrowLeft, Edit } from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import { members } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface MemberProfileProps {
  memberId: string;
  navigate: NavigateFn;
}

const statusVariant = (s: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (s === 'Active') return 'secondary';
  if (s === 'Approved') return 'secondary';
  if (s === 'Rejected') return 'destructive';
  if (s === 'Pending') return 'outline';
  if (s === 'Retired') return 'default';
  return 'default';
};

const MemberProfile = ({ memberId, navigate }: MemberProfileProps) => {
  const member = members.find((m) => m.id === memberId);

  if (!member) {
    return (
      <div className="p-6">
        <div className="bg-white rounded border border-border p-8 text-center">
          <p className="text-muted-foreground mb-4">Member not found: {memberId}</p>
          <Button variant="outline" onClick={() => navigate('members')}>
            <ArrowLeft size={14} className="mr-1.5" /> Back to Member Portal
          </Button>
        </div>
      </div>
    );
  }

  const initials = `${member.firstName[0]}${member.lastName[0]}`;
  const totalContributions = member.contributions.reduce(
    (acc, c) => ({ employee: acc.employee + c.employee, employer: acc.employer + c.employer }),
    { employee: 0, employer: 0 }
  );
  const latestBalance = member.contributions[member.contributions.length - 1]?.ytdBalance ?? 0;

  return (
    <div className="p-6">
      {/* Back navigation */}
      <button
        onClick={() => navigate('members')}
        className="flex items-center gap-1.5 text-sm text-portal-blue hover:underline mb-4"
      >
        <ArrowLeft size={14} /> Member Portal
      </button>

      {/* Member header card */}
      <div className="bg-white rounded border border-border p-5 mb-5">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-portal-blue flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-semibold text-foreground">{member.name}</h1>
              <Badge variant={statusVariant(member.status)}>{member.status}</Badge>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm mt-3">
              <div>
                <span className="text-xs text-muted-foreground block">Member ID</span>
                <span className="font-mono font-medium">{member.id}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Plan Type</span>
                <span className="font-medium">{member.planType}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Employer</span>
                <span className="font-medium">{member.employer}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Years of Service</span>
                <span className="font-medium">{member.yearsOfService} years</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="border-portal-blue text-portal-blue hover:bg-portal-blue hover:text-white"
              onClick={() => navigate('refund-flow', member.id)}
            >
              Apply for Refund
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('retirement-flow', member.id)}
            >
              Start Retirement
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="personal">
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="contributions">Contribution Summary</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
          <TabsTrigger value="history">Application History</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <div className="bg-white rounded border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Personal Information</h2>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <Edit size={12} className="mr-1.5" /> Edit
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <InfoField label="Date of Birth" value={member.dob} />
              <InfoField label="Social Security Number" value={member.ssn} />
              <InfoField label="Phone Number" value={member.phone} />
              <InfoField label="Email Address" value={member.email} />
              <InfoField
                label="Mailing Address"
                value={`${member.address}, ${member.city}, ${member.state} ${member.zip}`}
              />
              <InfoField label="Member Since" value={member.joinDate} />
            </div>
          </div>
        </TabsContent>

        {/* Contribution Summary */}
        <TabsContent value="contributions">
          <div className="bg-white rounded border border-border p-5">
            <h2 className="text-sm font-semibold mb-4">Contribution Summary</h2>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 rounded p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">Total Employee Contributions</div>
                <div className="text-lg font-bold text-portal-blue">${totalContributions.employee.toLocaleString()}</div>
              </div>
              <div className="bg-muted/50 rounded p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">Total Employer Contributions</div>
                <div className="text-lg font-bold text-portal-green">${totalContributions.employer.toLocaleString()}</div>
              </div>
              <div className="bg-muted/50 rounded p-3 text-center">
                <div className="text-xs text-muted-foreground mb-1">Current YTD Balance</div>
                <div className="text-lg font-bold text-portal-teal">${latestBalance.toLocaleString()}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="mb-5">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={member.contributions} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="employee" name="Employee" fill="hsl(207, 90%, 54%)" />
                  <Bar dataKey="employer" name="Employer" fill="hsl(145, 63%, 42%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Year</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employer</th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">YTD Balance</th>
                </tr>
              </thead>
              <tbody>
                {member.contributions.map((c) => (
                  <tr key={c.year} className="border-b">
                    <td className="px-3 py-2">{c.year}</td>
                    <td className="px-3 py-2 text-right">${c.employee.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">${c.employer.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right font-medium">${c.ytdBalance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Bank Details */}
        <TabsContent value="bank">
          <div className="bg-white rounded border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Bank Details</h2>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <Edit size={12} className="mr-1.5" /> Update Bank Details
              </Button>
            </div>
            <div className="bg-muted/30 rounded border border-border p-4 max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-portal-blue/10 flex items-center justify-center">
                  <span className="text-portal-blue font-bold text-xs">BANK</span>
                </div>
                <div>
                  <div className="font-semibold">{member.bank.name}</div>
                  <div className="text-xs text-muted-foreground">Primary Account</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InfoField label="Account Number" value={member.bank.accountMasked} />
                <InfoField label="Routing Number" value={member.bank.routing} />
              </div>
              <div className="mt-3 pt-3 border-t">
                <span className="text-xs text-muted-foreground">Account Type: </span>
                <span className="text-xs font-medium">Checking — Direct Deposit</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Application History */}
        <TabsContent value="history">
          <div className="bg-white rounded border border-border overflow-hidden">
            <div className="px-4 py-3 border-b">
              <h2 className="text-sm font-semibold">Application History</h2>
            </div>
            {member.applications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No applications on record for this member.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Application ID</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Submitted Date</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {member.applications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-muted/20">
                      <td className="px-4 py-3 font-mono text-xs">{app.id}</td>
                      <td className="px-4 py-3">{app.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{app.submittedDate}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(app.status)}>{app.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-portal-blue hover:text-portal-blue">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-xs text-muted-foreground block mb-0.5">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

export default MemberProfile;
