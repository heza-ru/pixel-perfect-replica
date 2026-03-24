import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { monthlyContributions, retirementTrends, errorRates } from '@/data/mockData';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const Reports = () => {
  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Fiscal Year 2024–2025 &middot; Data through October 2024</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar size={14} className="mr-1.5" /> Schedule Report
          </Button>
          <Button size="sm">
            <Download size={14} className="mr-1.5" /> Export to PDF
          </Button>
        </div>
      </div>

      {/* Summary stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'YTD Employee Contributions', value: '$721,600', delta: '+4.2%' },
          { label: 'YTD Employer Contributions', value: '$1,083,900', delta: '+3.8%' },
          { label: 'Total Retirement Apps (YTD)', value: '42', delta: '+12%' },
          { label: 'Avg. Error Rate', value: '1.56%', delta: '-0.3%' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded border border-border p-4">
            <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
            <div className="text-xl font-bold text-foreground">{s.value}</div>
            <div className={`text-xs mt-0.5 ${s.delta.startsWith('+') ? 'text-portal-green' : 'text-portal-red'}`}>
              {s.delta} vs prior year
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {/* Monthly Contributions */}
        <div className="col-span-2 bg-white rounded border border-border">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h2 className="text-sm font-semibold">Monthly Contributions</h2>
            <span className="text-xs text-muted-foreground">Jan – Oct 2024</span>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyContributions} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="employee" name="Employee" fill="hsl(207, 90%, 54%)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="employer" name="Employer" fill="hsl(145, 63%, 42%)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Error Rates */}
        <div className="bg-white rounded border border-border">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h2 className="text-sm font-semibold">Contribution Error Rate</h2>
            <span className="text-xs text-muted-foreground">% of uploads</span>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={errorRates}>
                <defs>
                  <linearGradient id="errorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Area
                  type="monotone"
                  dataKey="rate"
                  name="Error Rate"
                  stroke="hsl(0, 72%, 51%)"
                  strokeWidth={2}
                  fill="url(#errorGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Retirement Trends */}
      <div className="bg-white rounded border border-border">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold">Retirement Application Trends</h2>
          <span className="text-xs text-muted-foreground">Jan – Oct 2024</span>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={retirementTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="applications"
                name="Applications Received"
                stroke="hsl(36, 100%, 50%)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="approved"
                name="Applications Approved"
                stroke="hsl(145, 63%, 42%)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
