const estimates = [
  { age: 55, years: 21, monthly: 3276.0, annual: 39312.0 },
  { age: 57, years: 23, monthly: 3588.0, annual: 43056.0 },
  { age: 60, years: 26, monthly: 4056.0, annual: 48672.0 },
  { age: 62, years: 28, monthly: 4368.0, annual: 52416.0 },
  { age: 65, years: 31, monthly: 4836.0, annual: 58032.0 },
];

const BenefitEstimate = () => (
  <div id="mss-benefit-estimate-page" className="p-6">
    <h1 className="text-2xl font-light text-foreground mb-1">Benefit Estimate</h1>
    <p className="text-sm text-muted-foreground mb-6">
      Projected retirement benefits at various retirement ages based on your current service and salary.
    </p>

    {/* Assumptions card */}
    <div className="bg-white border rounded shadow-sm p-5 mb-6">
      <h2 className="text-sm font-semibold text-foreground mb-4 border-b pb-2">Calculation Assumptions</h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          ['Final Average Salary', '$78,400.00'],
          ['Benefit Factor', '2.0% per year'],
          ['Current Years of Service', '16.0 years'],
          ['Plan Type', 'Defined Benefit'],
          ['Member ID', '19254'],
          ['Calculation Date', new Date().toLocaleDateString()],
        ].map(([label, value]) => (
          <div key={label} className="bg-[hsl(0,0%,97%)] border rounded p-3">
            <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
            <div className="text-sm font-semibold text-foreground">{value}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Estimates table */}
    <div className="bg-white border rounded shadow-sm">
      <div className="px-5 py-3 border-b">
        <h2 className="text-sm font-semibold text-foreground">Projected Monthly Benefit by Retirement Age</h2>
      </div>
      <table
        id="benefit-estimate-table"
        role="table"
        aria-label="Projected benefit estimates"
        className="w-full text-sm"
      >
        <thead>
          <tr className="bg-[hsl(0,0%,97%)] border-b">
            <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Retirement Age
            </th>
            <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Years of Service
            </th>
            <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Monthly Benefit
            </th>
            <th scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Annual Benefit
            </th>
          </tr>
        </thead>
        <tbody>
          {estimates.map((row) => (
            <tr key={row.age} className="border-b hover:bg-[hsl(0,0%,98%)]">
              <td className="px-5 py-3 font-medium">{row.age}</td>
              <td className="px-5 py-3 text-muted-foreground">{row.years}</td>
              <td className="px-5 py-3 font-semibold text-portal-green">
                ${row.monthly.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
              <td className="px-5 py-3 text-muted-foreground">
                ${row.annual.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 py-3 bg-[hsl(0,0%,98%)] border-t text-xs text-muted-foreground">
        * Estimates are projections only and not a guarantee of future benefits. Final amounts may vary based on actual salary, service credit, and plan rules at time of retirement.
      </div>
    </div>
  </div>
);

export default BenefitEstimate;
