import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STEPS = ['Eligibility Review', 'Benefit Options', 'Sign & Submit'];

const Stepper = ({ current }: { current: number }) => (
  <div id="mss-retirement-stepper" className="flex items-center gap-0 mb-6">
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
              className={`text-[10px] mt-1 text-center max-w-[80px] leading-tight ${
                active ? 'text-portal-blue font-semibold' : 'text-muted-foreground'
              }`}
            >
              {label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className={`w-12 h-0.5 mb-4 mx-1 flex-shrink-0 ${done ? 'bg-portal-green' : 'bg-[hsl(0,0%,82%)]'}`}
              aria-hidden="true"
            />
          )}
        </div>
      );
    })}
  </div>
);

// ── Step 1 ───────────────────────────────────────────────────────────────────
const Step1 = ({ onNext }: { onNext: () => void }) => (
  <div id="mss-retirement-step1">
    <h2 className="text-lg font-semibold text-foreground mb-4">Eligibility Review</h2>
    <div className="grid grid-cols-2 gap-4 mb-4">
      {[
        ['Member Name', 'Patricia Marie Alvarez'],
        ['Member ID', '19254'],
        ['Plan Type', 'Defined Benefit'],
        ['Years of Service', '16.0 years'],
        ['Current Age', '50'],
        ['Vesting Status', 'Vested'],
        ['Earliest Retirement Date', '06/22/2025'],
        ['Normal Retirement Age', '60'],
      ].map(([label, value]) => (
        <div key={label} className="bg-[hsl(0,0%,97%)] border rounded p-3">
          <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
          <div className="text-sm font-semibold text-foreground">{value}</div>
        </div>
      ))}
    </div>
    <div className="bg-blue-50 border border-portal-blue rounded p-3 mb-4 text-xs text-portal-blue">
      You are eligible for early retirement. Normal retirement age is 60. Applying before that date may result in a reduced benefit.
    </div>
    <div className="mb-4">
      <Label htmlFor="retirement-date" className="text-xs font-semibold">Desired Retirement Date</Label>
      <Input id="retirement-date" type="date" className="mt-1 max-w-xs" aria-label="Desired retirement date" />
    </div>
    <Button
      id="mss-retirement-step1-next"
      onClick={onNext}
      className="bg-portal-blue hover:bg-portal-blue/90 text-white"
      aria-label="Proceed to Benefit Options"
    >
      Next <ChevronRight size={16} aria-hidden="true" />
    </Button>
  </div>
);

// ── Step 2 ───────────────────────────────────────────────────────────────────
const Step2 = ({ onNext, option, setOption }: { onNext: () => void; option: string; setOption: (v: string) => void }) => (
  <div id="mss-retirement-step2">
    <h2 className="text-lg font-semibold text-foreground mb-4">Benefit Options</h2>
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-3">
        Your estimated monthly benefit is <strong>$2,187.00</strong> based on your 16 years of service and final average salary of $78,400.
      </p>
      <div className="flex flex-col gap-3">
        {[
          { value: 'single', label: 'Single Life Annuity', desc: 'Maximum monthly benefit of $2,187.00. Payments stop at your death.' },
          { value: 'joint50', label: 'Joint & 50% Survivor', desc: 'Reduced benefit of $1,965.30/mo. Your survivor receives 50% ($982.65) after your death.' },
          { value: 'joint100', label: 'Joint & 100% Survivor', desc: 'Reduced benefit of $1,748.60/mo. Your survivor receives 100% ($1,748.60) after your death.' },
          { value: 'lumpsum', label: 'Lump Sum Partial Rollover', desc: 'Receive a one-time lump sum of taxable contributions plus reduced monthly annuity.' },
        ].map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 p-4 border-2 rounded cursor-pointer transition-colors ${
              option === opt.value ? 'border-portal-blue bg-blue-50' : 'border-border bg-white hover:border-portal-blue/40'
            }`}
          >
            <input
              type="radio"
              name="retirementOption"
              value={opt.value}
              checked={option === opt.value}
              onChange={() => setOption(opt.value)}
              className="mt-0.5"
              aria-label={opt.label}
            />
            <div>
              <div className="text-sm font-semibold">{opt.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
    <Button
      id="mss-retirement-step2-next"
      onClick={onNext}
      disabled={!option}
      className="bg-portal-blue hover:bg-portal-blue/90 text-white"
      aria-label="Proceed to Sign and Submit"
    >
      Next <ChevronRight size={16} aria-hidden="true" />
    </Button>
  </div>
);

// ── Step 3 ───────────────────────────────────────────────────────────────────
const Step3 = ({ option }: { option: string }) => {
  const [signature, setSignature] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const refNum = `RET-2024-${Math.floor(10000 + Math.random() * 90000)}`;

  if (submitted) {
    return (
      <div id="mss-retirement-confirmation" className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 size={56} className="text-portal-green mb-4" aria-hidden="true" />
        <h2 className="text-xl font-bold text-foreground mb-2">Retirement Application Submitted</h2>
        <p className="text-sm text-muted-foreground mb-4">Your application is under review by the SERS team.</p>
        <div className="bg-[hsl(145,60%,96%)] border border-portal-green rounded p-4 mb-4 text-left min-w-[300px]">
          <div className="text-xs text-muted-foreground mb-1">Reference Number</div>
          <div className="text-lg font-bold text-portal-green">{refNum}</div>
          <div className="text-xs text-muted-foreground mt-3">Estimated Processing Time</div>
          <div className="text-sm font-semibold">15–30 business days</div>
        </div>
      </div>
    );
  }

  const optionLabels: Record<string, string> = {
    single: 'Single Life Annuity — $2,187.00/mo',
    joint50: 'Joint & 50% Survivor — $1,965.30/mo',
    joint100: 'Joint & 100% Survivor — $1,748.60/mo',
    lumpsum: 'Lump Sum Partial Rollover',
  };

  return (
    <div id="mss-retirement-step3">
      <h2 className="text-lg font-semibold text-foreground mb-4">Electronic Signature &amp; Submission</h2>
      <div className="bg-[hsl(0,0%,97%)] border rounded p-4 mb-4">
        <p className="text-sm font-semibold mb-2">Application Summary</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <span className="text-muted-foreground">Member</span>
          <span className="font-semibold">Patricia Marie Alvarez</span>
          <span className="text-muted-foreground">Benefit Option</span>
          <span className="font-semibold">{optionLabels[option] ?? option}</span>
          <span className="text-muted-foreground">Plan Type</span>
          <span className="font-semibold">Defined Benefit</span>
        </div>
      </div>
      <div className="bg-white border rounded p-4 mb-4">
        <p className="text-sm text-muted-foreground mb-3">
          By typing your full legal name below, you are providing your electronic signature.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <Label htmlFor="ret-sig-name" className="text-xs font-semibold">Full Legal Name <span className="text-portal-red">*</span></Label>
            <Input
              id="ret-sig-name"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Type your full legal name"
              className="mt-1"
              aria-label="Electronic signature"
            />
          </div>
          <div>
            <Label htmlFor="ret-sig-date" className="text-xs font-semibold">Date</Label>
            <Input id="ret-sig-date" value={today} readOnly className="mt-1 bg-[hsl(0,0%,97%)]" aria-label="Signature date" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            aria-label="I agree to the terms and conditions"
          />
          I agree to the terms and conditions of this retirement application.
        </label>
      </div>
      <Button
        id="mss-retirement-submit-btn"
        onClick={() => setSubmitted(true)}
        disabled={!signature.trim() || !agreed}
        className="bg-portal-green hover:bg-portal-green/90 text-white disabled:opacity-50"
        aria-label="Submit Retirement Application"
      >
        Submit Retirement Application
      </Button>
    </div>
  );
};

// ── Main ─────────────────────────────────────────────────────────────────────
const MSSRetirementFlow = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [option, setOption] = useState('');

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = Math.min(Math.max(stepParam, 1), 3);

  useEffect(() => {
    if (!searchParams.get('step')) {
      setSearchParams({ step: '1' });
    }
  }, []);

  const goToStep = (s: number) => setSearchParams({ step: String(s) });
  const goNext = () => goToStep(Math.min(currentStep + 1, 3));

  return (
    <div id="mss-retirement-flow-page" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-light text-foreground">Retirement Application</h1>
        <button
          onClick={() => navigate('/mss/dashboard')}
          className="text-xs text-portal-blue hover:underline"
          aria-label="Cancel and return to dashboard"
        >
          ← Back to Dashboard
        </button>
      </div>

      <Stepper current={currentStep} />

      <div className="bg-white rounded shadow-sm border p-6">
        {currentStep === 1 && <Step1 onNext={goNext} />}
        {currentStep === 2 && <Step2 onNext={goNext} option={option} setOption={setOption} />}
        {currentStep === 3 && <Step3 option={option} />}
      </div>

      {currentStep > 1 && currentStep < 3 && (
        <div className="mt-4">
          <button
            onClick={() => goToStep(currentStep - 1)}
            className="text-xs text-muted-foreground hover:text-foreground hover:underline"
            aria-label="Go back to previous step"
          >
            ← Previous Step
          </button>
        </div>
      )}
    </div>
  );
};

export default MSSRetirementFlow;
