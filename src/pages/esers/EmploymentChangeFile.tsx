import { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertTriangle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FileRecord {
  id: string;
  fileName: string;
  uploadDate: string;
  period: string;
  records: number;
  processed: number;
  errors: number;
  status: 'Processed' | 'Pending Review' | 'Error';
}

const fileHistory: FileRecord[] = [
  { id: 'ECF001', fileName: 'emp_change_oct2024.csv',  uploadDate: '2024-10-15', period: 'Oct 2024', records: 12, processed: 12, errors: 0, status: 'Processed'     },
  { id: 'ECF002', fileName: 'emp_change_sep2024.xlsx', uploadDate: '2024-09-18', period: 'Sep 2024', records: 8,  processed: 6,  errors: 2, status: 'Pending Review' },
  { id: 'ECF003', fileName: 'emp_change_aug2024.csv',  uploadDate: '2024-08-14', period: 'Aug 2024', records: 15, processed: 14, errors: 1, status: 'Error'          },
];

const statusVariant = (s: FileRecord['status']): 'secondary' | 'default' | 'destructive' => {
  if (s === 'Processed')     return 'secondary';
  if (s === 'Pending Review') return 'default';
  return 'destructive';
};

const EmploymentChangeFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [changeType, setChangeType]     = useState('');
  const [period, setPeriod]             = useState('');
  const [uploaded, setUploaded]         = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const canUpload = !!selectedFile && !!changeType;

  const handleUpload = () => {
    if (canUpload) setUploaded(true);
  };

  return (
    <div id="esers-employment-change-file-page" data-testid="esers-employment-change-file-page" className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-light text-foreground">Employment Change Request File</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Upload a batch file to submit multiple employment change requests</p>
        </div>
        <Button id="ecf-download-template-btn" variant="outline" size="sm" aria-label="Download file template">
          <Download size={14} className="mr-1.5" aria-hidden="true" /> Download Template
        </Button>
      </div>

      {/* Upload panel */}
      <div className="bg-white rounded border border-border p-5 mb-6">
        <h2 className="text-sm font-semibold mb-4">Upload Change File</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="ecf-change-type" className="text-xs font-medium text-muted-foreground block mb-1">Change Type</label>
            <select
              id="ecf-change-type"
              value={changeType}
              onChange={(e) => setChangeType(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-portal-blue"
              aria-label="Employment change type"
            >
              <option value="">Select type…</option>
              <option value="termination">Termination</option>
              <option value="leave">Leave of Absence</option>
              <option value="return">Return from Leave</option>
              <option value="rehire">Rehire</option>
              <option value="salary-change">Salary Change</option>
              <option value="position-change">Position Change</option>
            </select>
          </div>
          <div>
            <label htmlFor="ecf-period" className="text-xs font-medium text-muted-foreground block mb-1">Payroll Period</label>
            <select
              id="ecf-period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-portal-blue"
              aria-label="Payroll period"
            >
              <option value="">Select period…</option>
              {['Oct 2024','Sep 2024','Aug 2024','Jul 2024','Jun 2024'].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ecf-file-input" className="text-xs font-medium text-muted-foreground block mb-1">File</label>
            <div className="flex items-center gap-2">
              <label
                htmlFor="ecf-file-input"
                className="cursor-pointer border border-border rounded px-3 py-2 text-sm hover:bg-muted flex-shrink-0"
                aria-label="Browse for employment change file"
              >
                Browse
                <input
                  id="ecf-file-input"
                  ref={fileRef}
                  type="file"
                  accept=".csv,.xlsx,.txt"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <span className="text-xs text-muted-foreground truncate">
                {selectedFile ? selectedFile.name : 'No file selected'}
              </span>
            </div>
          </div>
        </div>

        {uploaded ? (
          <div id="ecf-upload-success" className="flex items-center gap-2 text-portal-green text-sm font-medium">
            <CheckCircle2 size={16} aria-hidden="true" /> File uploaded successfully — pending processing.
          </div>
        ) : (
          <Button
            id="ecf-upload-btn"
            onClick={handleUpload}
            disabled={!canUpload}
            size="sm"
            aria-label="Upload employment change file"
          >
            <Upload size={14} className="mr-1.5" aria-hidden="true" /> Upload File
          </Button>
        )}
      </div>

      {/* Format requirements */}
      <div className="bg-[hsl(207,90%,97%)] border border-[hsl(207,90%,80%)] rounded p-4 mb-6 text-sm">
        <div className="flex items-start gap-2">
          <AlertTriangle size={15} className="text-portal-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold text-foreground mb-1">File Format Requirements</p>
            <ul className="text-muted-foreground space-y-0.5 text-xs list-disc pl-4">
              <li>Accepted formats: CSV, XLSX, TXT (pipe-delimited)</li>
              <li>Required columns: Employee ID, SSN, Change Type, Effective Date, New Value</li>
              <li>Date format: MM/DD/YYYY</li>
              <li>Maximum 500 records per file</li>
            </ul>
          </div>
        </div>
      </div>

      {/* File history */}
      <div className="bg-white rounded border border-border overflow-hidden">
        <div className="px-4 py-3 border-b">
          <h2 className="text-sm font-semibold">Upload History</h2>
        </div>
        <table id="ecf-history-table" role="table" aria-label="Employment change file upload history" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              {['File ID', 'File Name', 'Upload Date', 'Period', 'Records', 'Processed', 'Errors', 'Status', 'Actions'].map((h) => (
                <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fileHistory.map((row) => (
              <tr key={row.id} id={`ecf-row-${row.id}`} data-testid={`ecf-row-${row.id}`} className={`border-b hover:bg-muted/20 transition-colors ${row.errors > 0 ? 'bg-red-50' : ''}`}>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.id}</td>
                <td className="px-4 py-3 font-mono text-xs">{row.fileName}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.uploadDate}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.period}</td>
                <td className="px-4 py-3">{row.records}</td>
                <td className="px-4 py-3 text-portal-green font-medium">{row.processed}</td>
                <td className="px-4 py-3">
                  {row.errors > 0
                    ? <span className="text-destructive font-medium flex items-center gap-1"><AlertTriangle size={12} aria-hidden="true" />{row.errors}</span>
                    : <span className="text-muted-foreground">—</span>}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Button id={`ecf-view-btn-${row.id}`} variant="outline" size="sm" className="h-7 text-xs" aria-label={`View details for ${row.fileName}`}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmploymentChangeFile;
