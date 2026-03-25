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
    <div id="employer-portal-page" data-testid="employer-portal-page" className="p-6">

      {/* Page header */}
      <div id="employer-portal-header" className="flex items-center justify-between mb-6">
        <div>
          <h1 id="employer-portal-title" className="text-2xl font-light text-foreground">Employer Portal</h1>
          <p id="employer-portal-subtitle" className="text-sm text-muted-foreground mt-0.5">Manage employer contributions and file uploads</p>
        </div>
        <Button
          id="employer-upload-btn"
          aria-label="Upload a new contribution file"
          data-testid="employer-upload-btn"
          size="sm"
        >
          <Upload size={14} className="mr-1.5" aria-hidden="true" /> Upload Contribution File
        </Button>
      </div>

      {/* Employer List */}
      <div id="employers-table-section" className="bg-white rounded border border-border mb-6">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 id="employers-table-title" className="text-sm font-semibold">Employers</h2>
          {selectedEmployer && (
            <button
              id="employer-filter-clear-btn"
              aria-label="Clear employer filter — show all uploads"
              onClick={() => setSelectedEmployer(null)}
              className="text-xs text-portal-blue hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
        <table id="employers-table" role="table" aria-label="Employer list" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employer ID</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Organization Name</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Last Upload</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Upload Status</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Errors</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employers.map((emp) => (
              <tr
                key={emp.id}
                id={`employer-row-${emp.id}`}
                data-testid={`employer-row-${emp.id}`}
                aria-label={`Employer: ${emp.name}`}
                className={`border-b hover:bg-muted/20 transition-colors ${selectedEmployer === emp.id ? 'bg-blue-50' : ''}`}
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{emp.id}</td>
                <td className="px-4 py-3 font-medium">{emp.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{emp.contactName}</td>
                <td className="px-4 py-3 text-muted-foreground">{emp.lastUpload}</td>
                <td className="px-4 py-3">
                  <Badge
                    id={`employer-status-badge-${emp.id}`}
                    aria-label={`Upload status: ${emp.status}`}
                    variant={employerStatusVariant(emp.status)}
                  >
                    {emp.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {emp.errorCount > 0 ? (
                    <span
                      id={`employer-error-count-${emp.id}`}
                      aria-label={`${emp.errorCount} upload errors`}
                      className="flex items-center gap-1 text-destructive font-medium"
                    >
                      <AlertTriangle size={12} aria-hidden="true" /> {emp.errorCount}
                    </span>
                  ) : (
                    <span id={`employer-no-errors-${emp.id}`} aria-label="No errors" className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Button
                    id={`employer-view-btn-${emp.id}`}
                    aria-label={`View contributions for ${emp.name}`}
                    data-testid={`employer-view-btn-${emp.id}`}
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
      <div id="uploads-table-section" className="bg-white rounded border border-border">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 id="uploads-table-title" className="text-sm font-semibold">
            Contribution Uploads
            {selectedEmployer && (
              <span id="uploads-filter-label" className="ml-2 text-xs font-normal text-muted-foreground">
                — {employers.find((e) => e.id === selectedEmployer)?.name}
              </span>
            )}
          </h2>
          <Button
            id="uploads-new-upload-btn"
            aria-label="Upload a new contribution file"
            size="sm"
            variant="outline"
          >
            <Upload size={12} className="mr-1.5" aria-hidden="true" /> Upload New File
          </Button>
        </div>
        <table id="uploads-table" role="table" aria-label="Contribution upload records" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Upload ID</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employer</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">File Name</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Period</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Upload Date</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total Amount</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Error Detail / Row</th>
            </tr>
          </thead>
          <tbody>
            {visibleUploads.map((row) => (
              <tr
                key={row.id}
                id={`upload-row-${row.id}`}
                data-testid={`upload-row-${row.id}`}
                aria-label={`Upload: ${row.fileName}`}
                className={`border-b ${row.status === 'Error' && !savedRows.has(row.id) ? 'bg-red-50' : 'hover:bg-muted/20'} transition-colors`}
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.id}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{row.employerName}</td>
                <td className="px-4 py-3 font-mono text-xs">{row.fileName}</td>
                <td className="px-4 py-3">{row.period}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.uploadDate}</td>
                <td className="px-4 py-3">{row.totalAmount > 0 ? `$${row.totalAmount.toLocaleString()}` : '—'}</td>
                <td className="px-4 py-3">
                  <Badge
                    id={`upload-status-badge-${row.id}`}
                    aria-label={`Upload status: ${savedRows.has(row.id) ? 'Pending Review' : row.status}`}
                    variant={uploadStatusVariant(savedRows.has(row.id) ? 'Pending Review' : row.status)}
                  >
                    {savedRows.has(row.id) ? 'Pending Review' : row.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {row.status === 'Error' && !savedRows.has(row.id) ? (
                    <div id={`upload-error-edit-${row.id}`} className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground mr-1">Row {row.rowNumber}:</div>
                      <Input
                        id={`upload-error-input-${row.id}`}
                        aria-label={`Edit error description for upload ${row.id}, row ${row.rowNumber}`}
                        value={errorEdits[row.id] ?? row.errorDetails ?? ''}
                        onChange={(e) => setErrorEdits((prev) => ({ ...prev, [row.id]: e.target.value }))}
                        className="h-7 text-xs w-44"
                      />
                      <Button
                        id={`upload-save-btn-${row.id}`}
                        aria-label={`Save correction for upload ${row.id}`}
                        data-testid={`upload-save-btn-${row.id}`}
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleSaveError(row.id)}
                      >
                        Save
                      </Button>
                    </div>
                  ) : row.errorDetails && savedRows.has(row.id) ? (
                    <span id={`upload-corrected-${row.id}`} className="text-xs text-muted-foreground italic">Corrected — pending review</span>
                  ) : row.errorDetails ? (
                    <span id={`upload-error-text-${row.id}`} className="text-xs text-muted-foreground">{row.errorDetails}</span>
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
