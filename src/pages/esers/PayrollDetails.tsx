import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContributionRow {
  id: string;
  memberId: string;
  name: string;
  period: string;
  type: string;
  employee: number;
  employer: number;
  serviceCredit: number;
  status: 'Posted' | 'Pending' | 'Error';
  editing: boolean;
}

const initialRows: ContributionRow[] = [
  { id: 'C001', memberId: 'M001', name: 'Alvarez, Patricia', period: 'Oct 2024', type: 'Regular', employee: 587.76, employer: 929.80, serviceCredit: 1.0, status: 'Posted', editing: false },
  { id: 'C002', memberId: 'M002', name: 'Stern, Jane', period: 'Oct 2024', type: 'Regular', employee: 0.00, employer: 0.00, serviceCredit: 0.0, status: 'Error', editing: false },
  { id: 'C003', memberId: 'M003', name: 'Garcia, Maria', period: 'Oct 2024', type: 'Regular', employee: 420.00, employer: 490.00, serviceCredit: 1.0, status: 'Posted', editing: false },
  { id: 'C004', memberId: 'M004', name: 'Johnson, Robert', period: 'Oct 2024', type: 'Regular', employee: 650.00, employer: 1012.50, serviceCredit: 1.0, status: 'Posted', editing: false },
  { id: 'C005', memberId: 'M005', name: 'Adamson, Margret', period: 'Oct 2024', type: 'Regular', employee: 360.00, employer: 420.00, serviceCredit: 1.0, status: 'Pending', editing: false },
  { id: 'C006', memberId: 'M006', name: 'Adams, Mary', period: 'Oct 2024', type: 'Regular', employee: 0.00, employer: 0.00, serviceCredit: 0.0, status: 'Error', editing: false },
  { id: 'C007', memberId: 'M007', name: 'Williams, David', period: 'Oct 2024', type: 'Supplemental', employee: 1200.00, employer: 1800.00, serviceCredit: 1.0, status: 'Posted', editing: false },
  { id: 'C008', memberId: 'M008', name: 'Davis, Michael', period: 'Oct 2024', type: 'Regular', employee: 430.00, employer: 502.50, serviceCredit: 1.0, status: 'Pending', editing: false },
];

const statusBadge = (status: ContributionRow['status']) => {
  const map: Record<ContributionRow['status'], string> = {
    Posted: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Error: 'bg-red-100 text-red-800',
  };
  return map[status];
};

const PayrollDetails = () => {
  const [rows, setRows] = useState<ContributionRow[]>(initialRows);
  const [periodFilter, setPeriodFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleEdit = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, editing: !r.editing } : r)));
  };

  const updateRow = (id: string, field: 'employee' | 'employer', value: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: parseFloat(value) || 0 } : r))
    );
  };

  const saveRow = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, editing: false, status: 'Pending' } : r)));
  };

  const filtered = rows.filter((r) => {
    if (periodFilter && r.period !== periodFilter) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  return (
    <div id="esers-payroll-details-page" className="p-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-light text-foreground">Payroll Details</h1>
        <Button
          id="esers-add-contribution-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-portal-blue hover:bg-portal-blue/90 text-white text-xs"
          aria-label="Add Contribution"
        >
          + Add Contribution
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">View and edit individual member contribution records.</p>

      {/* Add form */}
      {showAddForm && (
        <div id="esers-add-contribution-form" className="bg-blue-50 border border-portal-blue rounded p-5 mb-5">
          <h2 className="text-sm font-semibold mb-3">Add Contribution Record</h2>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {['Member ID', 'Period', 'Contribution Type', 'Employee Amount', 'Employer Amount', 'Service Credit (months)'].map((label) => (
              <div key={label}>
                <label className="text-xs font-semibold block mb-1">{label}</label>
                <Input className="text-xs" aria-label={label} />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button className="bg-portal-green hover:bg-portal-green/90 text-white text-xs" aria-label="Save contribution">Save</Button>
            <Button variant="outline" className="text-xs" onClick={() => setShowAddForm(false)} aria-label="Cancel">Cancel</Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="pd-period-filter" className="text-xs font-semibold">Period:</label>
          <select
            id="pd-period-filter"
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="border rounded px-2 py-1.5 text-xs bg-white"
            aria-label="Filter by period"
          >
            <option value="">All</option>
            <option>Oct 2024</option>
            <option>Sep 2024</option>
            <option>Aug 2024</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="pd-status-filter" className="text-xs font-semibold">Status:</label>
          <select
            id="pd-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1.5 text-xs bg-white"
            aria-label="Filter by status"
          >
            <option value="">All</option>
            <option>Posted</option>
            <option>Pending</option>
            <option>Error</option>
          </select>
        </div>
      </div>

      <div className="bg-white border rounded shadow-sm">
        <table
          id="payroll-details-table"
          role="table"
          aria-label="Payroll contribution details"
          className="w-full text-sm"
        >
          <thead>
            <tr className="bg-[hsl(0,0%,97%)] border-b">
              {['Member ID', 'Name', 'Period', 'Type', 'Employee Amt', 'Employer Amt', 'Service Credit', 'Status', 'Actions'].map((h) => (
                <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} id={`pd-row-${row.id}`} className="border-b hover:bg-[hsl(0,0%,98%)]">
                <td className="px-4 py-3 font-mono text-xs">{row.memberId}</td>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.period}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3">
                  {row.editing ? (
                    <Input
                      id={`pd-employee-${row.id}`}
                      defaultValue={row.employee.toFixed(2)}
                      onBlur={(e) => updateRow(row.id, 'employee', e.target.value)}
                      className="h-7 text-xs w-28"
                      aria-label={`Edit employee amount for ${row.name}`}
                    />
                  ) : (
                    `$${row.employee.toFixed(2)}`
                  )}
                </td>
                <td className="px-4 py-3">
                  {row.editing ? (
                    <Input
                      id={`pd-employer-${row.id}`}
                      defaultValue={row.employer.toFixed(2)}
                      onBlur={(e) => updateRow(row.id, 'employer', e.target.value)}
                      className="h-7 text-xs w-28"
                      aria-label={`Edit employer amount for ${row.name}`}
                    />
                  ) : (
                    `$${row.employer.toFixed(2)}`
                  )}
                </td>
                <td className="px-4 py-3">{row.serviceCredit.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusBadge(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {row.editing ? (
                    <Button
                      id={`pd-save-${row.id}`}
                      size="sm"
                      className="h-7 text-xs bg-portal-green hover:bg-portal-green/90 text-white"
                      onClick={() => saveRow(row.id)}
                      aria-label={`Save edits for ${row.name}`}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      id={`pd-edit-${row.id}`}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => toggleEdit(row.id)}
                      aria-label={`Edit contribution for ${row.name}`}
                    >
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollDetails;
