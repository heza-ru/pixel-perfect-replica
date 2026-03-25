const remittances = [
  { id: 'REM-001', period: 'Oct 2024', dueDate: '2024-10-15', amount: 223521.52, paid: 223521.52, balance: 0.00, status: 'Paid' },
  { id: 'REM-002', period: 'Sep 2024', dueDate: '2024-09-15', amount: 219922.66, paid: 219922.66, balance: 0.00, status: 'Paid' },
  { id: 'REM-003', period: 'Aug 2024', dueDate: '2024-08-15', amount: 219096.00, paid: 200000.00, balance: 19096.00, status: 'Partial' },
  { id: 'REM-004', period: 'Jul 2024', dueDate: '2024-07-15', amount: 216240.00, paid: 0.00, balance: 216240.00, status: 'Overdue' },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Paid: 'bg-green-100 text-green-800',
    Partial: 'bg-yellow-100 text-yellow-800',
    Overdue: 'bg-red-100 text-red-800',
  };
  return map[status] ?? 'bg-[hsl(0,0%,90%)] text-muted-foreground';
};

const PayrollRemittances = () => (
  <div id="esers-payroll-remittances-page" className="p-6">
    <h1 className="text-2xl font-light text-foreground mb-1">Payroll Remittances</h1>
    <p className="text-sm text-muted-foreground mb-5">Track payroll remittance payments and outstanding balances.</p>

    <div className="bg-white border rounded shadow-sm">
      <div className="px-5 py-3 border-b">
        <h2 className="text-sm font-semibold text-foreground">Remittance History</h2>
      </div>
      <table role="table" aria-label="Payroll remittances" className="w-full text-sm">
        <thead>
          <tr className="bg-[hsl(0,0%,97%)] border-b">
            {['ID', 'Period', 'Due Date', 'Amount Due', 'Amount Paid', 'Balance', 'Status'].map((h) => (
              <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {remittances.map((row) => (
            <tr key={row.id} className="border-b hover:bg-[hsl(0,0%,98%)]">
              <td className="px-4 py-3 font-mono text-xs text-portal-blue">{row.id}</td>
              <td className="px-4 py-3 font-medium">{row.period}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.dueDate}</td>
              <td className="px-4 py-3 font-semibold">${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              <td className="px-4 py-3">${row.paid.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              <td className={`px-4 py-3 font-semibold ${row.balance > 0 ? 'text-portal-red' : 'text-portal-green'}`}>
                ${row.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusBadge(row.status)}`}>
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

export default PayrollRemittances;
