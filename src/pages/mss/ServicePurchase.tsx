import { useState } from 'react';
import { Button } from '@/components/ui/button';

const contracts = [
  {
    id: 'SPC-2024-089',
    type: 'Military Service',
    period: '2001-09 to 2003-04',
    months: 19,
    cost: '$14,280.00',
    status: 'In Review',
    submitted: '2024-08-15',
  },
];

const ServicePurchase = () => {
  const [showNew, setShowNew] = useState(false);

  return (
    <div id="mss-service-purchase-page" className="p-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-light text-foreground">Service Purchase Contracts</h1>
        <Button
          id="mss-service-purchase-new-btn"
          onClick={() => setShowNew(!showNew)}
          className="bg-portal-blue hover:bg-portal-blue/90 text-white text-xs"
          aria-label="New Service Purchase Request"
        >
          + New Service Purchase Request
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Purchase additional service credit for eligible periods not already credited under SERS.
      </p>

      {/* New request form */}
      {showNew && (
        <div id="mss-service-purchase-new-form" className="bg-blue-50 border border-portal-blue rounded p-5 mb-6">
          <h2 className="text-sm font-semibold mb-3">New Service Purchase Request</h2>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[
              { id: 'spc-type', label: 'Service Type', type: 'select', options: ['Military Service', 'Leave of Absence', 'Out-of-State Service', 'Prior Public Service'] },
              { id: 'spc-start', label: 'Service Start Date', type: 'date' },
              { id: 'spc-end', label: 'Service End Date', type: 'date' },
              { id: 'spc-employer', label: 'Employer / Agency Name', type: 'text' },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="text-xs font-semibold block mb-1">{field.label}</label>
                {field.type === 'select' ? (
                  <select id={field.id} className="w-full border rounded px-3 py-2 text-sm bg-white" aria-label={field.label}>
                    <option value="">Select...</option>
                    {field.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input id={field.id} type={field.type} className="w-full border rounded px-3 py-2 text-sm bg-white" aria-label={field.label} />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button className="bg-portal-green hover:bg-portal-green/90 text-white text-xs" aria-label="Submit service purchase request">
              Submit Request
            </Button>
            <Button variant="outline" className="text-xs" onClick={() => setShowNew(false)} aria-label="Cancel">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Contracts table */}
      <div className="bg-white border rounded shadow-sm">
        <div className="px-5 py-3 border-b">
          <h2 className="text-sm font-semibold text-foreground">My Service Purchase Contracts</h2>
        </div>
        {contracts.length === 0 ? (
          <div className="px-5 py-8 text-center text-muted-foreground text-sm">
            No service purchase contracts on file.
          </div>
        ) : (
          <table
            id="service-purchase-table"
            role="table"
            aria-label="Service purchase contracts"
            className="w-full text-sm"
          >
            <thead>
              <tr className="bg-[hsl(0,0%,97%)] border-b">
                {['Contract ID', 'Type', 'Service Period', 'Months', 'Estimated Cost', 'Status', 'Submitted'].map((h) => (
                  <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contracts.map((row) => (
                <tr key={row.id} className="border-b hover:bg-[hsl(0,0%,98%)]">
                  <td className="px-4 py-3 font-medium text-portal-blue">{row.id}</td>
                  <td className="px-4 py-3">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.period}</td>
                  <td className="px-4 py-3">{row.months}</td>
                  <td className="px-4 py-3 font-semibold">{row.cost}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.submitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ServicePurchase;
