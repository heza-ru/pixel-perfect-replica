const EmploymentInfo = () => {
  const employmentHistory = [
    {
      employer: 'City Finance Department',
      startDate: '2008-03-15',
      endDate: 'Present',
      status: 'Active',
      plan: 'Defined Benefit',
    },
    {
      employer: 'State Education Board',
      startDate: '2004-01-10',
      endDate: '2008-03-01',
      status: 'Terminated',
      plan: 'Defined Contribution',
    },
  ];

  return (
    <div id="mss-employment-info-page" className="p-6">
      <h1 className="text-2xl font-light text-foreground mb-1">Employment Info</h1>
      <p className="text-sm text-muted-foreground mb-6">Your employment history and current position details.</p>

      {/* Current position details */}
      <div className="bg-white border rounded shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4 border-b pb-2">Current Employment Details</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            ['Employer', 'City Finance Department'],
            ['Job Title', 'Senior Financial Analyst'],
            ['Department', 'Budget & Finance'],
            ['FTE Percentage', '100%'],
            ['Employment Type', 'Full-Time'],
            ['Start Date', '2008-03-15'],
            ['Annual Salary', '$78,400.00'],
            ['Pay Frequency', 'Bi-Weekly'],
            ['Employee Class', 'Class A — Miscellaneous'],
          ].map(([label, value]) => (
            <div key={label} className="bg-[hsl(0,0%,97%)] border rounded p-3">
              <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
              <div className="text-sm font-semibold text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Employment History table */}
      <div className="bg-white border rounded shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="text-sm font-semibold text-foreground">Employment History</h2>
        </div>
        <table
          id="employment-history-table"
          role="table"
          aria-label="Employment history"
          className="w-full text-sm"
        >
          <thead>
            <tr className="bg-[hsl(0,0%,97%)] border-b">
              <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employer</th>
              <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Start Date</th>
              <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">End Date</th>
              <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plan</th>
            </tr>
          </thead>
          <tbody>
            {employmentHistory.map((row, i) => (
              <tr key={i} className="border-b hover:bg-[hsl(0,0%,98%)]">
                <td className="px-5 py-3 font-medium">{row.employer}</td>
                <td className="px-5 py-3 text-muted-foreground">{row.startDate}</td>
                <td className="px-5 py-3 text-muted-foreground">{row.endDate}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      row.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-[hsl(0,0%,90%)] text-muted-foreground'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{row.plan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmploymentInfo;
