import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statements = [
  {
    year: 2023,
    period: 'Jan 1 – Dec 31, 2023',
    employeeContrib: '$6,800.00',
    employerContrib: '$10,600.00',
    ytdBalance: '$176,400.00',
    fileName: 'SERS_Statement_2023_M19254.pdf',
  },
  {
    year: 2022,
    period: 'Jan 1 – Dec 31, 2022',
    employeeContrib: '$6,500.00',
    employerContrib: '$10,200.00',
    ytdBalance: '$159,000.00',
    fileName: 'SERS_Statement_2022_M19254.pdf',
  },
  {
    year: 2021,
    period: 'Jan 1 – Dec 31, 2021',
    employeeContrib: '$6,200.00',
    employerContrib: '$9,800.00',
    ytdBalance: '$142,300.00',
    fileName: 'SERS_Statement_2021_M19254.pdf',
  },
  {
    year: 2020,
    period: 'Jan 1 – Dec 31, 2020',
    employeeContrib: '$5,900.00',
    employerContrib: '$9,400.00',
    ytdBalance: '$126,300.00',
    fileName: 'SERS_Statement_2020_M19254.pdf',
  },
];

const AnnualStatement = () => (
  <div id="mss-annual-statement-page" className="p-6">
    <h1 className="text-2xl font-light text-foreground mb-1">Annual Statements</h1>
    <p className="text-sm text-muted-foreground mb-6">
      Download your annual pension statements. Statements are available for tax and record-keeping purposes.
    </p>

    <div className="bg-white border rounded shadow-sm">
      <div className="px-5 py-3 border-b">
        <h2 className="text-sm font-semibold text-foreground">Available Statements</h2>
      </div>
      <table
        id="annual-statement-table"
        role="table"
        aria-label="Annual statements"
        className="w-full text-sm"
      >
        <thead>
          <tr className="bg-[hsl(0,0%,97%)] border-b">
            {['Statement Year', 'Period', 'Employee Contributions', 'Employer Contributions', 'Year-End Balance', 'Download'].map((h) => (
              <th key={h} scope="col" className="text-left px-5 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {statements.map((row) => (
            <tr key={row.year} className="border-b hover:bg-[hsl(0,0%,98%)]">
              <td className="px-5 py-3 font-bold text-foreground">{row.year}</td>
              <td className="px-5 py-3 text-muted-foreground">{row.period}</td>
              <td className="px-5 py-3">{row.employeeContrib}</td>
              <td className="px-5 py-3">{row.employerContrib}</td>
              <td className="px-5 py-3 font-semibold text-portal-blue">{row.ytdBalance}</td>
              <td className="px-5 py-3">
                <Button
                  id={`download-statement-${row.year}`}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 gap-1"
                  aria-label={`Download ${row.year} annual statement PDF`}
                  onClick={() => {}}
                >
                  <Download size={12} aria-hidden="true" />
                  PDF
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 py-3 bg-[hsl(0,0%,98%)] border-t text-xs text-muted-foreground">
        Statements are generated in PDF format and reflect contributions and balances as of December 31 each year.
        Contact SERS if you believe any information is incorrect.
      </div>
    </div>
  </div>
);

export default AnnualStatement;
