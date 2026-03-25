import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statements = [
  { id: 'AS-2024-10', runDate: '2024-09-30', period: 'Sep 2024', balance: 6056.58, remittance: 516.76, minDue: 0.00, status: 'Final' },
  { id: 'AS-2024-09', runDate: '2024-08-31', period: 'Aug 2024', balance: 5902.14, remittance: 498.22, minDue: 0.00, status: 'Final' },
  { id: 'AS-2024-08', runDate: '2024-07-31', period: 'Jul 2024', balance: 5740.88, remittance: 482.10, minDue: 0.00, status: 'Final' },
  { id: 'AS-2024-07', runDate: '2024-06-30', period: 'Jun 2024', balance: 5610.20, remittance: 462.88, minDue: 0.00, status: 'Final' },
];

const AgencyStatement = () => (
  <div id="esers-agency-statement-page" className="p-6">
    <h1 className="text-2xl font-light text-foreground mb-1">Agency Statement</h1>
    <p className="text-sm text-muted-foreground mb-5">Monthly agency balance and remittance summaries.</p>

    {/* Summary card (current) */}
    <div className="bg-white border rounded shadow-sm p-5 mb-5">
      <h2 className="text-sm font-semibold mb-3">Current Period Summary</h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          ['Run Date', '2017-09-30'],
          ['Balance Amount', '$6,056.58'],
          ['Remittance Amount', '$516.76'],
          ['Min Due Amount', '$0.00'],
        ].map(([label, value]) => (
          <div key={label} className="bg-[hsl(0,0%,97%)] border rounded p-3">
            <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
            <div className="text-sm font-semibold text-foreground">{value}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Statements table */}
    <div className="bg-white border rounded shadow-sm">
      <div className="px-5 py-3 border-b">
        <h2 className="text-sm font-semibold text-foreground">Statement History</h2>
      </div>
      <table role="table" aria-label="Agency statements" className="w-full text-sm">
        <thead>
          <tr className="bg-[hsl(0,0%,97%)] border-b">
            {['Statement ID', 'Run Date', 'Period', 'Balance Amount', 'Remittance Amount', 'Min Due', 'Status', 'Download'].map((h) => (
              <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {statements.map((row) => (
            <tr key={row.id} className="border-b hover:bg-[hsl(0,0%,98%)]">
              <td className="px-4 py-3 font-mono text-xs text-portal-blue">{row.id}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.runDate}</td>
              <td className="px-4 py-3 font-medium">{row.period}</td>
              <td className="px-4 py-3 font-semibold">${row.balance.toFixed(2)}</td>
              <td className="px-4 py-3">${row.remittance.toFixed(2)}</td>
              <td className="px-4 py-3">${row.minDue.toFixed(2)}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <Button variant="outline" size="sm" className="text-xs h-7 gap-1" aria-label={`Download statement ${row.id}`}>
                  <Download size={12} aria-hidden="true" />
                  PDF
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AgencyStatement;
