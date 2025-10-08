import Link from 'next/link';
import FormLayout from '../components/FormLayout';

export default function Home() {
  return (
    <FormLayout
      title="Submit Official Proposal | HYBE Corporation"
      pageHeading="Official Proposal Submission"
      subheading="Submit official event or partnership proposals to HYBE Corporation’s Artist Management Division."
      smallLabel="HYBE"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-gray-700">Welcome to the HYBE official proposal portal. Verified organizers, agencies, and government representatives may submit event or partnership proposals for consideration.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/artist-booking/proposal-form" className="accent-button">Start a Proposal</Link>
        </div>
      </div>
    </FormLayout>
  );
}
