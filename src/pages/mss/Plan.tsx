import { Link } from 'react-router-dom';

const Plan = () => {
  const contributionRates = [
    { description: 'Employee Contribution Rate', rate: '9.00%', amount: '$587.76/mo' },
    { description: 'Employer Contribution Rate', rate: '14.25%', amount: '$929.80/mo' },
    { description: 'Total Combined Rate', rate: '23.25%', amount: '$1,517.56/mo' },
  ];

  return (
    <div id="mss-plan-page" className="p-6">
      <h1 className="text-2xl font-light text-foreground mb-1">Plan</h1>
      <p className="text-sm text-muted-foreground mb-6">Your current pension plan details and benefit projections.</p>

      {/* Plan Summary */}
      <div className="bg-white border rounded shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-4 border-b pb-2">Plan Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            ['Plan Type', 'Defined Benefit'],
            ['Plan Name', 'SERS Miscellaneous — Tier 1'],
            ['Enrollment Date', '2008-03-15'],
            ['Vesting Status', 'Vested'],
            ['Years of Service', '16.0 years'],
            ['Service Credit', '16.0 years'],
            ['Benefit Factor', '2.0% per year'],
            ['Final Average Salary', '$78,400.00'],
            ['Normal Retirement Age', '60'],
          ].map(([label, value]) => (
            <div key={label} className="bg-[hsl(0,0%,97%)] border rounded p-3">
              <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
              <div className="text-sm font-semibold text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Rates */}
      <div className="bg-white border rounded shadow-sm mb-6">
        <div className="px-5 py-3 border-b">
          <h2 className="text-sm font-semibold text-foreground">Contribution Rates</h2>
        </div>
        <table
          id="plan-contribution-table"
          role="table"
          aria-label="Plan contribution rates"
          className="w-full text-sm"
        >
          <thead>
            <tr className="bg-[hsl(0,0%,97%)] border-b">
              <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</th>
              <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rate</th>
              <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Monthly Amount</th>
            </tr>
          </thead>
          <tbody>
            {contributionRates.map((row, i) => (
              <tr key={i} className="border-b hover:bg-[hsl(0,0%,98%)]">
                <td className="px-5 py-3">{row.description}</td>
                <td className="px-5 py-3 font-semibold">{row.rate}</td>
                <td className="px-5 py-3 text-muted-foreground">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View More link */}
      <div className="bg-blue-50 border border-portal-blue rounded p-4">
        <p className="text-sm text-foreground mb-2">
          Want to see your projected retirement benefit at various ages?
        </p>
        <Link
          to="/mss/benefit-estimate"
          className="text-sm text-portal-blue font-semibold hover:underline"
          aria-label="View More — Benefit Estimate"
        >
          VIEW MORE → Benefit Estimate
        </Link>
      </div>
    </div>
  );
};

export default Plan;
