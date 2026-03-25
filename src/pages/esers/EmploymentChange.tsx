import { Button } from '@/components/ui/button';

const changes = [
  { id: 'EC-001', employee: 'Alvarez, Patricia', type: 'Salary Increase', effectiveDate: '2024-10-01', oldValue: '$75,000', newValue: '$78,400', status: 'Approved' },
  { id: 'EC-002', employee: 'Williams, David', type: 'Status Change', effectiveDate: '2024-09-15', oldValue: 'Active', newValue: 'Inactive', status: 'Processed' },
  { id: 'EC-003', employee: 'Chen, Lisa', type: 'FTE Change', effectiveDate: '2024-10-01', oldValue: '100%', newValue: '75%', status: 'Pending' },
];

const EmploymentChange = () => (
  <div id="esers-employment-change-page" className="p-6">
    <div className="flex items-center justify-between mb-1">
      <h1 className="text-2xl font-light text-foreground">Employment Change Request</h1>
      <Button className="bg-portal-blue hover:bg-portal-blue/90 text-white text-xs" aria-label="New Employment Change Request">
        + New Change Request
      </Button>
    </div>
    <p className="text-sm text-muted-foreground mb-5">Submit employment status changes, salary updates, and FTE adjustments.</p>

    <div className="bg-white border rounded shadow-sm">
      <div className="px-5 py-3 border-b">
        <h2 className="text-sm font-semibold text-foreground">Recent Change Requests</h2>
      </div>
      <table role="table" aria-label="Employment change requests" className="w-full text-sm">
        <thead>
          <tr className="bg-[hsl(0,0%,97%)] border-b">
            {['ID', 'Employee', 'Change Type', 'Effective Date', 'Old Value', 'New Value', 'Status'].map((h) => (
              <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {changes.map((c) => (
            <tr key={c.id} className="border-b hover:bg-[hsl(0,0%,98%)]">
              <td className="px-4 py-3 font-mono text-xs text-portal-blue">{c.id}</td>
              <td className="px-4 py-3 font-medium">{c.employee}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.type}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.effectiveDate}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.oldValue}</td>
              <td className="px-4 py-3 font-semibold">{c.newValue}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  c.status === 'Approved' || c.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default EmploymentChange;
