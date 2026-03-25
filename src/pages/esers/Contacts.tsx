import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Contact {
  id: string;
  name: string;
  role: 'Primary Contact' | 'Secondary Contact' | 'Billing Contact';
  phone: string;
  email: string;
  active: boolean;
}

const initialContacts: Contact[] = [
  { id: 'C001', name: 'White, Betty',     role: 'Primary Contact',   phone: '(614) 555-0100', email: 'betty.white@org084.gov',    active: true  },
  { id: 'C002', name: 'Sanders, Colonel', role: 'Primary Contact',   phone: '(614) 555-0101', email: 'c.sanders@org084.gov',      active: true  },
  { id: 'C003', name: 'Jones, Sarah',     role: 'Secondary Contact', phone: '(614) 555-0102', email: 's.jones@org084.gov',        active: true  },
  { id: 'C004', name: 'Brown, Michael',   role: 'Billing Contact',   phone: '(614) 555-0103', email: 'm.brown@org084.gov',        active: true  },
  { id: 'C005', name: 'Davis, Angela',    role: 'Secondary Contact', phone: '(614) 555-0104', email: 'a.davis@org084.gov',        active: false },
];

const roleVariant = (role: Contact['role']): 'default' | 'secondary' | 'outline' => {
  if (role === 'Primary Contact')   return 'default';
  if (role === 'Billing Contact')   return 'secondary';
  return 'outline';
};

const Contacts = () => {
  const [contacts, setContacts]   = useState<Contact[]>(initialContacts);
  const [search, setSearch]       = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const startEdit = (c: Contact) => {
    setEditingId(c.id);
    setEditPhone(c.phone);
    setEditEmail(c.email);
  };

  const saveEdit = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, phone: editPhone, email: editEmail } : c)),
    );
    setEditingId(null);
  };

  const toggleActive = (id: string) =>
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  return (
    <div id="esers-contacts-page" data-testid="esers-contacts-page" className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-light text-foreground">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Organization 084000 — contact directory</p>
        </div>
        <Button id="esers-contacts-add-btn" aria-label="Add new contact" size="sm">
          <Plus size={14} className="mr-1.5" aria-hidden="true" /> Add Contact
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          id="esers-contacts-search"
          aria-label="Search contacts"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm text-sm"
        />
      </div>

      <div className="bg-white rounded border border-border overflow-hidden">
        <table id="contacts-table" role="table" aria-label="Contacts" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              {['ID', 'Name', 'Role', 'Phone', 'Email', 'Status', 'Actions'].map((h) => (
                <th key={h} scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} id={`contact-row-${c.id}`} data-testid={`contact-row-${c.id}`} className="border-b hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.id}</td>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">
                  <Badge variant={roleVariant(c.role)}>{c.role}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {editingId === c.id
                    ? <Input id={`contact-phone-input-${c.id}`} value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="h-7 text-xs w-36" aria-label="Edit phone" />
                    : c.phone}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {editingId === c.id
                    ? <Input id={`contact-email-input-${c.id}`} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="h-7 text-xs w-44" aria-label="Edit email" />
                    : c.email}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={c.active ? 'secondary' : 'outline'}>{c.active ? 'Active' : 'Inactive'}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {editingId === c.id ? (
                      <>
                        <Button id={`contact-save-btn-${c.id}`} size="sm" className="h-7 text-xs" onClick={() => saveEdit(c.id)} aria-label={`Save changes for ${c.name}`}>Save</Button>
                        <Button id={`contact-cancel-btn-${c.id}`} size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingId(null)} aria-label="Cancel edit">Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button id={`contact-edit-btn-${c.id}`} size="sm" variant="ghost" className="h-7 text-xs" onClick={() => startEdit(c)} aria-label={`Edit ${c.name}`}>
                          <Pencil size={12} aria-hidden="true" />
                        </Button>
                        <Button id={`contact-toggle-btn-${c.id}`} size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground" onClick={() => toggleActive(c.id)} aria-label={c.active ? `Deactivate ${c.name}` : `Activate ${c.name}`}>
                          {c.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button id={`contact-delete-btn-${c.id}`} size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive" aria-label={`Delete ${c.name}`}>
                          <Trash2 size={12} aria-hidden="true" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center py-10 text-muted-foreground">No contacts match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
