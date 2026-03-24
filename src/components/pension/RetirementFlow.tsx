import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import { members } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface RetirementFlowProps {
  memberId: string;
  navigate: NavigateFn;
}

interface RetirementFormData {
  retirementDate: string;
  retirementType: string;
  healthcareOption: 'state-plan' | 'waive' | 'cobra';
  healthcarePlan: string;
  addDependents: boolean;
  dependentName: string;
  dependentDob: string;
}

const STEPS = [
  { num: 1, label: 'Retirement Details' },
  { num: 2, label: 'Healthcare' },
  { num: 3, label: 'Review & Submit' },
];

const HEALTHCARE_PLANS = [
  'CalPERS Basic HMO',
  'CalPERS PERS Choice PPO',
  'CalPERS PERS Care PPO',
  'CalPERS PORAC',
  'Blue Shield Access+',
  'Kaiser Permanente',
];

const RetirementFlow = ({ memberId, navigate }: RetirementFlowProps) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const member = members.find((m) => m.id === memberId);

  const [form, setForm] = useState<RetirementFormData>({
    retirementDate: '',
    retirementType: 'Service Retirement',
    healthcareOption: 'state-plan',
    healthcarePlan: 'CalPERS Basic HMO',
    addDependents: false,
    dependentName: '',
    dependentDob: '',
  });

  const update = <K extends keyof RetirementFormData>(field: K, value: RetirementFormData[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const refNum = `RET-2024-${Math.floor(10000 + Math.random() * 90000)}`;

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
      <button
        onClick={() => navigate('member-profile', member.id)}
        className="flex items-center gap-1.5 text-sm text-portal-blue hover:underline mb-5"
      >
        <ArrowLeft size={14} /> Back to {member.name}
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold mb-1">Retirement Application</h1>
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
                    (submitted && s.num === 3) || (!submitted && step > s.num)
                      ? 'bg-portal-green text-white'
                      : step === s.num
                      ? 'bg-portal-blue text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {(submitted && s.num === 3) || (!submitted && step > s.num) ? <Check size={14} /> : s.num}
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

        {/* Step content */}
        <div className="bg-white rounded border border-border">
          <div className="px-6 py-4 border-b bg-muted/30">
            <h2 className="font-semibold text-sm">
              Step {step}: {STEPS[step - 1].label}
            </h2>
          </div>
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-muted/40 rounded p-3 text-sm">
                  <span className="font-medium">Eligibility: </span>
                  <span className="text-muted-foreground">
                    {member.yearsOfService} years of service &middot; {member.planType}
                    {member.yearsOfService >= 5
                      ? ' — Eligible for service retirement'
                      : ' — Minimum 5 years required'}
                  </span>
                </div>
                <div>
                  <Label>Effective Retirement Date</Label>
                  <Input
                    type="date"
                    value={form.retirementDate}
                    onChange={(e) => update('retirementDate', e.target.value)}
                    className="mt-1.5"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Date must be the first day of a month.
                  </p>
                </div>
                <div>
                  <Label>Retirement Type</Label>
                  <select
                    value={form.retirementType}
                    onChange={(e) => update('retirementType', e.target.value)}
                    className="mt-1.5 w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-portal-blue bg-white"
                  >
                    <option>Service Retirement</option>
                    <option>Disability Retirement</option>
                    <option>Early Retirement</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Years of Service</div>
                    <div className="text-xl font-bold text-portal-blue">{member.yearsOfService}</div>
                  </div>
                  <div className="bg-muted/30 rounded p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Est. Monthly Benefit</div>
                    <div className="text-xl font-bold text-portal-green">
                      ${(member.yearsOfService * 180).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  Select your healthcare coverage preference upon retirement.
                </p>
                <div className="space-y-2">
                  {([
                    { value: 'state-plan', label: 'Enroll in State Health Plan', desc: 'Coverage through CalPERS Health Program' },
                    { value: 'waive', label: 'Waive Coverage', desc: 'Opt out of state health plan — you may have other coverage' },
                    { value: 'cobra', label: 'COBRA Continuation', desc: 'Continue current coverage for up to 18 months' },
                  ] as const).map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-muted/20 ${
                        form.healthcareOption === opt.value ? 'border-portal-blue bg-blue-50' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="healthcare"
                        value={opt.value}
                        checked={form.healthcareOption === opt.value}
                        onChange={() => update('healthcareOption', opt.value)}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-medium">{opt.label}</div>
                        <div className="text-xs text-muted-foreground">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                {form.healthcareOption === 'state-plan' && (
                  <div className="pt-1">
                    <Label>Select Health Plan</Label>
                    <select
                      value={form.healthcarePlan}
                      onChange={(e) => update('healthcarePlan', e.target.value)}
                      className="mt-1.5 w-full border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-portal-blue bg-white"
                    >
                      {HEALTHCARE_PLANS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.addDependents}
                      onChange={(e) => update('addDependents', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Add Dependents</span>
                  </label>
                  {form.addDependents && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <Label>Dependent Full Name</Label>
                        <Input
                          value={form.dependentName}
                          onChange={(e) => update('dependentName', e.target.value)}
                          className="mt-1.5"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          value={form.dependentDob}
                          onChange={(e) => update('dependentDob', e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && !submitted && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">Review your retirement application before submitting.</p>
                <ReviewSection title="Retirement Details">
                  <ReviewRow label="Member" value={member.name} />
                  <ReviewRow label="Member ID" value={member.id} />
                  <ReviewRow label="Effective Date" value={form.retirementDate || 'Not set'} />
                  <ReviewRow label="Retirement Type" value={form.retirementType} />
                  <ReviewRow label="Years of Service" value={`${member.yearsOfService} years`} />
                  <ReviewRow label="Est. Monthly Benefit" value={`$${(member.yearsOfService * 180).toLocaleString()}`} />
                </ReviewSection>
                <ReviewSection title="Healthcare Selection">
                  <ReviewRow
                    label="Coverage Option"
                    value={
                      form.healthcareOption === 'state-plan'
                        ? 'State Health Plan'
                        : form.healthcareOption === 'cobra'
                        ? 'COBRA Continuation'
                        : 'Waived'
                    }
                  />
                  {form.healthcareOption === 'state-plan' && (
                    <ReviewRow label="Selected Plan" value={form.healthcarePlan} />
                  )}
                  {form.addDependents && form.dependentName && (
                    <ReviewRow label="Dependent" value={`${form.dependentName} (${form.dependentDob})`} />
                  )}
                </ReviewSection>
              </div>
            )}

            {step === 3 && submitted && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-portal-green flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Retirement Application Submitted</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your application is under review. A pension specialist will contact you within 5 business days.
                </p>
                <div className="bg-muted/50 rounded p-3 inline-block mb-6">
                  <span className="text-xs text-muted-foreground">Reference Number: </span>
                  <span className="font-mono font-bold">{refNum}</span>
                </div>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => navigate('member-profile', member.id)}>
                    Back to Member Profile
                  </Button>
                  <Button onClick={() => navigate('dashboard')}>
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {!(step === 3 && submitted) && (
            <div className="px-6 py-4 border-t bg-muted/20 flex justify-between">
              <Button
                variant="outline"
                onClick={() => (step === 1 ? navigate('member-profile', member.id) : setStep(step - 1))}
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>Next</Button>
              ) : (
                <Button onClick={() => setSubmitted(true)}>Submit Retirement Application</Button>
              )}
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

export default RetirementFlow;
