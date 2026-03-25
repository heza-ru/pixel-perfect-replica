import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProcessedFile {
  id: string;
  fileName: string;
  fileType: string;
  submittedBy: string;
  submitDate: string;
  period: string;
  records: number;
  errors: number;
  status: 'Success' | 'Error' | 'Processing' | 'Pending Review';
}

const files: ProcessedFile[] = [
  { id: 'F-001', fileName: 'CFD_OCT2024.csv', fileType: 'Contribution', submittedBy: 'Betty White', submitDate: '2024-10-01', period: 'Oct 2024', records: 248, errors: 0, status: 'Success' },
  { id: 'F-002', fileName: 'SEB_SEP2024.csv', fileType: 'Contribution', submittedBy: 'Betty White', submitDate: '2024-09-28', period: 'Sep 2024', records: 156, errors: 3, status: 'Error' },
  { id: 'F-003', fileName: 'MHS_SEP2024.csv', fileType: 'Contribution', submittedBy: 'Betty White', submitDate: '2024-09-15', period: 'Sep 2024', records: 89, errors: 0, status: 'Processing' },
  { id: 'F-004', fileName: 'CPA_OCT2024.csv', fileType: 'Contribution', submittedBy: 'Betty White', submitDate: '2024-10-02', period: 'Oct 2024', records: 112, errors: 0, status: 'Success' },
  { id: 'F-005', fileName: 'EMP_CHANGE_SEP2024.csv', fileType: 'Employment Change', submittedBy: 'Betty White', submitDate: '2024-09-20', period: 'Sep 2024', records: 12, errors: 2, status: 'Error' },
  { id: 'F-006', fileName: 'ENROLL_OCT2024.csv', fileType: 'Enrollment', submittedBy: 'Betty White', submitDate: '2024-10-05', period: 'Oct 2024', records: 4, errors: 0, status: 'Pending Review' },
  { id: 'F-007', fileName: 'CFD_SEP2024.csv', fileType: 'Contribution', submittedBy: 'Betty White', submitDate: '2024-09-01', period: 'Sep 2024', records: 245, errors: 0, status: 'Success' },
  { id: 'F-008', fileName: 'SUPP_AUG2024.csv', fileType: 'Supplemental', submittedBy: 'Betty White', submitDate: '2024-08-31', period: 'Aug 2024', records: 18, errors: 0, status: 'Success' },
];

const statusBadge = (status: ProcessedFile['status']) => {
  const map: Record<ProcessedFile['status'], string> = {
    Success: 'bg-green-100 text-green-800',
    Error: 'bg-red-100 text-red-800',
    Processing: 'bg-blue-100 text-blue-800',
    'Pending Review': 'bg-yellow-100 text-yellow-800',
  };
  return map[status];
};

const ProcessedFiles = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <div id="esers-processed-files-page" className="p-6">
      <h1 className="text-2xl font-light text-foreground mb-1">Processed Files</h1>
      <p className="text-sm text-muted-foreground mb-5">History of all submitted files and their processing results.</p>

      <div className="bg-white border rounded shadow-sm">
        <div className="px-5 py-3 border-b">
          <h2 className="text-sm font-semibold text-foreground">All Uploaded Files</h2>
        </div>
        <table
          id="processed-files-table"
          role="table"
          aria-label="Processed files"
          className="w-full text-sm"
        >
          <thead>
            <tr className="bg-[hsl(0,0%,97%)] border-b">
              {['', 'File ID', 'File Name', 'File Type', 'Submitted By', 'Submit Date', 'Period', 'Records', 'Errors', 'Status', 'Actions'].map((h, i) => (
                <th key={i} scope="col" className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <>
                <tr
                  key={file.id}
                  id={`processed-file-row-${file.id}`}
                  className="border-b hover:bg-[hsl(0,0%,98%)]"
                >
                  <td className="px-3 py-3">
                    <button
                      onClick={() => toggle(file.id)}
                      aria-label={expandedId === file.id ? `Collapse details for ${file.fileName}` : `Expand details for ${file.fileName}`}
                      aria-expanded={expandedId === file.id}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {expandedId === file.id ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
                    </button>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs text-portal-blue">{file.id}</td>
                  <td className="px-3 py-3 font-medium">{file.fileName}</td>
                  <td className="px-3 py-3 text-muted-foreground">{file.fileType}</td>
                  <td className="px-3 py-3 text-muted-foreground">{file.submittedBy}</td>
                  <td className="px-3 py-3 text-muted-foreground">{file.submitDate}</td>
                  <td className="px-3 py-3 text-muted-foreground">{file.period}</td>
                  <td className="px-3 py-3">{file.records}</td>
                  <td className={`px-3 py-3 font-semibold ${file.errors > 0 ? 'text-portal-red' : 'text-portal-green'}`}>
                    {file.errors}
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusBadge(file.status)}`}>
                      {file.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <Button
                      id={`processed-file-view-${file.id}`}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => toggle(file.id)}
                      aria-label={`View details for ${file.fileName}`}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>

                {/* Expanded details row */}
                {expandedId === file.id && (
                  <tr key={`${file.id}-details`} id={`processed-file-details-${file.id}`}>
                    <td colSpan={11} className="px-6 py-4 bg-blue-50 border-b">
                      <div className="grid grid-cols-4 gap-4 text-xs">
                        <div>
                          <div className="text-muted-foreground mb-0.5">File ID</div>
                          <div className="font-semibold">{file.id}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-0.5">File Name</div>
                          <div className="font-semibold">{file.fileName}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-0.5">Records Submitted</div>
                          <div className="font-semibold">{file.records}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-0.5">Records with Errors</div>
                          <div className={`font-semibold ${file.errors > 0 ? 'text-portal-red' : 'text-portal-green'}`}>{file.errors}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-0.5">Submitted By</div>
                          <div className="font-semibold">{file.submittedBy}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-0.5">Submit Date</div>
                          <div className="font-semibold">{file.submitDate}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-0.5">Period</div>
                          <div className="font-semibold">{file.period}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-0.5">Final Status</div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusBadge(file.status)}`}>
                            {file.status}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessedFiles;
