import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import { members } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface RefundFlowProps {
  memberId: string;
  navigate: NavigateFn;
}

interface RefundFormData {
  contributionYear: string;
  refundAmount: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  bankOption: 'existing' | 'new';
  routingNumber: string;
  accountNumber: string;
  confirmAccount: string;
}

const STEPS = [
  { num: 1, label: 'Contribution Amount' },
  { num: 2, label: 'Address Details' },
  { num: 3, label: 'Bank Account' },
  { num: 4, label: 'Review' },
  { num: 5, label: 'Confirmation' },
];

const RefundFlow = ({ memberId, navigate }: RefundFlowProps) => {
  const [step, setStep] = useState(1);
  const member = members.find((m) => m.id === memberId);

  const latestContrib = member?.contributions[member.contributions.length - 1];

  const [form, setForm] = useState<RefundFormData>({
    contributionYear: latestContrib ? String(latestContrib.year) : '2024',
    refundAmount: latestContrib ? String(latestContrib.employee) : '',
    street: member?.address ?? '',
    city: member?.city ?? '',
    state: member?.state ?? '',
    zip: member?.zip ?? '',
    bankOption: 'existing',
    routingNumber: '',
    accountNumber: '',
    confirmAccount: '',
  });

  const update = (field: keyof RefundFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const refNum = `REF-2024-${Math.floor(10000 + Math.random() * 90000)}`;

  if (!member) {
    return (
      <div className="p-6">
        <div className="bg-white rounded border border-border p-8 text-center">
          <p className="text-muted-foreground mb-4">Member not found.</p>
          <Button variant="outline" onClick={() => navigate('members')}>
            <ArrowLeft size={14} className="mr-1.5" /> Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back */}
      <button
        onClick={() => navigate('member-profile', member.id)}
        className="flex items-center gap-1.5 text-sm text-portal-blue hover:underline mb-5"
      >
        <ArrowLeft size={14} /> Back to {member.name}
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold mb-1">Refund Application</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Member: <span className="font-medium text-foreground">{member.name}</span> &middot; {member.id}
        </p>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step > s.num
                      ? 'bg-portal-green text-white'
                      : step === s.num
                      ? 'bg-portal-blue text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s.num ? <Check size={14} /> : s.num}
                </div>
                <span
                  className={`text-[10px] mt-1 text-center w-20 ${
                    step === s.num ? 'text-portal-blue font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 ${step > s.num ? 'bg-portal-green' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded border border-border">
          <div className="px-6 py-4 border-b bg-muted/30">
            <h2 className="font-semibold text-sm">
              Step {step}: {STEPS[step - 1].label}
            </h2>
          </div>
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <Label>Contribution Year</Label>
                  <select
                    value={form.contributionYear}
                    onChange={(e) => update('contributionYear', e.target.value)}
                    className="mt-1.5 w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-portal-blue bg-white"
                  >
                    {member.contributions.map((c) => (
                      <option key={c.year} value={String(c.year)}>{c.year}</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select the year from which you would like to receive a refund.
                  </p>
                </div>
                <div>
                  <Label>Refund Amount ($)</Label>
                  <Input
                    type="number"
                    value={form.refundAmount}
                    onChange={(e) => update('refundAmount', e.target.value)}
                    className="mt-1.5"
                    placeholder="0.00"
                  />
                  {latestContrib && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Available employee contributions for {form.contributionYear}:{' '}
                      <span className="font-medium">
                        ${member.contributions.find((c) => String(c.year) === form.contributionYear)?.employee.toLocaleString() ?? 0}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Confirm the mailing address where you would like the refund check sent.
                </p>
                <div>
                  <Label>Street Address</Label>
                  <Input value={form.street} onChange={(e) => update('street', e.target.value)} className="mt-1.5" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>City</Label>
                    <Input value={form.city} onChange={(e) => update('city', e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>State</Label>
                    <select
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                      className="mt-1.5 w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-portal-blue bg-white"
                    >
                      {['CA', 'NY', 'TX', 'FL', 'WA', 'OR', 'AZ', 'NV'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>ZIP Code</Label>
                    <Input value={form.zip} onChange={(e) => update('zip', e.target.value)} className="mt-1.5" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <Label className="text-sm font-medium">Payment Method</Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-muted/20">
                      <input
                        type="radio"
                        name="bankOption"
                        value="existing"
                        checked={form.bankOption === 'existing'}
                        onChange={() => update('bankOption', 'existing')}
                      />
                      <div>
                        <div className="text-sm font-medium">Use existing bank account</div>
                        <div className="text-xs text-muted-foreground">
                          {member.bank.name} — Account {member.bank.accountMasked}
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-muted/20">
                      <input
                        type="radio"
                        name="bankOption"
                        value="new"
                        checked={form.bankOption === 'new'}
                        onChange={() => update('bankOption', 'new')}
                      />
                      <div className="text-sm font-medium">Enter new bank account details</div>
                    </label>
                  </div>
                </div>
                {form.bankOption === 'new' && (
                  <div className="space-y-4 pt-2 border-t">
                    <div>
                      <Label>Routing Number</Label>
                      <Input
                        value={form.routingNumber}
                        onChange={(e) => update('routingNumber', e.target.value)}
                        className="mt-1.5"
                        placeholder="9-digit routing number"
                        maxLength={9}
                      />
                    </div>
                    <div>
                      <Label>Account Number</Label>
                      <Input
                        type="password"
                        value={form.accountNumber}
                        onChange={(e) => update('accountNumber', e.target.value)}
                        className="mt-1.5"
                        placeholder="Account number"
                      />
                    </div>
                    <div>
                      <Label>Confirm Account Number</Label>
                      <Input
                        type="password"
                        value={form.confirmAccount}
                        onChange={(e) => update('confirmAccount', e.target.value)}
                        className="mt-1.5"
                        placeholder="Re-enter account number"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">Please review your refund application before submitting.</p>
                <ReviewSection title="Refund Details">
                  <ReviewRow label="Contribution Year" value={form.contributionYear} />
                  <ReviewRow label="Refund Amount" value={`$${Number(form.refundAmount).toLocaleString()}`} />
                </ReviewSection>
                <ReviewSection title="Mailing Address">
                  <ReviewRow label="Street" value={form.street} />
                  <ReviewRow label="City / State / ZIP" value={`${form.city}, ${form.state} ${form.zip}`} />
                </ReviewSection>
                <ReviewSection title="Payment Method">
                  {form.bankOption === 'existing' ? (
                    <>
                      <ReviewRow label="Bank" value={member.bank.name} />
                      <ReviewRow label="Account" value={member.bank.accountMasked} />
                      <ReviewRow label="Routing" value={member.bank.routing} />
                    </>
                  ) : (
                    <>
                      <ReviewRow label="Bank" value="New account (entered)" />
                      <ReviewRow label="Routing" value={form.routingNumber} />
                      <ReviewRow label="Account" value="****" />
                    </>
                  )}
                </ReviewSection>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-portal-green flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Refund Application Submitted</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your application has been received and is being processed.
                </p>
                <div className="bg-muted/50 rounded p-3 inline-block mb-6">
                  <span className="text-xs text-muted-foreground">Reference Number: </span>
                  <span className="font-mono font-bold text-foreground">{refNum}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-6">
                  Processing time: 5–10 business days. You will be notified by email at {member.email}.
                </div>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => navigate('member-profile', member.id)}>
                    Back to Member Profile
                  </Button>
                  <Button onClick={() => navigate('members')}>
                    Return to Member Portal
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {step < 5 && (
            <div className="px-6 py-4 border-t bg-muted/20 flex justify-between">
              <Button
                variant="outline"
                onClick={() => (step === 1 ? navigate('member-profile', member.id) : setStep(step - 1))}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              <Button onClick={() => setStep(step + 1)}>
                {step === 4 ? 'Submit Refund' : 'Next'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{title}</h3>
    <div className="bg-muted/30 rounded border border-border p-3 space-y-2">{children}</div>
  </div>
);

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default RefundFlow;
