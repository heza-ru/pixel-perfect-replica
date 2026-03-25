import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Employee {
  id: string;
  name: string;
  ssn: string;
  planType: string;
  startDate: string;
  status: 'Active' | 'Inactive' | 'Terminated';
}

const employees: Employee[] = [
  { id: 'M001', name: 'Alvarez, Patricia', ssn: '***-**-4521', planType: 'Defined Benefit', startDate: '2008-03-15', status: 'Active' },
  { id: 'M002', name: 'Stern, Jane', ssn: '***-**-7834', planType: 'Defined Benefit', startDate: '2024-09-01', status: 'Active' },
  { id: 'M003', name: 'Garcia, Maria', ssn: '***-**-2267', planType: 'Defined Contribution', startDate: '2015-09-22', status: 'Active' },
  { id: 'M004', name: 'Adamson, Margret', ssn: '***-**-9912', planType: 'Defined Benefit', startDate: '2024-10-01', status: 'Active' },
  { id: 'M005', name: 'Adams, Mary', ssn: '***-**-6603', planType: 'Defined Contribution', startDate: '2024-10-01', status: 'Active' },
  { id: 'M006', name: 'Johnson, Robert', ssn: '***-**-3344', planType: 'Defined Benefit', startDate: '2002-01-10', status: 'Active' },
  { id: 'M007', name: 'Williams, David', ssn: '***-**-8873', planType: 'Defined Benefit', startDate: '2010-04-18', status: 'Inactive' },
  { id: 'M008', name: 'Chen, Lisa', ssn: '***-**-5591', planType: 'Defined Contribution', startDate: '2019-06-03', status: 'Active' },
];

const statusBadge = (status: Employee['status']) => {
  const map: Record<Employee['status'], string> = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-yellow-100 text-yellow-800',
    Terminated: 'bg-red-100 text-red-800',
  };
  return map[status];
};

const Employees = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = employees.filter((e) => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div id="esers-employees-page" className="p-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-light text-foreground">Employees</h1>
        <Button
          id="esers-new-hire-btn"
          className="bg-portal-green hover:bg-portal-green/90 text-white text-xs"
          aria-label="New Hire"
        >
          + New Hire
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-5">View and manage employees enrolled in your organization's pension plan.</p>

      {/* Search + filter */}
      <div className="flex items-center gap-3 mb-4">
        <Input
          id="employee-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or ID..."
          className="text-sm max-w-xs"
          aria-label="Search employees"
        />
        <select
          id="employee-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm bg-white"
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Terminated</option>
        </select>
      </div>

      <div className="bg-white border rounded shadow-sm">
        <table
          id="employees-table"
          role="table"
          aria-label="Employees"
          className="w-full text-sm"
        >
          <thead>
            <tr className="bg-[hsl(0,0%,97%)] border-b">
              {['Employee ID', 'Name', 'SSN', 'Plan Type', 'Start Date', 'Status', 'Actions'].map((h) => (
                <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id} id={`employee-row-${emp.id}`} className="border-b hover:bg-[hsl(0,0%,98%)]">
                <td className="px-4 py-3 font-mono text-xs">{emp.id}</td>
                <td className="px-4 py-3 font-medium">{emp.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{emp.ssn}</td>
                <td className="px-4 py-3 text-muted-foreground">{emp.planType}</td>
                <td className="px-4 py-3 text-muted-foreground">{emp.startDate}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusBadge(emp.status)}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button id={`emp-view-${emp.id}`} variant="outline" size="sm" className="h-7 text-xs" aria-label={`View ${emp.name}`}>View</Button>
                    <Button id={`emp-edit-${emp.id}`} variant="outline" size="sm" className="h-7 text-xs" aria-label={`Edit ${emp.name}`}>Edit</Button>
                    <Button id={`emp-change-${emp.id}`} variant="outline" size="sm" className="h-7 text-xs" aria-label={`Employment change for ${emp.name}`}>Change</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-5 py-8 text-center text-muted-foreground text-sm">No employees match the current filters.</div>
        )}
      </div>
    </div>
  );
};

export default Employees;
