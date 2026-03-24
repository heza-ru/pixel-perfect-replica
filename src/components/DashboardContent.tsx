import { Settings, ArrowLeft, ArrowRight, UserPlus, X, Eye, ChevronDown, ClipboardList, CheckSquare, User, DollarSign, FileText, BarChart3, type LucideIcon } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Taxable Amount", value: 38758.11 },
  { name: "Member", value: 148.28 },
];

const barData = [
  { year: "2010", amount: 18000 },
  { year: "2011", amount: 5000 },
  { year: "2012", amount: 20000 },
  { year: "2013", amount: 25000 },
  { year: "2014", amount: 5000 },
];

const DashboardContent = () => {
  return (
    <div className="flex-1 bg-[hsl(0,0%,96%)] overflow-auto">
      {/* Top bar with Member ID */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl font-light text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="border border-portal-red text-portal-red px-4 py-1 rounded text-sm">
            Member ID :19254 <span className="font-bold">Patricia Marie Alvarez</span>
          </div>
          <Settings size={24} className="text-muted-foreground cursor-pointer" />
        </div>
      </div>

      {/* Breadcrumb bar */}
      <div className="mx-6 bg-[hsl(0,0%,92%)] px-4 py-2 flex items-center gap-2 rounded-sm mb-4">
        <span className="text-sm font-semibold text-foreground">Dashboard</span>
        <button className="w-7 h-7 bg-portal-blue text-primary-foreground rounded-full flex items-center justify-center"><ArrowLeft size={14} /></button>
        <button className="w-7 h-7 bg-portal-green text-primary-foreground rounded-full flex items-center justify-center"><ArrowRight size={14} /></button>
        <button className="w-7 h-7 bg-portal-orange text-primary-foreground rounded-full flex items-center justify-center"><UserPlus size={14} /></button>
        <button className="w-7 h-7 bg-portal-red text-primary-foreground rounded-full flex items-center justify-center"><X size={14} /></button>
      </div>

      {/* Welcome text */}
      <div className="mx-6 mb-4 text-sm text-foreground leading-relaxed">
        Welcome to the Agency Member Self Service (MSS) portal. MSS is a secure portal where you can view your Employment details, Agency Plans, Insurance coverage and other details. Here's a brief description of the various activities that you can do:
      </div>

      {/* Dashboard Cards - Row 1 */}
      <div className="mx-6 grid grid-cols-3 gap-4 mb-4">
        <DashboardCard color="bg-portal-blue" title="Employment Info" icon="📋" />
        <DashboardCard color="bg-portal-green" title="Plans" icon="☑️" />
        <DashboardCard color="bg-portal-purple" title="Personal Profile" icon="👤" />
      </div>

      {/* Dashboard Cards - Row 2 */}
      <div className="mx-6 grid grid-cols-3 gap-4 mb-6">
        <DashboardCard color="bg-portal-orange" title="Benefit Estimates" icon="💲" />
        <DashboardCard color="bg-portal-red" title="Service Purchase Contracts" icon="📄" />
        <DashboardCard color="bg-portal-purple" title="Annual Statements" icon="📊" />
      </div>

      {/* Bottom section: Progress, Pie Chart, Bar Chart */}
      <div className="mx-6 grid grid-cols-3 gap-4 mb-6">
        {/* Retirement Progress */}
        <div className="bg-card rounded shadow-sm border">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="text-sm font-semibold text-foreground">Retirement Progress</span>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
          <div className="p-4">
            <div className="w-full bg-muted rounded-full h-5 relative mb-2">
              <div className="bg-portal-teal h-5 rounded-l-full flex items-center justify-end pr-2" style={{ width: "56.67%" }}>
                <span className="text-[10px] text-primary-foreground font-bold">56.67</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>70 year</span>
              <span>6.67%</span>
            </div>
            <div className="mt-4 border-t pt-3">
              <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                <span>▲</span>
                <span>Awaiting Document</span>
                <ChevronDown size={14} className="ml-auto text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Summary - Pie Chart */}
        <div className="bg-card rounded shadow-sm border">
          <div className="px-4 py-3 border-b">
            <span className="text-sm font-semibold text-foreground">Contribution Summary</span>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-portal-green inline-block"></span> Member</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-portal-orange inline-block"></span> Taxable Amount</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} : $${value.toFixed(2)}`}
                >
                  <Cell fill="hsl(145, 63%, 42%)" />
                  <Cell fill="hsl(36, 100%, 50%)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-xs text-foreground mt-2">
              Available Balance :$582.41
            </div>
          </div>
        </div>

        {/* Payment History Summary - Bar Chart */}
        <div className="bg-card rounded shadow-sm border">
          <div className="px-4 py-3 border-b">
            <span className="text-sm font-semibold text-foreground">Payment History Summary</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2 text-xs justify-end">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-portal-green inline-block"></span> Gross Amount</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v.toLocaleString()}.00`} />
                <Tooltip />
                <Bar dataKey="amount" fill="hsl(145, 63%, 42%)" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ color, title, Icon }: { color: string; title: string; Icon: LucideIcon }) => (
  <div className={`${color} text-primary-foreground rounded-sm relative overflow-hidden h-[90px] flex flex-col justify-between`}>
    <div className="flex items-center justify-between p-3 flex-1">
      <Icon size={36} className="opacity-80" />
      <span className="text-lg font-bold text-right">{title}</span>
    </div>
    <div className="flex items-center justify-between px-3 py-1.5 bg-[rgba(0,0,0,0.15)]">
      <span className="text-xs font-semibold flex items-center gap-1 cursor-pointer hover:underline">
        <Eye size={12} /> VIEW MORE
      </span>
      <Settings size={14} className="opacity-70 cursor-pointer" />
    </div>
  </div>
);

export default DashboardContent;
