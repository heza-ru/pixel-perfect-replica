import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { monthlyContributions, retirementTrends, errorRates } from '@/data/mockData';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const Reports = () => {
  return (
    <div id="reports-page" data-testid="reports-page" className="p-6">

      {/* Page header */}
      <div id="reports-header" className="flex items-center justify-between mb-6">
        <div>
          <h1 id="reports-title" className="text-2xl font-light text-foreground">Reports & Analytics</h1>
          <p id="reports-subtitle" className="text-sm text-muted-foreground mt-0.5">Fiscal Year 2024–2025 &middot; Data through October 2024</p>
        </div>
        <div id="reports-actions" className="flex gap-2">
          <Button
            id="reports-schedule-btn"
            aria-label="Schedule a recurring report"
            variant="outline"
            size="sm"
          >
            <Calendar size={14} className="mr-1.5" aria-hidden="true" /> Schedule Report
          </Button>
          <Button
            id="reports-export-btn"
            aria-label="Export reports to PDF"
            size="sm"
          >
            <Download size={14} className="mr-1.5" aria-hidden="true" /> Export to PDF
          </Button>
        </div>
      </div>

      {/* Summary stats row */}
      <div id="reports-stats-row" className="grid grid-cols-4 gap-4 mb-6">
        {[
          { id: 'stat-ytd-employee', label: 'YTD Employee Contributions', value: '$721,600', delta: '+4.2%', positive: true },
          { id: 'stat-ytd-employer', label: 'YTD Employer Contributions', value: '$1,083,900', delta: '+3.8%', positive: true },
          { id: 'stat-retirement-apps', label: 'Total Retirement Apps (YTD)', value: '42', delta: '+12%', positive: true },
          { id: 'stat-error-rate', label: 'Avg. Error Rate', value: '1.56%', delta: '-0.3%', positive: false },
        ].map((s) => (
          <div
            key={s.id}
            id={s.id}
            data-testid={s.id}
            aria-label={`${s.label}: ${s.value}, ${s.delta} vs prior year`}
            className="bg-white rounded border border-border p-4"
          >
            <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
            <div className="text-xl font-bold text-foreground">{s.value}</div>
            <div className={`text-xs mt-0.5 ${s.positive ? 'text-portal-green' : 'text-portal-red'}`}>
              {s.delta} vs prior year
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div id="reports-charts-row-1" className="grid grid-cols-3 gap-5 mb-6">

        {/* Monthly Contributions */}
        <div id="chart-monthly-contributions" data-testid="chart-monthly-contributions" aria-label="Monthly Contributions bar chart" className="col-span-2 bg-white rounded border border-border">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h2 id="chart-contributions-title" className="text-sm font-semibold">Monthly Contributions</h2>
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
        <div id="chart-error-rates" data-testid="chart-error-rates" aria-label="Contribution Error Rate area chart" className="bg-white rounded border border-border">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h2 id="chart-error-rates-title" className="text-sm font-semibold">Contribution Error Rate</h2>
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
                <Area type="monotone" dataKey="rate" name="Error Rate" stroke="hsl(0, 72%, 51%)" strokeWidth={2} fill="url(#errorGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Retirement Trends */}
      <div id="chart-retirement-trends" data-testid="chart-retirement-trends" aria-label="Retirement Application Trends line chart" className="bg-white rounded border border-border">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 id="chart-retirement-trends-title" className="text-sm font-semibold">Retirement Application Trends</h2>
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
              <Line type="monotone" dataKey="applications" name="Applications Received" stroke="hsl(36, 100%, 50%)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="approved" name="Applications Approved" stroke="hsl(145, 63%, 42%)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
