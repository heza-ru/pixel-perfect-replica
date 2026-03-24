import { useState } from 'react';
import { Upload, AlertTriangle } from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import { employers, uploadRecords, UploadRecord } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EmployerPortalProps {
  navigate: NavigateFn;
}

const employerStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status === 'Current') return 'secondary';
  if (status === 'Error') return 'destructive';
  return 'outline';
};

const uploadStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status === 'Success') return 'secondary';
  if (status === 'Error') return 'destructive';
  if (status === 'Pending Review') return 'default';
  return 'outline';
};

const EmployerPortal = ({ navigate: _navigate }: EmployerPortalProps) => {
  const [selectedEmployer, setSelectedEmployer] = useState<string | null>(null);
  const [errorEdits, setErrorEdits] = useState<Record<string, string>>({});
  const [savedRows, setSavedRows] = useState<Set<string>>(new Set());
  const [uploadRecordsState, setUploadRecordsState] = useState<UploadRecord[]>(uploadRecords);

  const visibleUploads = selectedEmployer
    ? uploadRecordsState.filter((u) => u.employerId === selectedEmployer)
    : uploadRecordsState;

  const handleSaveError = (rowId: string) => {
    setUploadRecordsState((prev) =>
      prev.map((r) =>
        r.id === rowId ? { ...r, errorDetails: errorEdits[rowId] ?? r.errorDetails, status: 'Pending Review' } : r
      )
    );
    setSavedRows((prev) => new Set([...prev, rowId]));
  };

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-light text-foreground">Employer Portal</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage employer contributions and file uploads</p>
        </div>
        <Button size="sm">
          <Upload size={14} className="mr-1.5" /> Upload Contribution File
        </Button>
      </div>

      {/* Employer List */}
      <div className="bg-white rounded border border-border mb-6">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold">Employers</h2>
          {selectedEmployer && (
            <button
              onClick={() => setSelectedEmployer(null)}
              className="text-xs text-portal-blue hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employer ID</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Organization Name</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Last Upload</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Upload Status</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Errors</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((emp) => (
              <tr
                key={emp.id}
                className={`border-b hover:bg-muted/20 transition-colors ${
                  selectedEmployer === emp.id ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{emp.id}</td>
                <td className="px-4 py-3 font-medium">{emp.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{emp.contactName}</td>
                <td className="px-4 py-3 text-muted-foreground">{emp.lastUpload}</td>
                <td className="px-4 py-3">
                  <Badge variant={employerStatusVariant(emp.status)}>{emp.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  {emp.errorCount > 0 ? (
                    <span className="flex items-center gap-1 text-destructive font-medium">
                      <AlertTriangle size={12} /> {emp.errorCount}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setSelectedEmployer(selectedEmployer === emp.id ? null : emp.id)}
                  >
                    View Contributions
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contribution Uploads */}
      <div className="bg-white rounded border border-border">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            Contribution Uploads
            {selectedEmployer && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                — {employers.find((e) => e.id === selectedEmployer)?.name}
              </span>
            )}
          </h2>
          <Button size="sm" variant="outline">
            <Upload size={12} className="mr-1.5" /> Upload New File
          </Button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Upload ID</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employer</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">File Name</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Period</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Upload Date</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total Amount</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Error Detail / Row</th>
            </tr>
          </thead>
          <tbody>
            {visibleUploads.map((row) => (
              <tr
                key={row.id}
                className={`border-b ${row.status === 'Error' ? 'bg-red-50' : 'hover:bg-muted/20'} transition-colors`}
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.id}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{row.employerName}</td>
                <td className="px-4 py-3 font-mono text-xs">{row.fileName}</td>
                <td className="px-4 py-3">{row.period}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.uploadDate}</td>
                <td className="px-4 py-3">
                  {row.totalAmount > 0 ? `$${row.totalAmount.toLocaleString()}` : '—'}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={uploadStatusVariant(savedRows.has(row.id) ? 'Pending Review' : row.status)}>
                    {savedRows.has(row.id) ? 'Pending Review' : row.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {row.status === 'Error' && !savedRows.has(row.id) ? (
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground mr-1">Row {row.rowNumber}:</div>
                      <Input
                        value={errorEdits[row.id] ?? row.errorDetails ?? ''}
                        onChange={(e) =>
                          setErrorEdits((prev) => ({ ...prev, [row.id]: e.target.value }))
                        }
                        className="h-7 text-xs w-44"
                      />
                      <Button
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleSaveError(row.id)}
                      >
                        Save
                      </Button>
                    </div>
                  ) : row.errorDetails && savedRows.has(row.id) ? (
                    <span className="text-xs text-muted-foreground italic">Corrected — pending review</span>
                  ) : row.errorDetails ? (
                    <span className="text-xs text-muted-foreground">{row.errorDetails}</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
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

export default EmployerPortal;
