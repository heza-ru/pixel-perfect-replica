import { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface BankAccount {
  id: string;
  bankName: string;
  accountType: 'Checking' | 'Savings';
  routingNumber: string;
  accountMasked: string;
  purpose: 'Payroll Remittance' | 'Refund Receipt' | 'General';
  status: 'Active' | 'Inactive';
}

const accounts: BankAccount[] = [
  { id: 'BA001', bankName: 'Fifth Third Bank',   accountType: 'Checking', routingNumber: '042000314', accountMasked: '****8821', purpose: 'Payroll Remittance', status: 'Active'   },
  { id: 'BA002', bankName: 'Huntington Bank',     accountType: 'Checking', routingNumber: '044000024', accountMasked: '****3345', purpose: 'Refund Receipt',     status: 'Active'   },
  { id: 'BA003', bankName: 'KeyBank',             accountType: 'Savings',  routingNumber: '041001039', accountMasked: '****7762', purpose: 'General',           status: 'Inactive' },
];

const Bank = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [newBank, setNewBank]   = useState({ bankName: '', accountType: 'Checking', routingNumber: '', accountNumber: '', confirmAccount: '', purpose: 'Payroll Remittance' });

  return (
    <div id="esers-bank-page" data-testid="esers-bank-page" className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-light text-foreground">Bank Accounts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Organization 084000 — banking on file</p>
        </div>
        <Button id="esers-bank-add-btn" aria-label="Add new bank account" size="sm" onClick={() => setShowAdd(!showAdd)}>
          <Plus size={14} className="mr-1.5" aria-hidden="true" /> Add Bank Account
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div id="esers-bank-add-form" className="bg-white rounded border border-border p-5 mb-5">
          <h2 className="text-sm font-semibold mb-4">New Bank Account</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-bank-name" className="text-xs">Bank Name</Label>
              <Input id="new-bank-name" value={newBank.bankName} onChange={(e) => setNewBank({ ...newBank, bankName: e.target.value })} className="mt-1.5 text-sm" aria-label="Bank name" />
            </div>
            <div>
              <Label htmlFor="new-acct-type" className="text-xs">Account Type</Label>
              <select id="new-acct-type" value={newBank.accountType} onChange={(e) => setNewBank({ ...newBank, accountType: e.target.value })}
                className="mt-1.5 w-full border border-border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-portal-blue" aria-label="Account type">
                <option>Checking</option>
                <option>Savings</option>
              </select>
            </div>
            <div>
              <Label htmlFor="new-routing" className="text-xs">Routing Number</Label>
              <Input id="new-routing" value={newBank.routingNumber} onChange={(e) => setNewBank({ ...newBank, routingNumber: e.target.value })} maxLength={9} placeholder="9-digit routing number" className="mt-1.5 text-sm" aria-label="Routing number" />
            </div>
            <div>
              <Label htmlFor="new-purpose" className="text-xs">Purpose</Label>
              <select id="new-purpose" value={newBank.purpose} onChange={(e) => setNewBank({ ...newBank, purpose: e.target.value })}
                className="mt-1.5 w-full border border-border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:border-portal-blue" aria-label="Account purpose">
                <option>Payroll Remittance</option>
                <option>Refund Receipt</option>
                <option>General</option>
              </select>
            </div>
            <div>
              <Label htmlFor="new-account" className="text-xs">Account Number</Label>
              <Input id="new-account" type="password" value={newBank.accountNumber} onChange={(e) => setNewBank({ ...newBank, accountNumber: e.target.value })} className="mt-1.5 text-sm" aria-label="Account number" />
            </div>
            <div>
              <Label htmlFor="new-confirm-account" className="text-xs">Confirm Account Number</Label>
              <Input id="new-confirm-account" type="password" value={newBank.confirmAccount} onChange={(e) => setNewBank({ ...newBank, confirmAccount: e.target.value })} className="mt-1.5 text-sm" aria-label="Confirm account number" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button id="esers-bank-save-new-btn" size="sm" aria-label="Save new bank account">Save Account</Button>
            <Button id="esers-bank-cancel-new-btn" size="sm" variant="outline" onClick={() => setShowAdd(false)} aria-label="Cancel adding bank account">Cancel</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded border border-border overflow-hidden">
        <table id="bank-accounts-table" role="table" aria-label="Bank accounts" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              {['ID', 'Bank Name', 'Type', 'Routing Number', 'Account', 'Purpose', 'Status', 'Actions'].map((h) => (
                <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accounts.map((acct) => (
              <tr key={acct.id} id={`bank-row-${acct.id}`} data-testid={`bank-row-${acct.id}`} className="border-b hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{acct.id}</td>
                <td className="px-4 py-3 font-medium">{acct.bankName}</td>
                <td className="px-4 py-3 text-muted-foreground">{acct.accountType}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{acct.routingNumber}</td>
                <td className="px-4 py-3 font-mono text-sm">{acct.accountMasked}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{acct.purpose}</td>
                <td className="px-4 py-3">
                  <Badge variant={acct.status === 'Active' ? 'secondary' : 'outline'}>{acct.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Button id={`bank-edit-btn-${acct.id}`} size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditing(editing === acct.id ? null : acct.id)} aria-label={`Edit bank account ${acct.id}`}>
                    <Pencil size={12} className="mr-1" aria-hidden="true" /> Edit
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

export default Bank;
