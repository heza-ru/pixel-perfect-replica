const headers = [
  { id: 'PH-001', period: 'Oct 2024', submissionDate: '2024-10-01', totalEmployees: 248, totalEmployee: 87654.32, totalEmployer: 135867.20, status: 'Posted' },
  { id: 'PH-002', period: 'Sep 2024', submissionDate: '2024-09-01', totalEmployees: 245, totalEmployee: 86244.18, totalEmployer: 133678.48, status: 'Posted' },
  { id: 'PH-003', period: 'Aug 2024', submissionDate: '2024-08-01', totalEmployees: 244, totalEmployee: 85920.00, totalEmployer: 133176.00, status: 'Posted' },
  { id: 'PH-004', period: 'Jul 2024', submissionDate: '2024-07-01', totalEmployees: 242, totalEmployee: 84800.00, totalEmployer: 131440.00, status: 'Posted' },
];

const PayrollHeader = () => (
  <div id="esers-payroll-header-page" className="p-6">
    <h1 className="text-2xl font-light text-foreground mb-1">Payroll Header</h1>
    <p className="text-sm text-muted-foreground mb-5">Summary of payroll submission batches by period.</p>

    <div className="bg-white border rounded shadow-sm">
      <div className="px-5 py-3 border-b">
        <h2 className="text-sm font-semibold text-foreground">Payroll Header Records</h2>
      </div>
      <table role="table" aria-label="Payroll header records" className="w-full text-sm">
        <thead>
          <tr className="bg-[hsl(0,0%,97%)] border-b">
            {['Header ID', 'Period', 'Submission Date', 'Total Employees', 'Total Employee Contrib.', 'Total Employer Contrib.', 'Status'].map((h) => (
              <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {headers.map((row) => (
            <tr key={row.id} className="border-b hover:bg-[hsl(0,0%,98%)]">
              <td className="px-4 py-3 font-mono text-xs text-portal-blue">{row.id}</td>
              <td className="px-4 py-3 font-medium">{row.period}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.submissionDate}</td>
              <td className="px-4 py-3">{row.totalEmployees}</td>
              <td className="px-4 py-3 font-semibold">${row.totalEmployee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              <td className="px-4 py-3 font-semibold">${row.totalEmployer.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PayrollHeader;
