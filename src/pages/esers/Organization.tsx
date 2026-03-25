import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Tab = 'general' | 'bank' | 'contacts';

const contacts = [
  { name: 'White, Betty', role: 'Primary Contact', phone: '(916) 555-0100', email: 'betty.white@org084.gov' },
  { name: 'Sanders, Colonel', role: 'Primary Contact', phone: '(916) 555-0101', email: 'c.sanders@org084.gov' },
  { name: 'Jones, Sarah', role: 'Secondary Contact', phone: '(916) 555-0102', email: 's.jones@org084.gov' },
];

const Organization = () => {
  const [tab, setTab] = useState<Tab>('general');
  const [editing, setEditing] = useState(false);

  const tabClass = (t: Tab) =>
    `px-4 py-2 text-sm font-medium border-b-2 cursor-pointer transition-colors ${
      tab === t
        ? 'border-portal-blue text-portal-blue'
        : 'border-transparent text-muted-foreground hover:text-foreground'
    }`;

  return (
    <div id="esers-organization-page" className="p-6">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-light text-foreground">Organization Information</h1>
        <Button
          id="esers-org-edit-btn"
          variant="outline"
          className="text-xs"
          onClick={() => setEditing(!editing)}
          aria-label={editing ? 'Cancel editing' : 'Edit organization information'}
        >
          {editing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-5">View and manage your organization's profile and contact information.</p>

      {/* Org summary card */}
      <div className="bg-white border rounded shadow-sm p-5 mb-5">
        <div className="grid grid-cols-3 gap-4">
          {[
            ['Organization ID', '084000'],
            ['Organization Name', 'City Finance Department'],
            ['Organization Type', 'Municipal Government'],
            ['Status', 'Active'],
            ['FEIN', '94-6001234'],
            ['Phone', '(916) 555-0100'],
            ['Address', '1 Government Center, Sacramento, CA 95814'],
            ['Plan Participation', 'SERS Miscellaneous'],
            ['Enrollment Date', '1972-07-01'],
          ].map(([label, value]) => (
            <div key={label} className="bg-[hsl(0,0%,97%)] border rounded p-3">
              <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
              {editing ? (
                <input defaultValue={value} className="w-full text-sm border-b border-portal-blue bg-transparent focus:outline-none" aria-label={label} />
              ) : (
                <div className="text-sm font-semibold text-foreground">{value}</div>
              )}
            </div>
          ))}
        </div>
        {editing && (
          <div className="mt-4 flex gap-2">
            <Button className="bg-portal-green hover:bg-portal-green/90 text-white text-xs" aria-label="Save changes">Save Changes</Button>
            <Button variant="outline" className="text-xs" onClick={() => setEditing(false)} aria-label="Cancel">Cancel</Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white border rounded shadow-sm">
        <div className="flex border-b px-5">
          <button className={tabClass('general')} onClick={() => setTab('general')} aria-label="General Info tab">General Info</button>
          <button className={tabClass('bank')} onClick={() => setTab('bank')} aria-label="Bank tab">Bank</button>
          <button className={tabClass('contacts')} onClick={() => setTab('contacts')} aria-label="Contacts tab">Contacts</button>
        </div>

        <div className="p-5">
          {tab === 'general' && (
            <div id="esers-org-general-tab">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['Fiscal Year Start', 'July 1'],
                  ['Fiscal Year End', 'June 30'],
                  ['Reporting Frequency', 'Bi-Weekly'],
                  ['Active Employee Count', '248'],
                  ['Last Payroll Submission', '2024-10-01'],
                  ['Payroll System', 'ADP Workforce Now'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'bank' && (
            <div id="esers-org-bank-tab">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Bank Name', 'Wells Fargo Bank'],
                  ['Account Type', 'Checking'],
                  ['Account Number', '****8872'],
                  ['Routing Number', '121042882'],
                  ['Account Holder', 'City Finance Department'],
                  ['Status', 'Active'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[hsl(0,0%,97%)] border rounded p-3">
                    <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                    <div className="text-sm font-semibold text-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'contacts' && (
            <div id="esers-org-contacts-tab">
              <table role="table" aria-label="Organization contacts" className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(0,0%,97%)] border-b">
                    {['Name', 'Role', 'Phone', 'Email'].map((h) => (
                      <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.name} className="border-b hover:bg-[hsl(0,0%,98%)]">
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${c.role === 'Primary Contact' ? 'bg-portal-red/10 text-portal-red' : 'bg-[hsl(0,0%,90%)] text-muted-foreground'}`}>
                          {c.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Organization;
