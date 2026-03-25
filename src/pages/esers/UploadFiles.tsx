import { useState, useRef } from 'react';
import { CloudUpload, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type UploadState = 'form' | 'results' | 'errors';

interface ErrorRow {
  row: number;
  memberId: string;
  memberName: string;
  errorType: string;
  currentValue: string;
  correctedValue: string;
  resolved: boolean;
}

const initialErrors: ErrorRow[] = [
  { row: 14, memberId: 'M002', memberName: 'Stern, Jane', errorType: 'Invalid SSN Format', currentValue: '123-4X-5678', correctedValue: '', resolved: false },
  { row: 22, memberId: 'M005', memberName: 'Adamson, Margret', errorType: 'Missing Contribution Amount', currentValue: '—', correctedValue: '', resolved: false },
  { row: 37, memberId: 'M008', memberName: 'Adams, Mary', errorType: 'Duplicate Record', currentValue: '—', correctedValue: '', resolved: false },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const UploadFiles = () => {
  const [state, setState] = useState<UploadState>('form');
  const [fileType, setFileType] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState<ErrorRow[]>(initialErrors);
  const [errorFilter, setErrorFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canUpload = fileType && selectedFile;

  const handleUpload = () => {
    setState('results');
  };

  const handleViewErrors = () => {
    setState('errors');
  };

  const handleCorrect = (idx: number, value: string) => {
    const next = [...errors];
    next[idx] = { ...next[idx], correctedValue: value };
    setErrors(next);
  };

  const handleSave = (idx: number) => {
    const next = [...errors];
    next[idx] = { ...next[idx], resolved: true };
    setErrors(next);
  };

  const handleSubmitCorrections = () => {
    setState('form');
    setSelectedFile(null);
    setFileType('');
    setPeriod('');
    setDescription('');
    setSuccessMsg('Corrections submitted successfully. File has been reprocessed.');
    setErrors(initialErrors.map((e) => ({ ...e, resolved: false, correctedValue: '' })));
  };

  const periodOptions: string[] = [];
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    periodOptions.push(`${months[d.getMonth()]} ${d.getFullYear()}`);
  }

  const filteredErrors = errorFilter
    ? errors.filter((e) => e.errorType.toLowerCase().includes(errorFilter.toLowerCase()))
    : errors;

  // ── STATE: FORM ─────────────────────────────────────────────────────────────
  if (state === 'form') {
    return (
      <div id="esers-upload-form-page" className="p-6">
        <h1 className="text-2xl font-light text-foreground mb-1">Upload Files</h1>
        <p className="text-sm text-muted-foreground mb-5">Submit payroll contribution and employment files for processing.</p>

        {successMsg && (
          <div className="bg-green-50 border border-portal-green rounded p-3 flex items-center gap-2 mb-4 text-sm text-green-800">
            <CheckCircle2 size={16} aria-hidden="true" />
            {successMsg}
          </div>
        )}

        <div className="bg-white border rounded shadow-sm p-6 max-w-2xl">
          {/* File Type */}
          <div className="mb-4">
            <Label htmlFor="upload-file-type" className="text-xs font-semibold">
              File Type <span className="text-portal-red">*</span>
            </Label>
            <select
              id="upload-file-type"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm bg-white"
              aria-label="File type — required"
              aria-required="true"
            >
              <option value="">Select file type...</option>
              <option value="contribution">Contribution File</option>
              <option value="employment-change">Employment Change File</option>
              <option value="enrollment">Enrollment File</option>
              <option value="supplemental">Supplemental Contribution File</option>
            </select>
          </div>

          {/* Submission Period */}
          <div className="mb-4">
            <Label htmlFor="upload-period" className="text-xs font-semibold">Submission Period</Label>
            <select
              id="upload-period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm bg-white"
              aria-label="Submission period"
            >
              <option value="">Select period...</option>
              {periodOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <Label htmlFor="upload-description" className="text-xs font-semibold">Description (optional)</Label>
            <Input
              id="upload-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description for this upload"
              className="mt-1 text-sm"
              aria-label="Upload description"
            />
          </div>

          {/* File Drop Zone */}
          <div className="mb-5">
            <Label className="text-xs font-semibold block mb-1">Select File</Label>
            <div
              id="upload-drop-zone"
              role="button"
              tabIndex={0}
              aria-label="Click to browse or drag and drop a file. Accepts .csv, .xlsx, .txt"
              className="border-2 border-dashed border-[hsl(0,0%,75%)] rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-portal-blue hover:bg-blue-50/30 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) setSelectedFile(file);
              }}
            >
              <CloudUpload size={36} className="text-[hsl(0,0%,60%)] mb-2" aria-hidden="true" />
              <p className="text-sm text-foreground font-medium">Click to browse or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">Accepts .csv, .xlsx, .txt</p>
              {selectedFile && (
                <div className="mt-3 flex items-center gap-2 text-xs text-portal-green font-medium">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  {selectedFile.name}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.txt"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                aria-label="File input"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              id="esers-upload-submit-btn"
              onClick={handleUpload}
              disabled={!canUpload}
              className="bg-portal-blue hover:bg-portal-blue/90 text-white disabled:opacity-50"
              aria-label="Upload file"
              aria-disabled={!canUpload}
            >
              Upload
            </Button>
            <Button
              variant="outline"
              onClick={() => { setSelectedFile(null); setFileType(''); setPeriod(''); setDescription(''); }}
              aria-label="Clear form"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── STATE: RESULTS ───────────────────────────────────────────────────────────
  if (state === 'results') {
    return (
      <div id="esers-upload-results-page" className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setState('form')}
            className="text-xs text-portal-blue hover:underline flex items-center gap-1"
            aria-label="Back to upload form"
          >
            <ArrowLeft size={13} aria-hidden="true" /> Back to Upload
          </button>
          <h1 className="text-2xl font-light text-foreground">Upload Results</h1>
        </div>

        <div className="bg-white border rounded shadow-sm">
          <div className="px-5 py-3 border-b">
            <h2 className="text-sm font-semibold text-foreground">Upload Results</h2>
          </div>
          <table
            id="upload-results-table"
            role="table"
            aria-label="Upload results"
            className="w-full text-sm"
          >
            <thead>
              <tr className="bg-[hsl(0,0%,97%)] border-b">
                {['File Name', 'Period', 'Records Submitted', 'Records Processed', 'Errors', 'Status', 'Actions'].map((h) => (
                  <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-[hsl(0,0%,98%)]">
                <td className="px-4 py-3 font-medium">{selectedFile?.name ?? 'SEB_OCT2024.csv'}</td>
                <td className="px-4 py-3 text-muted-foreground">{period || 'Oct 2024'}</td>
                <td className="px-4 py-3">156</td>
                <td className="px-4 py-3">153</td>
                <td className="px-4 py-3 text-portal-red font-semibold">3</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    Error
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Button
                    id="upload-view-errors-btn"
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={handleViewErrors}
                    aria-label="View upload errors"
                  >
                    View Errors
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ── STATE: ERRORS ────────────────────────────────────────────────────────────
  return (
    <div id="esers-upload-errors-page" className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setState('results')}
          className="text-xs text-portal-blue hover:underline flex items-center gap-1"
          aria-label="Back to results"
        >
          <ArrowLeft size={13} aria-hidden="true" /> Back to Upload
        </button>
        <h1 className="text-xl font-semibold text-foreground">Contribution Errors — Manual Resolution</h1>
      </div>

      {/* Error type filter */}
      <div className="flex items-center gap-3 mb-4">
        <Label htmlFor="error-filter" className="text-xs font-semibold whitespace-nowrap">Filter by Error Type:</Label>
        <select
          id="error-filter"
          value={errorFilter}
          onChange={(e) => setErrorFilter(e.target.value)}
          className="border rounded px-3 py-1.5 text-xs bg-white min-w-[220px]"
          aria-label="Filter errors by type"
        >
          <option value="">All errors</option>
          <option>Invalid SSN Format</option>
          <option>Missing Contribution Amount</option>
          <option>Duplicate Record</option>
        </select>
      </div>

      <div className="bg-white border rounded shadow-sm mb-4">
        <table
          id="errors-resolution-table"
          role="table"
          aria-label="Contribution errors for manual resolution"
          className="w-full text-sm"
        >
          <thead>
            <tr className="bg-[hsl(0,0%,97%)] border-b">
              {['Row #', 'Member ID', 'Member Name', 'Error Type', 'Current Value', 'Corrected Value', 'Action'].map((h) => (
                <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredErrors.map((row, i) => {
              const realIdx = errors.findIndex((e) => e.row === row.row);
              return (
                <tr
                  key={row.row}
                  id={`error-row-${row.row}`}
                  className={`border-b ${row.resolved ? 'bg-green-50' : 'hover:bg-[hsl(0,0%,98%)]'}`}
                >
                  <td className="px-4 py-3 font-medium">{row.row}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.memberId}</td>
                  <td className="px-4 py-3">{row.memberName}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs text-red-700">
                      <AlertCircle size={12} aria-hidden="true" />
                      {row.errorType}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.currentValue}</td>
                  <td className="px-4 py-3">
                    {row.resolved ? (
                      <span className="flex items-center gap-1 text-portal-green text-xs font-semibold">
                        <CheckCircle2 size={13} aria-hidden="true" /> Resolved
                      </span>
                    ) : (
                      <Input
                        id={`error-correction-${row.row}`}
                        value={row.correctedValue}
                        onChange={(e) => handleCorrect(realIdx, e.target.value)}
                        placeholder="Enter correction"
                        className="h-7 text-xs w-40"
                        aria-label={`Corrected value for row ${row.row}`}
                      />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!row.resolved && (
                      <div className="flex items-center gap-1">
                        <Button
                          id={`error-save-${row.row}`}
                          size="sm"
                          className="h-7 text-xs bg-portal-green hover:bg-portal-green/90 text-white"
                          onClick={() => handleSave(realIdx)}
                          aria-label={`Save correction for row ${row.row}`}
                        >
                          Save
                        </Button>
                        <Button
                          id={`error-skip-${row.row}`}
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleSave(realIdx)}
                          aria-label={`Skip row ${row.row}`}
                        >
                          Skip
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3">
        <Button
          id="esers-submit-corrections-btn"
          onClick={handleSubmitCorrections}
          className="bg-portal-blue hover:bg-portal-blue/90 text-white"
          aria-label="Submit corrections and reprocess file"
        >
          Submit Corrections
        </Button>
        <button
          onClick={() => setState('form')}
          className="text-xs text-portal-blue hover:underline"
          aria-label="Back to upload form"
        >
          ← Back to Upload
        </button>
      </div>
    </div>
  );
};

export default UploadFiles;
