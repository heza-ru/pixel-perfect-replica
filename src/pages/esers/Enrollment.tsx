import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const enrollments = [
  { id: 'ENR-001', name: 'Shauna, Gary', memberId: '084_A_4', startDate: '2024-10-01', planType: 'Defined Benefit', status: 'Pending' },
  { id: 'ENR-002', name: 'Adams, Mary', memberId: '084_K_4', startDate: '2024-10-01', planType: 'Defined Contribution', status: 'Approved' },
  { id: 'ENR-003', name: 'Adamson, Margret', memberId: '084_K_4', startDate: '2024-10-01', planType: 'Defined Benefit', status: 'Pending' },
];

const Enrollment = () => (
  <div id="esers-enrollment-page" className="p-6">
    <div className="flex items-center justify-between mb-1">
      <h1 className="text-2xl font-light text-foreground">Enrollment Request</h1>
      <Button className="bg-portal-blue hover:bg-portal-blue/90 text-white text-xs" aria-label="New Enrollment Request">
        + New Enrollment
      </Button>
    </div>
    <p className="text-sm text-muted-foreground mb-5">Submit and manage employee enrollment requests.</p>

    {/* New enrollment form */}
    <div className="bg-white border rounded shadow-sm p-5 mb-5">
      <h2 className="text-sm font-semibold mb-3">New Enrollment Form</h2>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {[
          { id: 'enr-first-name', label: 'First Name' },
          { id: 'enr-last-name', label: 'Last Name' },
          { id: 'enr-ssn', label: 'SSN' },
          { id: 'enr-dob', label: 'Date of Birth', type: 'date' },
          { id: 'enr-start', label: 'Employment Start Date', type: 'date' },
          { id: 'enr-salary', label: 'Annual Salary' },
        ].map((f) => (
          <div key={f.id}>
            <Label htmlFor={f.id} className="text-xs font-semibold">{f.label}</Label>
            <Input id={f.id} type={f.type ?? 'text'} className="mt-1 text-sm" aria-label={f.label} />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button className="bg-portal-green hover:bg-portal-green/90 text-white text-xs" aria-label="Submit enrollment">Submit</Button>
        <Button variant="outline" className="text-xs" aria-label="Clear form">Clear</Button>
      </div>
    </div>

    {/* Existing enrollments */}
    <div className="bg-white border rounded shadow-sm">
      <div className="px-5 py-3 border-b">
        <h2 className="text-sm font-semibold text-foreground">Pending Enrollments</h2>
      </div>
      <table role="table" aria-label="Enrollment requests" className="w-full text-sm">
        <thead>
          <tr className="bg-[hsl(0,0%,97%)] border-b">
            {['ID', 'Name', 'Member ID', 'Start Date', 'Plan Type', 'Status'].map((h) => (
              <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => (
            <tr key={e.id} className="border-b hover:bg-[hsl(0,0%,98%)]">
              <td className="px-4 py-3 font-mono text-xs text-portal-blue">{e.id}</td>
              <td className="px-4 py-3 font-medium">{e.name}</td>
              <td className="px-4 py-3 font-mono text-xs">{e.memberId}</td>
              <td className="px-4 py-3 text-muted-foreground">{e.startDate}</td>
              <td className="px-4 py-3 text-muted-foreground">{e.planType}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${e.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {e.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Enrollment;
