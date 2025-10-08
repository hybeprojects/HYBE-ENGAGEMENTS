import React, { useEffect, useMemo, useState, useRef } from 'react';
import FormLayout from '../../components/FormLayout';
import { formatKRW, formatUSD } from '../../utils/currency';
import { uploadAsset, uploadDocument } from '../../services/cloudinary';

function useExchangeRateKRWtoUSD() {
  const [rate, setRate] = useState<number>(0.00075); // Fallback approx
  useEffect(() => {
    let active = true;
    fetch('https://api.exchangerate.host/latest?base=KRW&symbols=USD')
      .then((r) => r.json())
      .then((d) => {
        const v = d?.rates?.USD;
        if (active && typeof v === 'number' && isFinite(v) && v > 0) setRate(v);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return rate;
}

export default function ProposalFormPage() {
  const rate = useExchangeRateKRWtoUSD();
  const [krwBudget, setKrwBudget] = useState<string>('');
  const usdBudget = useMemo(() => {
    const v = Number(krwBudget.replace(/[^0-9.]/g, '')) || 0;
    return v * rate;
  }, [krwBudget, rate]);

  const [feeRange, setFeeRange] = useState<string>('');
  const feeRangeUSDNote = useMemo(() => {
    const map: Record<string, [number, number] | null> = {
      under100k: [0, 100000],
      '100k-250k': [100000, 250000],
      '250k-500k': [250000, 500000],
      '500k-1m': [500000, 1000000],
      '1m-2m': [1000000, 2000000],
      '2m-plus': null,
    };
    const r = map[feeRange];
    if (!r) return feeRange === '2m-plus' ? 'Above $2,000,000' : '';
    return `${formatUSD(r[0])} – ${formatUSD(r[1])}`;
  }, [feeRange]);

  const [docUploading, setDocUploading] = useState(false);
  const [docUrl, setDocUrl] = useState<string>('');
  const [supportUploading, setSupportUploading] = useState(false);
  const [supportUrls, setSupportUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const cloudinaryReady = Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET
  );

  const formRef = useRef<HTMLFormElement | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<Record<string, string>>({});

  function handleOpenConfirm() {
    setSubmitError(null);
    const form = formRef.current;
    if (!form) return;
    // Trigger native validation UI if invalid
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const fd = new FormData(form);
    const summaryFields = [
      'organizer_full_name',
      'organization_name',
      'official_email',
      'contact_number',
      'designation',
      'event_name',
      'event_type',
      'proposed_dates',
      'venue_location',
      'audience_size',
      'estimated_budget_krw',
      'estimated_budget_usd',
      'talent_fee_range',
      'responsibility',
      'sponsorship',
      'event_description',
      'goals',
      'other_artists_brands',
      'digital_signature',
    ];
    const data: Record<string, string> = {};
    for (const k of summaryFields) {
      const v = fd.get(k);
      data[k] = typeof v === 'string' ? v : v instanceof File ? (v as File).name : (v == null ? '' : String(v));
    }
    data['official_proposal_url'] = docUrl || '';
    data['supporting_material_urls'] = supportUrls.join(', ');
    setConfirmData(data);
    setConfirmOpen(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(window.location.pathname, {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Network response was not ok');

      // Redirect to success page after Netlify receives the submission
      window.location.href = '/success';
    } catch (err) {
      console.error(err);
      setSubmitError('Submission failed. Please try again.');
      setSubmitting(false);
    }
  }

  async function handleDocChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!cloudinaryReady) return; // fallback to Netlify native file if no Cloudinary
    setDocUploading(true);
    try {
      const res = await uploadDocument(file);
      setDocUrl(res.url);
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again or submit without Cloudinary.');
    } finally {
      setDocUploading(false);
    }
  }

  async function handleSupportChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    if (!cloudinaryReady) return; // fallback
    setSupportUploading(true);
    try {
      const uploaded: string[] = [];
      for (const f of files) {
        const res = await uploadAsset(f);
        uploaded.push(res.url);
      }
      setSupportUrls((prev) => [...prev, ...uploaded]);
    } catch (err) {
      console.error(err);
      alert('One or more files failed to upload.');
    } finally {
      setSupportUploading(false);
    }
  }

  return (
    <FormLayout
      title="Submit Official Proposal | HYBE Corporation"
      pageHeading="Artist Engagement & Partnership Proposal"
      subheading="Submit your official event or partnership proposal to HYBE Corporation’s Artist Management Division. All submissions are reviewed under our corporate engagement policy and confidentiality guidelines."
      smallLabel="Official Proposal Submission"
    >
      <form
        ref={formRef}
        name="artist-proposal"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="space-y-8"
        action="/success"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="artist-proposal" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        {/* 1️⃣ Organizer Information */}
        <section className="card">
          <h2 className="section-title">1️⃣ Organizer Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name<span className="text-red-600"> *</span></label>
              <input className="input-field" name="organizer_full_name" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Organization / Company Name<span className="text-red-600"> *</span></label>
              <input className="input-field" name="organization_name" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Official Email Address<span className="text-red-600"> *</span></label>
              <input type="email" className="input-field" name="official_email" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number / WhatsApp Contact<span className="text-red-600"> *</span></label>
              <input className="input-field" name="contact_number" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Designation / Position<span className="text-red-600"> *</span></label>
              <input className="input-field" name="designation" required />
            </div>
          </div>
        </section>

        {/* 2️⃣ Event Information */}
        <section className="card">
          <h2 className="section-title">2️⃣ Event Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name / Title<span className="text-red-600"> *</span></label>
              <input className="input-field" name="event_name" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <select className="select-field" name="event_type" defaultValue="Concert">
                <option>Concert</option>
                <option>Fan Meeting</option>
                <option>Festival</option>
                <option>TV Appearance</option>
                <option>Conference</option>
                <option>Private Event</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proposed Date(s)<span className="text-red-600"> *</span></label>
              <input className="input-field" name="proposed_dates" placeholder="YYYY-MM-DD or range" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Venue / Location<span className="text-red-600"> *</span></label>
              <input className="input-field" name="venue_location" placeholder="City, Country" required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Expected Audience Size<span className="text-red-600"> *</span></label>
              <input className="input-field" name="audience_size" type="number" min={1} required />
            </div>
          </div>
        </section>

        {/* 3️⃣ Financial & Production Details */}
        <section className="card">
          <h2 className="section-title">3️⃣ Financial & Production Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Estimated Event Budget</label>
              <input
                className="input-field"
                name="estimated_budget_krw"
                placeholder="Amount in KRW"
                inputMode="numeric"
                value={krwBudget}
                onChange={(e) => setKrwBudget(e.target.value)}
              />
              <p className="helper-text">{formatKRW(Number(krwBudget.replace(/[^0-9.]/g, '')) || 0)} · ≈ {formatUSD(usdBudget)}</p>
              <input type="hidden" name="estimated_budget_usd" value={Math.round(usdBudget).toString()} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Proposed Talent Fee Range</label>
              <select
                className="select-field"
                name="talent_fee_range"
                value={feeRange}
                onChange={(e) => setFeeRange(e.target.value)}
              >
                <option value="">Select range</option>
                <option value="under100k">Under $100,000</option>
                <option value="100k-250k">$100,000 – $250,000</option>
                <option value="250k-500k">$250,000 – $500,000</option>
                <option value="500k-1m">$500,000 – $1,000,000</option>
                <option value="1m-2m">$1,000,000 – $2,000,000</option>
                <option value="2m-plus">Above $2,000,000</option>
              </select>
              {feeRange && <p className="helper-text">Selected: {feeRangeUSDNote}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Travel & Production Responsibility</label>
              <select className="select-field" name="responsibility" defaultValue="Organizer">
                <option>Organizer</option>
                <option>HYBE</option>
                <option>Shared</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Sponsorship or Government Support</label>
              <textarea className="textarea-field" name="sponsorship" rows={3} placeholder="Details"></textarea>
            </div>
          </div>
        </section>

        {/* 4️⃣ Event Summary */}
        <section className="card">
          <h2 className="section-title">4️⃣ Event Summary</h2>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brief Event Description / Purpose<span className="text-red-600"> *</span></label>
              <textarea className="textarea-field" name="event_description" rows={4} required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Goals / Key Outcomes</label>
              <textarea className="textarea-field" name="goals" rows={3}></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Other Artists or Brands Involved (if any)</label>
              <input className="input-field" name="other_artists_brands" />
            </div>
          </div>
        </section>

        {/* 5️⃣ Attachments */}
        <section className="card">
          <h2 className="section-title">5️⃣ Attachments</h2>
          <p className="helper-text">Upload Official Proposal/LOI (PDF, DOCX). Supporting materials (posters, permits, etc.).</p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Official Proposal or Letter of Intent<span className="text-red-600"> *</span></label>
              <input
                className="input-field"
                name="official_proposal"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                required={!cloudinaryReady}
                onChange={handleDocChange}
              />
              {docUploading && <p className="helper-text">Uploading to Cloudinary…</p>}
              {docUrl && (
                <>
                  <p className="helper-text">Uploaded: {docUrl}</p>
                  <input type="hidden" name="official_proposal_url" value={docUrl} />
                </>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Supporting Materials (optional)</label>
              <input
                className="input-field"
                name="supporting_materials"
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={handleSupportChange}
              />
              {supportUploading && <p className="helper-text">Uploading files…</p>}
              {!!supportUrls.length && (
                <div className="mt-2 space-y-1">
                  {supportUrls.map((u, i) => (
                    <div key={i} className="text-sm text-gray-600 break-all">{u}</div>
                  ))}
                  <input type="hidden" name="supporting_material_urls" value={supportUrls.join(',')} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6️⃣ Authorization & Legal Agreement */}
        <section className="card">
          <h2 className="section-title">6️⃣ Authorization & Legal Agreement</h2>
          <fieldset className="mt-4 space-y-3">
            <label className="flex items-start gap-3">
              <input type="checkbox" name="auth_agreement" required className="mt-1 h-4 w-4 rounded border-gray-300 text-hybePurple focus:ring-hybePurple" />
              <span className="text-sm text-gray-700">
                I confirm that I am an authorized representative of the organization named above, and that all information provided is accurate to the best of my knowledge.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" name="confidentiality_ack" required className="mt-1 h-4 w-4 rounded border-gray-300 text-hybePurple focus:ring-hybePurple" />
              <span className="text-sm text-gray-700">
                I acknowledge that all communications and materials shared with HYBE Corporation remain confidential and may not be disclosed without written authorization.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" name="payment_terms" required className="mt-1 h-4 w-4 rounded border-gray-300 text-hybePurple focus:ring-hybePurple" />
              <span className="text-sm text-gray-700">
                I understand and agree that upon acceptance of this proposal by HYBE Corporation or its designated management division, a non-refundable deposit of fifty percent (50%) of the total agreed performance fee shall be remitted within the specified timeframe to finalize and secure the engagement agreement. Failure to remit within the stipulated period may result in automatic withdrawal of the offer.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" name="consent_to_contact" required className="mt-1 h-4 w-4 rounded border-gray-300 text-hybePurple focus:ring-hybePurple" />
              <span className="text-sm text-gray-700">
                I consent to be contacted by HYBE Corporation or its representatives regarding my submission and related partnership opportunities.
              </span>
            </label>
          </fieldset>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Digital Signature (Type your full name)<span className="text-red-600"> *</span></label>
            <input className="input-field" name="digital_signature" required placeholder="Type your full name" />
          </div>
          <div className="mt-4">
            <div data-netlify-recaptcha="true"></div>
            <p className="helper-text">reCAPTCHA / Anti-Spam enabled</p>
          </div>
        </section>

        {/* 7️⃣ Submission */}
        <div className="flex items-center justify-between">
          <div>
            <p className="helper-text">All submissions are reviewed under our corporate engagement policy.</p>
            {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
          </div>
          <button type="button" className="accent-button" disabled={submitting} onClick={handleOpenConfirm}>
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
                Submitting…
              </span>
            ) : 'Review & Submit Proposal'}
          </button>
        </div>

        {confirmOpen && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/40" onClick={() => setConfirmOpen(false)} />
            <div className="relative max-w-2xl w-full mx-4 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Confirm your submission</h3>
              <div className="max-h-64 overflow-auto space-y-2 text-sm text-gray-700">
                {Object.entries(confirmData).map(([k,v]) => (
                  <div key={k} className="flex justify-between border-b py-2">
                    <div className="font-medium text-gray-600">{k.replace(/_/g,' ')}</div>
                    <div className="text-right break-words ml-4">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" className="btn-secondary" onClick={() => setConfirmOpen(false)}>Edit</button>
                <button type="button" className="accent-button" onClick={() => { setConfirmOpen(false); formRef.current?.requestSubmit(); }} disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Confirm & Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormLayout>
  );
}
