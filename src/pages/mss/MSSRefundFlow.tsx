import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STEPS = [
  'Identity Validation',
  'Contribution Details',
  'Payout Option',
  'Bank & Address',
  'Disclaimer',
  'Sign & Submit',
];

// ── Stepper ─────────────────────────────────────────────────────────────────
const Stepper = ({ current }: { current: number }) => (
  <div id="mss-refund-stepper" className="flex items-center gap-0 mb-6 overflow-x-auto">
    {STEPS.map((label, idx) => {
      const step = idx + 1;
      const done = step < current;
      const active = step === current;
      return (
        <div key={step} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center">
            <div
              aria-label={`Step ${step}: ${label}${done ? ' (completed)' : active ? ' (current)' : ''}`}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                done
                  ? 'bg-portal-green border-portal-green text-white'
                  : active
                  ? 'bg-portal-blue border-portal-blue text-white'
                  : 'bg-white border-[hsl(0,0%,75%)] text-muted-foreground'
              }`}
            >
              {done ? <CheckCircle2 size={14} aria-hidden="true" /> : step}
            </div>
            <span
              className={`text-[10px] mt-1 text-center max-w-[70px] leading-tight ${
                active ? 'text-portal-blue font-semibold' : 'text-muted-foreground'
              }`}
            >
              {label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className={`w-8 h-0.5 mb-4 mx-1 flex-shrink-0 ${done ? 'bg-portal-green' : 'bg-[hsl(0,0%,82%)]'}`}
              aria-hidden="true"
            />
          )}
        </div>
      );
    })}
  </div>
);

// ── Step 1 ───────────────────────────────────────────────────────────────────
const Step1 = ({ onNext }: { onNext: () => void }) => {
  const [infoCorrect, setInfoCorrect] = useState<'yes' | 'no' | null>(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  return (
    <div id="mss-refund-step1">
      <h2 className="text-lg font-semibold text-foreground mb-4">Validate Your Identity</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <InfoCard label="Full Name" value="Patricia Marie Alvarez" />
        <InfoCard label="SSN" value="***-**-4521" />
        <InfoCard label="Date of Birth" value="06/22/1975" />
      </div>
      <div className="bg-[hsl(0,0%,97%)] border rounded p-3 mb-4">
        <div className="text-xs text-muted-foreground font-semibold mb-1">Mailing Address</div>
        <div className="text-sm text-foreground">1428 Elmwood Drive, Sacramento, CA 95814</div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-foreground mb-2">Is this information correct?</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="infoCorrect"
              value="yes"
              checked={infoCorrect === 'yes'}
              onChange={() => setInfoCorrect('yes')}
              aria-label="Yes, information is correct"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="infoCorrect"
              value="no"
              checked={infoCorrect === 'no'}
              onChange={() => setInfoCorrect('no')}
              aria-label="No, information is incorrect"
            />
            No
          </label>
        </div>
      </div>

      {infoCorrect === 'no' && (
        <div id="mss-refund-address-update" className="bg-[hsl(0,0%,97%)] border rounded p-4 mb-4">
          <p className="text-sm font-semibold mb-3">Update Mailing Address</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label htmlFor="refund-street" className="text-xs">Street Address</Label>
              <Input id="refund-street" value={street} onChange={(e) => setStreet(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="refund-city" className="text-xs">City</Label>
              <Input id="refund-city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="refund-state" className="text-xs">State</Label>
              <Input id="refund-state" value={state} onChange={(e) => setState(e.target.value)} placeholder="CA" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="refund-zip" className="text-xs">ZIP Code</Label>
              <Input id="refund-zip" value={zip} onChange={(e) => setZip(e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
      )}

      <Button
        id="mss-refund-step1-next"
        onClick={onNext}
        disabled={infoCorrect === null}
        className="bg-portal-blue hover:bg-portal-blue/90 text-white"
        aria-label="Proceed to Contribution Details"
      >
        Next <ChevronRight size={16} aria-hidden="true" />
      </Button>
    </div>
  );
};

// ── Step 2 ───────────────────────────────────────────────────────────────────
const Step2 = ({ onNext }: { onNext: () => void }) => (
  <div id="mss-refund-step2">
    <h2 className="text-lg font-semibold text-foreground mb-4">Review Contribution Details</h2>
    <div className="bg-[hsl(0,100%,98%)] border border-orange-200 rounded p-3 mb-4 text-xs text-orange-800">
      <AlertTriangle size={14} className="inline mr-1" aria-hidden="true" />
      By accepting a refund, you permanently forfeit all service credit and future retirement benefits.
    </div>
    <table className="w-full text-sm border rounded overflow-hidden mb-4">
      <tbody>
        {[
          ['Employee Total Contributions', '$38,906.39'],
          ['Taxable Amount', '$38,758.11'],
          ['Non-Taxable Amount (Member)', '$148.28'],
          ['Interest Earned', '$0.00'],
          ['Eligible Refund Amount', '$38,906.39'],
        ].map(([label, value]) => (
          <tr key={label} className="border-b even:bg-[hsl(0,0%,97%)]">
            <td className="px-4 py-2.5 text-muted-foreground">{label}</td>
            <td className="px-4 py-2.5 font-semibold text-right">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Button
      id="mss-refund-step2-next"
      onClick={onNext}
      className="bg-portal-blue hover:bg-portal-blue/90 text-white"
      aria-label="Proceed to Payout Method"
    >
      Next <ChevronRight size={16} aria-hidden="true" />
    </Button>
  </div>
);

// ── Step 3 ───────────────────────────────────────────────────────────────────
const Step3 = ({ onNext, payout, setPayout }: { onNext: () => void; payout: string; setPayout: (v: string) => void }) => {
  const [institution, setInstitution] = useState('');
  const [accountType, setAccountType] = useState('');
  const [iraNumber, setIraNumber] = useState('');

  return (
    <div id="mss-refund-step3">
      <h2 className="text-lg font-semibold text-foreground mb-4">Select Payout Method</h2>
      <div className="flex flex-col gap-3 mb-4">
        {[
          {
            value: 'direct',
            label: 'Direct Bank Transfer',
            desc: 'Funds deposited directly to your checking/savings account. May be subject to 20% federal withholding.',
          },
          {
            value: 'ira',
            label: 'IRA Rollover',
            desc: 'Transfer directly to a qualifying IRA or employer plan. No tax withholding applied.',
          },
        ].map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 p-4 border-2 rounded cursor-pointer transition-colors ${
              payout === opt.value ? 'border-portal-blue bg-blue-50' : 'border-border bg-white hover:border-portal-blue/40'
            }`}
          >
            <input
              type="radio"
              name="payout"
              value={opt.value}
              checked={payout === opt.value}
              onChange={() => setPayout(opt.value)}
              className="mt-0.5"
              aria-label={opt.label}
            />
            <div>
              <div className="text-sm font-semibold text-foreground">{opt.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
            </div>
          </label>
        ))}
      </div>

      {payout === 'ira' && (
        <div id="mss-refund-ira-fields" className="bg-[hsl(0,0%,97%)] border rounded p-4 mb-4">
          <p className="text-sm font-semibold mb-3">IRA Account Details</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label htmlFor="ira-institution" className="text-xs">Institution Name</Label>
              <Input id="ira-institution" value={institution} onChange={(e) => setInstitution(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="ira-account-type" className="text-xs">Account Type</Label>
              <select
                id="ira-account-type"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2 text-sm bg-white"
                aria-label="IRA account type"
              >
                <option value="">Select...</option>
                <option>Traditional IRA</option>
                <option>Roth IRA</option>
                <option>SEP IRA</option>
                <option>403(b)</option>
                <option>457(b)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="ira-number" className="text-xs">IRA Account Number</Label>
              <Input id="ira-number" value={iraNumber} onChange={(e) => setIraNumber(e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>
      )}

      <Button
        id="mss-refund-step3-next"
        onClick={onNext}
        disabled={!payout}
        className="bg-portal-blue hover:bg-portal-blue/90 text-white"
        aria-label="Proceed to Bank Account and Address"
      >
        Next <ChevronRight size={16} aria-hidden="true" />
      </Button>
    </div>
  );
};

// ── Step 4 ───────────────────────────────────────────────────────────────────
const Step4 = ({ onNext }: { onNext: () => void }) => {
  const [bankChoice, setBankChoice] = useState<'existing' | 'new'>('existing');
  const [updateAddress, setUpdateAddress] = useState(false);
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [confirmAccount, setConfirmAccount] = useState('');
  const [acctType, setAcctType] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  return (
    <div id="mss-refund-step4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Bank Account &amp; Address Details</h2>

      {/* Banking */}
      <div className="bg-white border rounded p-4 mb-4">
        <p className="text-sm font-semibold mb-3">Banking Information</p>
        <div className="flex flex-col gap-2 mb-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="bankChoice"
              value="existing"
              checked={bankChoice === 'existing'}
              onChange={() => setBankChoice('existing')}
              aria-label="Use existing bank account"
            />
            <span>Use existing — <strong>Wells Fargo Bank</strong> ****6823</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="bankChoice"
              value="new"
              checked={bankChoice === 'new'}
              onChange={() => setBankChoice('new')}
              aria-label="Add new bank account"
            />
            Add new bank account
          </label>
        </div>

        {bankChoice === 'new' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="bank-routing" className="text-xs">Routing Number</Label>
              <Input id="bank-routing" value={routing} onChange={(e) => setRouting(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="bank-account" className="text-xs">Account Number</Label>
              <Input id="bank-account" value={account} onChange={(e) => setAccount(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="bank-confirm-account" className="text-xs">Confirm Account Number</Label>
              <Input id="bank-confirm-account" value={confirmAccount} onChange={(e) => setConfirmAccount(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="bank-acct-type" className="text-xs">Account Type</Label>
              <select
                id="bank-acct-type"
                value={acctType}
                onChange={(e) => setAcctType(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2 text-sm bg-white"
                aria-label="Bank account type"
              >
                <option value="">Select...</option>
                <option>Checking</option>
                <option>Savings</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="bg-white border rounded p-4 mb-4">
        <p className="text-sm font-semibold mb-2">Mailing Address</p>
        <p className="text-sm text-muted-foreground mb-3">Current: 1428 Elmwood Drive, Sacramento, CA 95814</p>
        <label className="flex items-center gap-2 text-sm cursor-pointer mb-3">
          <input
            type="checkbox"
            checked={updateAddress}
            onChange={(e) => setUpdateAddress(e.target.checked)}
            aria-label="Update mailing address"
          />
          Update mailing address
        </label>
        {updateAddress && (
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Label htmlFor="addr-street" className="text-xs">Street Address</Label>
              <Input id="addr-street" value={street} onChange={(e) => setStreet(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="addr-city" className="text-xs">City</Label>
              <Input id="addr-city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="addr-state" className="text-xs">State</Label>
              <Input id="addr-state" value={state} onChange={(e) => setState(e.target.value)} className="mt-1" placeholder="CA" />
            </div>
            <div>
              <Label htmlFor="addr-zip" className="text-xs">ZIP Code</Label>
              <Input id="addr-zip" value={zip} onChange={(e) => setZip(e.target.value)} className="mt-1" />
            </div>
          </div>
        )}
      </div>

      <Button
        id="mss-refund-step4-next"
        onClick={onNext}
        className="bg-portal-blue hover:bg-portal-blue/90 text-white"
        aria-label="Proceed to Disclaimer"
      >
        Next <ChevronRight size={16} aria-hidden="true" />
      </Button>
    </div>
  );
};

// ── Step 5 ───────────────────────────────────────────────────────────────────
const DISCLAIMERS = [
  'I understand that by accepting this refund, I permanently forfeit all credited service time under SERS.',
  'I understand I will lose eligibility for future retirement, disability, and survivor benefits.',
  'I understand that rehired members cannot repurchase refunded service after July 29, 1992.',
  'I certify that the information provided is accurate and complete to the best of my knowledge.',
];

const Step5 = ({ onNext }: { onNext: () => void }) => {
  const [checked, setChecked] = useState<boolean[]>(DISCLAIMERS.map(() => false));
  const allChecked = checked.every(Boolean);

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  return (
    <div id="mss-refund-step5">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Important Disclaimer — Loss of Future Benefits
      </h2>
      <div className="border-2 border-orange-400 rounded p-4 bg-orange-50 mb-5">
        <div className="flex items-start gap-2 mb-3">
          <AlertTriangle size={18} className="text-orange-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-orange-900 font-semibold">
            WARNING: Accepting a refund is an irreversible action. Please read and acknowledge each statement below.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {DISCLAIMERS.map((text, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                aria-label={text}
                className="mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-orange-900">{text}</span>
            </label>
          ))}
        </div>
      </div>
      <Button
        id="mss-refund-step5-next"
        onClick={onNext}
        disabled={!allChecked}
        className="bg-portal-blue hover:bg-portal-blue/90 text-white disabled:opacity-50"
        aria-label="Proceed to Electronic Signature"
        aria-disabled={!allChecked}
      >
        Next <ChevronRight size={16} aria-hidden="true" />
      </Button>
    </div>
  );
};

// ── Step 6 ───────────────────────────────────────────────────────────────────
const Step6 = ({ payout }: { payout: string }) => {
  const [signature, setSignature] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const refNum = `REF-2024-${Math.floor(10000 + Math.random() * 90000)}`;

  const canSubmit = signature.trim().length > 0 && agreed;

  if (submitted) {
    return (
      <div id="mss-refund-confirmation" className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 size={56} className="text-portal-green mb-4" aria-hidden="true" />
        <h2 className="text-xl font-bold text-foreground mb-2">Application Submitted Successfully</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your refund application has been received and is being processed.
        </p>
        <div className="bg-[hsl(145,60%,96%)] border border-portal-green rounded p-4 mb-4 text-left min-w-[300px]">
          <div className="text-xs text-muted-foreground mb-1">Reference Number</div>
          <div className="text-lg font-bold text-portal-green">{refNum}</div>
          <div className="text-xs text-muted-foreground mt-3">Estimated Processing Time</div>
          <div className="text-sm font-semibold">5–10 business days</div>
        </div>
        <p className="text-xs text-muted-foreground max-w-sm">
          A confirmation email has been sent to your registered email address. Please retain your reference number for your records.
        </p>
      </div>
    );
  }

  return (
    <div id="mss-refund-step6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Electronic Signature &amp; Submission</h2>

      {/* Summary */}
      <div className="bg-[hsl(0,0%,97%)] border rounded p-4 mb-4">
        <p className="text-sm font-semibold mb-2">Application Summary</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <span className="text-muted-foreground">Refund Amount</span>
          <span className="font-semibold">$38,906.39</span>
          <span className="text-muted-foreground">Payout Method</span>
          <span className="font-semibold">{payout === 'ira' ? 'IRA Rollover' : 'Direct Bank Transfer'}</span>
          <span className="text-muted-foreground">Bank Account</span>
          <span className="font-semibold">Wells Fargo ****6823</span>
          <span className="text-muted-foreground">Mailing Address</span>
          <span className="font-semibold">1428 Elmwood Drive, Sacramento CA 95814</span>
        </div>
      </div>

      {/* Signature */}
      <div className="bg-white border rounded p-4 mb-4">
        <p className="text-sm text-muted-foreground mb-3">
          By typing your full legal name below, you are providing your electronic signature for this refund application.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <Label htmlFor="sig-name" className="text-xs font-semibold">Full Legal Name <span className="text-portal-red">*</span></Label>
            <Input
              id="sig-name"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Type your full legal name"
              className="mt-1"
              aria-label="Electronic signature — full legal name"
            />
          </div>
          <div>
            <Label htmlFor="sig-date" className="text-xs font-semibold">Date</Label>
            <Input id="sig-date" value={today} readOnly className="mt-1 bg-[hsl(0,0%,97%)]" aria-label="Signature date" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            aria-label="I agree to the terms and conditions"
          />
          I agree to the terms and conditions of this refund application.
        </label>
      </div>

      <Button
        id="mss-refund-submit-btn"
        onClick={() => setSubmitted(true)}
        disabled={!canSubmit}
        className="bg-portal-green hover:bg-portal-green/90 text-white disabled:opacity-50"
        aria-label="Submit Refund Application"
        aria-disabled={!canSubmit}
      >
        Submit Refund Application
      </Button>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
const MSSRefundFlow = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [payout, setPayout] = useState('direct');

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = Math.min(Math.max(stepParam, 1), 6);

  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: '1' });
    }
  }, []);

  const goToStep = (s: number) => setSearchParams({ step: String(s) });
  const goNext = () => goToStep(Math.min(currentStep + 1, 6));

  return (
    <div id="mss-refund-flow-page" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light text-foreground">Refund Application</h1>
        <button
          onClick={() => navigate('/mss/dashboard')}
          className="text-xs text-portal-blue hover:underline"
          aria-label="Cancel refund application and return to dashboard"
        >
          ← Back to Dashboard
        </button>
      </div>

      <Stepper current={currentStep} />

      <div className="bg-white rounded shadow-sm border p-6">
        {currentStep === 1 && <Step1 onNext={goNext} />}
        {currentStep === 2 && <Step2 onNext={goNext} />}
        {currentStep === 3 && <Step3 onNext={goNext} payout={payout} setPayout={setPayout} />}
        {currentStep === 4 && <Step4 onNext={goNext} />}
        {currentStep === 5 && <Step5 onNext={goNext} />}
        {currentStep === 6 && <Step6 payout={payout} />}
      </div>

      {/* Step navigation helper */}
      {currentStep < 6 && (
        <div className="flex items-center gap-2 mt-4">
          {currentStep > 1 && (
            <button
              onClick={() => goToStep(currentStep - 1)}
              className="text-xs text-muted-foreground hover:text-foreground hover:underline"
              aria-label="Go back to previous step"
            >
              ← Previous Step
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[hsl(0,0%,97%)] border rounded p-3">
    <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
    <div className="text-sm font-semibold text-foreground">{value}</div>
  </div>
);

export default MSSRefundFlow;
