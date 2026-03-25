import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, ExternalLink, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const payrollData = [
  { period: 'September', amount: 10998 },
  { period: 'August', amount: 6800 },
  { period: 'July', amount: 7200 },
];

const newHires = [
  { name: 'Shauna, Gary',     id: '084_A_4' },
  { name: 'Stern, Jane',      id: '084_A_3' },
  { name: 'Adamson, Margret', id: '084_K_4' },
  { name: 'Adams, Mary',      id: '084_K_4' },
];

const contacts = [
  { name: 'White, Betty',    role: 'Primary Contact' },
  { name: 'Sanders, Colonel', role: 'Primary Contact' },
];

// ── Widget ────────────────────────────────────────────────────────────────────
const Widget = ({
  id,
  title,
  topColor,
  btnColor,
  children,
  onViewMore,
  viewMoreLabel,
}: {
  id: string;
  title: string;
  topColor: string;   // tailwind border-top color class
  btnColor: string;   // tailwind bg color for VIEW MORE button
  children: React.ReactNode;
  onViewMore?: () => void;
  viewMoreLabel?: string;
}) => (
  <div
    id={id}
    className={`bg-white rounded shadow-sm flex flex-col overflow-hidden border-t-4 ${topColor}`}
  >
    {/* Widget header */}
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[hsl(0,0%,90%)]">
      <span className="text-sm font-semibold text-foreground">{title}</span>
      <div className="flex items-center gap-1">
        <button aria-label={`Chart view for ${title}`} className="p-0.5 text-muted-foreground hover:text-foreground">
          <BarChart2 size={13} aria-hidden="true" />
        </button>
        <button aria-label={`Expand ${title}`} className="p-0.5 text-muted-foreground hover:text-foreground">
          <ExternalLink size={13} aria-hidden="true" />
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 px-4 py-3">{children}</div>

    {/* VIEW MORE */}
    {onViewMore && (
      <div className="px-4 pb-3">
        <button
          id={`${id}-view-more-btn`}
          onClick={onViewMore}
          aria-label={viewMoreLabel ?? `View more for ${title}`}
          className={`${btnColor} text-white text-[11px] font-semibold px-4 py-1.5 rounded-sm flex items-center gap-2 hover:opacity-90 transition-opacity`}
        >
          VIEW MORE
          <span className="w-5 h-5 rounded-full border border-white/60 flex items-center justify-center text-[10px]">
            →
          </span>
        </button>
      </div>
    )}
  </div>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────
const ESERSDashboard = () => {
  const navigate = useNavigate();
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');

  return (
    <div id="esers-dashboard-page" data-testid="esers-dashboard-page" className="p-5 bg-[hsl(0,0%,94%)] min-h-full">

      {/* Top row */}
      <div id="esers-dashboard-top-row" className="grid grid-cols-3 gap-4 mb-4">

        {/* 1 — Alerts & Messages */}
        <Widget
          id="esers-widget-alerts"
          title="Alerts & Messages"
          topColor="border-[hsl(36,100%,50%)]"
          btnColor="bg-[hsl(82,52%,37%)]"
          onViewMore={() => {}}
          viewMoreLabel="View all alerts and messages"
        >
          <p className="text-sm text-muted-foreground py-4">No records to display.</p>
        </Widget>

        {/* 2 — Upload Files */}
        <Widget
          id="esers-widget-upload"
          title="Upload Files"
          topColor="border-portal-blue"
          btnColor="bg-[hsl(36,90%,48%)]"
          onViewMore={() => navigate('/esers/upload')}
          viewMoreLabel="Go to Upload Files"
        >
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="dashboard-file-type" className="text-xs text-muted-foreground block mb-1">
                File Type :
              </label>
              <select
                id="dashboard-file-type"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full border border-[hsl(0,0%,75%)] rounded px-2 py-1.5 text-xs bg-[hsl(207,80%,92%)] focus:outline-none focus:border-portal-blue"
                aria-label="File type selection"
              >
                <option value=""></option>
                <option value="contribution">Contribution File</option>
                <option value="employment-change">Employment Change File</option>
                <option value="enrollment">Enrollment File</option>
                <option value="supplemental">Supplemental File</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="dashboard-file-browse"
                className="cursor-pointer bg-[hsl(0,0%,88%)] border border-[hsl(0,0%,72%)] rounded px-3 py-1 text-xs hover:bg-[hsl(0,0%,82%)] flex-shrink-0 font-medium"
                aria-label="Browse for file"
              >
                Browse
                <input
                  id="dashboard-file-browse"
                  type="file"
                  accept=".csv,.xlsx,.txt"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                  aria-label="File input"
                />
              </label>
              <button
                aria-label="Clear selected file"
                onClick={() => setFileName('')}
                className="bg-[hsl(0,0%,88%)] border border-[hsl(0,0%,72%)] rounded px-3 py-1 text-xs hover:bg-[hsl(0,0%,82%)] flex-shrink-0 font-medium"
              >
                Clear
              </button>
              {fileName && (
                <span className="text-xs text-muted-foreground truncate">{fileName}</span>
              )}
            </div>
          </div>
        </Widget>

        {/* 3 — Agency Statements */}
        <Widget
          id="esers-widget-agency-statement"
          title="Agency Statements"
          topColor="border-[hsl(36,90%,52%)]"
          btnColor="bg-[hsl(36,90%,48%)]"
          onViewMore={() => navigate('/esers/agency-statement')}
          viewMoreLabel="Go to Agency Statement"
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            {/* Run Date — red */}
            <div className="bg-[hsl(0,72%,51%)] text-white rounded px-3 py-2 text-center">
              <div className="text-[10px] font-medium opacity-90 mb-0.5">Run Date</div>
              <div className="font-bold text-[13px]">2017-09-30</div>
            </div>
            {/* Balance Amount — blue */}
            <div className="bg-[hsl(207,72%,44%)] text-white rounded px-3 py-2 text-center">
              <div className="text-[10px] font-medium opacity-90 mb-0.5">Balance Amount</div>
              <div className="font-bold text-[13px]">$6,056.58</div>
            </div>
            {/* Remittance Amount — teal */}
            <div className="bg-[hsl(174,60%,38%)] text-white rounded px-3 py-2 text-center">
              <div className="text-[10px] font-medium opacity-90 mb-0.5">Remittance Amount</div>
              <div className="font-bold text-[13px]">$516.76</div>
            </div>
            {/* Min Due Amount — gold */}
            <div className="bg-[hsl(36,88%,48%)] text-white rounded px-3 py-2 text-center">
              <div className="text-[10px] font-medium opacity-90 mb-0.5">Min Due Amount</div>
              <div className="font-bold text-[13px]">$0.00</div>
            </div>
          </div>
        </Widget>
      </div>

      {/* Bottom row */}
      <div id="esers-dashboard-bottom-row" className="grid grid-cols-3 gap-4">

        {/* 4 — Payroll Reports */}
        <Widget
          id="esers-widget-payroll"
          title="Payroll Reports"
          topColor="border-[hsl(36,100%,50%)]"
          btnColor="bg-[hsl(36,90%,48%)]"
          onViewMore={() => navigate('/esers/payroll-details')}
          viewMoreLabel="Go to Payroll Details"
        >
          <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(36,100%,50%)] inline-block" aria-hidden="true" />
            Contribution Amount
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={payrollData} margin={{ top: 4, right: 4, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 9 }} angle={-35} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Bar dataKey="amount" fill="hsl(36,88%,55%)" barSize={28} radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Widget>

        {/* 5 — New Hire */}
        <Widget
          id="esers-widget-new-hire"
          title="New Hire"
          topColor="border-portal-blue"
          btnColor="bg-portal-blue"
          onViewMore={() => navigate('/esers/employees')}
          viewMoreLabel="Go to Employees"
        >
          <div className="flex flex-col gap-1.5">
            {newHires.map((hire) => (
              <div
                key={hire.name}
                id={`esers-new-hire-${hire.id}-${hire.name.split(',')[0]}`}
                className="flex items-center gap-2 border border-[hsl(0,0%,88%)] rounded px-2 py-1.5"
              >
                <div
                  className="w-6 h-6 rounded bg-[hsl(0,0%,88%)] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <User size={12} className="text-[hsl(0,0%,50%)]" />
                </div>
                <span className="text-[11px] text-foreground flex-1">{hire.name}</span>
                <div className="flex items-center gap-1">
                  <div
                    className="w-5 h-5 rounded bg-[hsl(0,0%,82%)] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <User size={10} className="text-[hsl(0,0%,45%)]" />
                  </div>
                  <span
                    className="text-[10px] font-mono text-muted-foreground"
                    aria-label={`Employee ID ${hire.id}`}
                  >
                    {hire.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Widget>

        {/* 6 — Contact */}
        <Widget
          id="esers-widget-contact"
          title="Contact"
          topColor="border-portal-red"
          btnColor="bg-portal-red"
          onViewMore={() => navigate('/esers/organization')}
          viewMoreLabel="Go to Organization"
        >
          <div className="flex flex-col gap-2">
            {contacts.map((contact) => (
              <div
                key={contact.name}
                className="flex items-center gap-2 border border-[hsl(0,0%,88%)] rounded px-2 py-2"
              >
                <div
                  className="w-7 h-7 rounded-full bg-[hsl(0,0%,88%)] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <User size={13} className="text-[hsl(0,0%,50%)]" />
                </div>
                <span className="text-[11px] font-medium text-foreground flex-1">{contact.name}</span>
                <span className="flex items-center gap-1 text-[10px] font-medium text-portal-red">
                  <span className="w-4 h-4 rounded-sm bg-portal-red flex items-center justify-center" aria-hidden="true">
                    <User size={9} className="text-white" />
                  </span>
                  {contact.role}
                </span>
              </div>
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default ESERSDashboard;
